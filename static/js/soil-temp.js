/* 地温測定の結果ページ共通のグラフ描画。
 *
 * 計測は 2026-09-22 に終了し、データを配信していたサーバーは解約した。
 * どのページも API は叩かず、書き出し済みの静的 JSON だけを読む。
 *
 * 1ページに複数の期間を並べられるよう、prefix ごとに独立して mount する。
 *   SoilTemp.mount({ base: "/data/soil-temp/solarization", prefix: "sol",
 *                    zoneNames: { "zone-a": "区A（標準区）", ... } });
 * 必要な要素の id は prefix から導出する（sol-chart-raw, sol-summary など）。
 */
window.SoilTemp = (function () {
  "use strict";

  var ZONE_COLORS = {
    "zone-a": "#6366f1",
    "zone-b": "#f59e0b",
    "zone-c": "#10b981",
  };
  // DBのラベルは設置当初のままで実際の深さと違う。表示側で解決する。
  var LABEL_NAMES = {
    "S1_center_10cm": "中央15cm",
    "S2_center_25cm": "中央25cm",
    "S3_center_40cm": "中央40cm",
    "S4_edge_10cm": "端部15cm",
    "S5_edge_25cm": "端部25cm",
    "S6_edge_40cm": "端部40cm",
    "S7_outdoor": "外気温",
  };
  var LABEL_COLORS = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#a855f7",
  ];
  // 積算温度の対象外。S7 は途中からの計測で条件が揃わない。
  var NON_SOIL_LABELS = ["S7_outdoor"];

  function dashFor(zone) {
    return zone === "zone-b" ? [6, 3] : zone === "zone-c" ? [2, 2] : [];
  }

  function chartOptions(yLabel, timeUnit) {
    var isDark = document.documentElement.classList.contains("dark");
    var gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
    var textColor = isDark ? "#e5e5e5" : "#333";

    var timeConfig = timeUnit === "hour"
      ? { unit: "day", displayFormats: { hour: "M/d HH:mm", day: "M/d" },
          tooltipFormat: "yyyy-MM-dd HH:mm" }
      : { unit: "day", displayFormats: { day: "M/d" }, tooltipFormat: "yyyy-MM-dd" };

    return {
      responsive: true,
      // 点数の多い温度推移グラフでは index モードが重いので nearest を使う。
      interaction: timeUnit === "hour"
        ? { mode: "nearest", axis: "x", intersect: false }
        : { mode: "index", intersect: false },
      animation: timeUnit === "hour" ? false : undefined,
      spanGaps: true,
      scales: {
        x: {
          type: "time", time: timeConfig,
          grid: { color: gridColor },
          ticks: { color: textColor, maxTicksLimit: 24, maxRotation: 45, minRotation: 0 },
        },
        y: {
          title: { display: true, text: yLabel, color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor },
        },
      },
      plugins: {
        legend: { labels: { color: textColor, boxWidth: 20, font: { size: 11 } } },
        tooltip: { mode: "index" },
      },
    };
  }

  function Panel(config) {
    this.cfg = config;
    this.zoneNames = config.zoneNames || {};
    // S7 を土壌5cmへ差し替えた区。区Cは最後まで外気温のまま。
    this.soil5cmZones = config.soil5cmZones || ["zone-a", "zone-b"];
    this.temp = null;
    this.accum = null;
    this.chartRaw = null;
    this.chartAccum = null;
  }

  Panel.prototype.id = function (suffix) {
    return this.cfg.prefix + "-" + suffix;
  };

  Panel.prototype.el = function (suffix) {
    return document.getElementById(this.id(suffix));
  };

  Panel.prototype.zoneName = function (z) {
    return this.zoneNames[z] || z;
  };

  Panel.prototype.labelName = function (label, zone) {
    if (label === "S7_outdoor" && this.soil5cmZones.indexOf(zone) >= 0) {
      return "5cm（参考）";
    }
    return LABEL_NAMES[label] || label;
  };

  Panel.prototype.activeZones = function (suffix) {
    var el = this.el(suffix);
    if (!el) return Object.keys(this.zoneNames);
    return Array.prototype.map.call(
      el.querySelectorAll(".zone-toggle.active"), function (b) { return b.dataset.zone; });
  };

  // --- 温度推移 ---
  Panel.prototype.renderRaw = function (zones) {
    var self = this;
    var canvas = this.el("chart-raw");
    if (!canvas || !this.temp) return;

    // 列指向データなので、共通の時間軸に系列の値を重ねるだけでよい。
    var times = this.temp.t.map(function (sec) { return sec * 1000; });
    var datasets = [];

    zones.forEach(function (z) {
      self.temp.meta.labels.forEach(function (lbl, i) {
        var s = self.temp.series[z + "|" + lbl];
        if (!s) return;
        var points = [];
        for (var k = 0; k < times.length; k++) {
          if (s.avg[k] !== null) points.push({ x: times[k], y: s.avg[k] });
        }
        if (points.length === 0) return;
        datasets.push({
          label: self.labelName(lbl, z),
          data: points,
          borderColor: LABEL_COLORS[i % LABEL_COLORS.length],
          borderWidth: 1.5,
          borderDash: dashFor(z),
          pointRadius: 0,
          fill: false,
          tension: 0,
          _zone: z,
          _label: lbl,
        });
      });
    });

    if (this.chartRaw) this.chartRaw.destroy();
    var opts = chartOptions("温度 (℃)", "hour");
    opts.plugins.legend = { display: false };
    this.chartRaw = new Chart(canvas, { type: "line", data: { datasets: datasets }, options: opts });
    this.renderRawLegend(datasets, zones);
  };

  Panel.prototype.renderRawLegend = function (datasets, zones) {
    var self = this;
    var el = this.el("raw-legend");
    if (!el) return;
    el.innerHTML = "";
    zones.forEach(function (z) {
      var row = document.createElement("div");
      row.className = "legend-zone";
      var zLabel = document.createElement("span");
      zLabel.className = "zone-label";
      zLabel.textContent = self.zoneName(z) + "：";
      row.appendChild(zLabel);

      datasets.forEach(function (ds, idx) {
        if (ds._zone !== z) return;
        var item = document.createElement("span");
        item.className = "legend-item";

        var line = document.createElement("span");
        line.className = "legend-line";
        line.style.borderColor = ds.borderColor;
        if (ds.borderDash && ds.borderDash.length) line.style.borderTopStyle = "dashed";
        item.appendChild(line);

        var text = document.createElement("span");
        text.textContent = self.labelName(ds._label, ds._zone);
        item.appendChild(text);

        item.onclick = function () {
          var meta = self.chartRaw.getDatasetMeta(idx);
          meta.hidden = !meta.hidden;
          item.classList.toggle("hidden", meta.hidden);
          self.chartRaw.update();
        };
        row.appendChild(item);
      });
      el.appendChild(row);
    });
  };

  Panel.prototype.renderRawStats = function (zones) {
    var self = this;
    var container = this.el("raw-stat-cards");
    if (!container) return;
    var html = "";
    zones.forEach(function (z) {
      var minT = Infinity, maxT = -Infinity, found = false;
      self.temp.meta.labels.forEach(function (lbl) {
        if (NON_SOIL_LABELS.indexOf(lbl) >= 0) return;
        var s = self.temp.series[z + "|" + lbl];
        if (!s) return;
        found = true;
        s.min.forEach(function (v) { if (v !== null && v < minT) minT = v; });
        s.max.forEach(function (v) { if (v !== null && v > maxT) maxT = v; });
      });
      if (!found) return;
      html +=
        '<div class="stat-card">' +
        '<div class="zone-name">' + self.zoneName(z) + "<br>土壌最高温度</div>" +
        '<div class="value">' + maxT.toFixed(1) + '<span class="unit"> ℃</span></div>' +
        '<div class="stat-row"><span class="stat-label">期間中の最低</span><span class="stat-val">' +
        minT.toFixed(1) + " ℃</span></div>" +
        '<div class="stat-row"><span class="stat-label">温度差</span><span class="stat-val">' +
        (maxT - minT).toFixed(1) + " ℃</span></div></div>";
    });
    container.innerHTML = html;
  };

  // --- 積算温度 ---
  Panel.prototype.renderAccum = function (zones) {
    var self = this;
    var canvas = this.el("chart-accum");
    if (!canvas || !this.accum) return;
    var datasets = [];
    zones.forEach(function (z) {
      var s = self.accum.zones[z];
      if (!s) return;
      datasets.push({
        label: self.zoneName(z),
        data: self.accum.dates.map(function (d, i) { return { x: d, y: s.accumulated[i] }; }),
        borderColor: ZONE_COLORS[z],
        backgroundColor: ZONE_COLORS[z],
        borderWidth: 2,
        borderDash: dashFor(z),
        pointRadius: 2,
        fill: false,
        tension: 0.2,
      });
    });
    if (this.chartAccum) this.chartAccum.destroy();
    this.chartAccum = new Chart(canvas, {
      type: "line", data: { datasets: datasets },
      options: chartOptions("積算温度 (℃・日)", "day"),
    });
  };

  Panel.prototype.renderAccumStats = function (zones) {
    var self = this;
    var container = this.el("accum-stat-cards");
    if (!container) return;
    var n = this.accum.dates.length;
    var html = "";
    zones.forEach(function (z) {
      var s = self.accum.zones[z];
      if (!s) return;
      var total = s.accumulated[n - 1];
      var peak = Math.max.apply(null, s.daily_max.filter(function (v) { return v !== null; }));
      html +=
        '<div class="stat-card">' +
        '<div class="zone-name">' + self.zoneName(z) + "</div>" +
        '<div class="value">' + total.toFixed(1) + '<span class="unit"> ℃・日</span></div>' +
        '<div class="stat-row"><span class="stat-label">日数</span><span class="stat-val">' +
        n + " 日</span></div>" +
        '<div class="stat-row"><span class="stat-label">1日平均</span><span class="stat-val">' +
        (total / n).toFixed(1) + " ℃</span></div>" +
        '<div class="stat-row"><span class="stat-label">日最高の最大</span><span class="stat-val">' +
        peak.toFixed(1) + " ℃</span></div></div>";
    });
    container.innerHTML = html;
  };

  Panel.prototype.renderSummary = function () {
    var self = this;
    var el = this.el("summary");
    if (!el) return;
    var n = this.accum.dates.length;
    var totals = Object.keys(this.accum.zones)
      .map(function (z) { return [z, self.accum.zones[z].accumulated[n - 1]]; })
      .sort(function (a, b) { return b[1] - a[1]; });

    var html =
      '<div class="summary-item"><div class="k">計測期間</div>' +
      '<div class="v">' + n + '<span class="unit"> 日</span></div></div>';
    totals.forEach(function (row) {
      html +=
        '<div class="summary-item"><div class="k">' + self.zoneName(row[0]) + " 積算温度</div>" +
        '<div class="v">' + row[1].toFixed(1) + '<span class="unit"> ℃・日</span></div></div>';
    });
    el.innerHTML = html;
  };

  Panel.prototype.redrawRaw = function () {
    var zones = this.activeZones("raw-zone-toggles");
    this.renderRaw(zones);
    this.renderRawStats(zones);
  };

  Panel.prototype.redrawAccum = function () {
    var zones = this.activeZones("accum-zone-toggles");
    this.renderAccum(zones);
    this.renderAccumStats(zones);
  };

  Panel.prototype.bindToggles = function (suffix, handler) {
    var el = this.el(suffix);
    if (!el) return;
    var self = this;
    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".zone-toggle");
      if (!btn) return;
      btn.classList.toggle("active");
      handler.call(self);
    });
  };

  Panel.prototype.fail = function (msg) {
    ["raw-loading", "accum-loading"].forEach(function (s) {
      var el = this.el(s);
      if (el) { el.style.display = ""; el.textContent = msg; }
    }, this);
  };

  Panel.prototype.load = function () {
    var self = this;
    return Promise.all([
      fetch(this.cfg.base + "/temperature.json").then(function (r) { return r.json(); }),
      fetch(this.cfg.base + "/accumulated.json").then(function (r) { return r.json(); }),
    ]).then(function (res) {
      self.temp = res[0];
      self.accum = res[1];
      self.renderSummary();
      self.redrawRaw();
      self.redrawAccum();
      ["raw-loading", "accum-loading"].forEach(function (s) {
        var el = self.el(s);
        if (el) el.style.display = "none";
      });
      self.bindToggles("raw-zone-toggles", self.redrawRaw);
      self.bindToggles("accum-zone-toggles", self.redrawAccum);
    }).catch(function (e) {
      console.error("データ読み込み失敗:", e);
      self.fail("データを読み込めませんでした");
    });
  };

  return {
    ZONE_COLORS: ZONE_COLORS,
    LABEL_NAMES: LABEL_NAMES,
    chartOptions: chartOptions,
    mount: function (config) {
      var p = new Panel(config);
      p.load();
      return p;
    },
  };
})();
