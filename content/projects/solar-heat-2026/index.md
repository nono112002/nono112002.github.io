---
title: "2026 太陽熱養生"
date: 2026-08-15
description: "2026年夏の太陽熱養生（7/20〜8/15）の温度推移と積算温度の結果"
tags: ["IoT", "データ可視化", "農業"]
showTableOfContents: false
layout: "simple"
---

<style>
.summary-band {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.summary-band .summary-item {
  padding: 1rem;
  border-radius: 8px;
  background: rgb(var(--color-neutral-100));
  border: 1px solid rgb(var(--color-neutral-200));
}
.dark .summary-band .summary-item {
  background: rgb(var(--color-neutral-800));
  border-color: rgb(var(--color-neutral-700));
}
.summary-band .k {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 0.25rem;
}
.summary-band .v {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
}
.summary-band .v .unit {
  font-size: 0.8rem;
  opacity: 0.6;
  font-weight: 400;
}
.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  padding: 1rem;
  border-radius: 8px;
  background: rgb(var(--color-neutral-100));
  border: 1px solid rgb(var(--color-neutral-200));
}
.dark .stat-card {
  background: rgb(var(--color-neutral-800));
  border-color: rgb(var(--color-neutral-700));
}
.stat-card .zone-name {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 0.25rem;
}
.stat-card .value {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}
.stat-card .unit {
  font-size: 0.8rem;
  opacity: 0.6;
}
.stat-card .stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}
.stat-card .stat-label { opacity: 0.6; }
.stat-card .stat-val { font-weight: 600; }
.chart-container {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  background: rgb(var(--color-neutral-100));
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgb(var(--color-neutral-200));
}
.dark .chart-container {
  background: rgb(var(--color-neutral-800));
  border-color: rgb(var(--color-neutral-700));
}
.chart-container h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}
.chart-container h3 .granularity {
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-left: 0.5rem;
}
.chart-container canvas {
  width: 100% !important;
  max-height: 350px;
}
.loading {
  text-align: center;
  padding: 3rem;
  opacity: 0.6;
}
.zone-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.zone-toggle {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 2px solid;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, background 0.15s;
}
.zone-toggle.active { color: #fff; }
.zone-toggle:not(.active) {
  background: transparent !important;
  opacity: 0.5;
}
.custom-legend {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  line-height: 1.8;
}
.custom-legend .legend-zone { margin-bottom: 0.25rem; }
.custom-legend .zone-label { font-weight: 700; margin-right: 0.5rem; }
.custom-legend .legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.75rem;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.15s;
}
.custom-legend .legend-item.hidden {
  opacity: 0.3;
  text-decoration: line-through;
}
.custom-legend .legend-line {
  display: inline-block;
  width: 20px;
  height: 0;
  border-top: 2.5px solid;
  vertical-align: middle;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid rgb(var(--color-neutral-300));
  background: rgb(var(--color-neutral-100));
  color: rgb(var(--color-neutral-900));
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
}
.dark .btn {
  border-color: rgb(var(--color-neutral-600));
  background: rgb(var(--color-neutral-800));
  color: rgb(var(--color-neutral-100));
}
.download-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--color-neutral-200));
}
.dark .download-section { border-top-color: rgb(var(--color-neutral-700)); }
</style>

2026年夏の太陽熱養生の計測結果です。**2026年7月20日 0:00 〜 8月15日 13:00**（ビニール撤去まで）の確定データで、以後更新されません。計測中のリアルタイム表示は[データダッシュボード](/projects/solar-heat-data/)にあります。

<div class="summary-band" id="summary-band"></div>

## 温度推移グラフ

<div class="zone-toggles" id="raw-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1" onclick="toggleRawZone(this)">区A（標準区）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b" onclick="toggleRawZone(this)">区B（対照・菌なし）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981" onclick="toggleRawZone(this)">区C（対照・ビニールなし）</button>
</div>

<div class="stat-cards" id="raw-stat-cards"></div>

<div class="chart-container">
  <h3>温度推移（全センサー）<span class="granularity">／1時間ごとの平均</span></h3>
  <div class="loading" id="raw-loading">データを読み込み中…</div>
  <canvas id="chart-raw"></canvas>
  <div id="raw-legend" class="custom-legend"></div>
</div>

---

## 積算温度

<div class="zone-toggles" id="accum-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1" onclick="toggleAccumZone(this)">区A（標準区）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b" onclick="toggleAccumZone(this)">区B（対照・菌なし）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981" onclick="toggleAccumZone(this)">区C（対照・ビニールなし）</button>
</div>

<div class="stat-cards" id="accum-stat-cards"></div>

<div class="chart-container">
  <h3>積算温度の推移<span class="granularity">／日最高温度の累積・土壌センサーのみ</span></h3>
  <div class="loading" id="accum-loading">データを読み込み中…</div>
  <canvas id="chart-accum"></canvas>
</div>

---

## データ

<div class="download-section">
  <a class="btn" href="/data/solar-heat-2026/temperature.json" download>温度データ (JSON)</a>
  <a class="btn" href="/data/solar-heat-2026/accumulated.json" download>積算温度データ (JSON)</a>
</div>

### 注記

- **積算温度**は各区の土壌センサー（S1〜S6）の日最高温度を日ごとに足し上げた値。日付の区切りは日本時間。
- 最終日 8/15 はビニール撤去の 13:00 までの部分計測。
- 区A・区Bの S7 は 7/28 8:50 に外気温センサーから土壌5cmへ差し替えたため、系列の途中で意味が変わる。参考値として扱い、積算温度には含めていない。
- ラベルの深さ表記は実際の埋設深さに合わせて表示側で補正している（DB上のラベルは `S1_center_10cm` のままだが実深さは15cm）。
- センサーの読み取り失敗による 0.0℃ ちょうどの値を集計から除外している（区A・端部15cmに53件／全1,293,276件）。

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script>
// 確定データなので API は使わず、書き出し済みの静的 JSON を読む。
const DATA_BASE = "/data/solar-heat-2026";

const ZONE_NAMES = {
  "zone-a": "区A（標準区）",
  "zone-b": "区B（対照・菌なし）",
  "zone-c": "区C（対照・ビニールなし）",
};
const ZONE_COLORS = {
  "zone-a": "#6366f1",
  "zone-b": "#f59e0b",
  "zone-c": "#10b981",
};
// DBのラベルは S1_center_10cm のままだが、実際の埋設深さは15cm。表示のみ補正する。
const LABEL_NAMES = {
  "S1_center_10cm": "中央15cm",
  "S2_center_25cm": "中央25cm",
  "S3_center_40cm": "中央40cm",
  "S4_edge_10cm": "端部15cm",
  "S5_edge_25cm": "端部25cm",
  "S6_edge_40cm": "端部40cm",
  "S7_outdoor": "外気温",
};
// 区A・区Bの S7 は 2026-07-28 08:50 に外気温から土壌5cm へ差し替え。
const SOIL_5CM_ZONES = ["zone-a", "zone-b"];
const NON_SOIL_LABELS = ["S7_outdoor"];
const LABEL_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#a855f7",
];

function labelName(label, zone) {
  if (label === "S7_outdoor" && SOIL_5CM_ZONES.includes(zone)) return "5cm（参考）";
  return LABEL_NAMES[label] || label;
}

let tempData = null;
let accumData = null;
let chartRaw = null;
let chartAccum = null;

function getActiveZones(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} .zone-toggle.active`))
    .map(b => b.dataset.zone);
}

function toggleRawZone(btn) {
  btn.classList.toggle("active");
  if (tempData) {
    const zones = getActiveZones("raw-zone-toggles");
    renderRawChart(zones);
    renderRawStats(zones);
  }
}

function toggleAccumZone(btn) {
  btn.classList.toggle("active");
  if (accumData) {
    const zones = getActiveZones("accum-zone-toggles");
    renderAccumChart(zones);
    renderAccumStats(zones);
  }
}

function chartOptions(yLabel, timeUnit) {
  const isDark = document.documentElement.classList.contains("dark");
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#e5e5e5" : "#333";

  const timeConfig = timeUnit === "hour"
    ? {
        unit: "day",
        displayFormats: { hour: "M/d HH:mm", day: "M/d" },
        tooltipFormat: "yyyy-MM-dd HH:mm",
      }
    : {
        unit: "day",
        displayFormats: { day: "M/d" },
        tooltipFormat: "yyyy-MM-dd",
      };

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
        type: "time",
        time: timeConfig,
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

// --- 温度推移 ---
function renderRawChart(zones) {
  // 列指向データなので、共通の時間軸に系列の値を重ねるだけでよい。
  const times = tempData.t.map(sec => sec * 1000);
  const datasets = [];

  for (const z of zones) {
    tempData.meta.labels.forEach((lbl, i) => {
      const s = tempData.series[`${z}|${lbl}`];
      if (!s) return;
      const points = [];
      for (let k = 0; k < times.length; k++) {
        if (s.avg[k] !== null) points.push({ x: times[k], y: s.avg[k] });
      }
      if (points.length === 0) return;

      datasets.push({
        label: labelName(lbl, z),
        data: points,
        borderColor: LABEL_COLORS[i % LABEL_COLORS.length],
        borderWidth: 1.5,
        borderDash: z === "zone-b" ? [6, 3] : z === "zone-c" ? [2, 2] : [],
        pointRadius: 0,
        fill: false,
        tension: 0,
        _zone: z,
        _label: lbl,
      });
    });
  }

  if (chartRaw) chartRaw.destroy();
  const opts = chartOptions("温度 (℃)", "hour");
  opts.plugins.legend = { display: false };
  chartRaw = new Chart(document.getElementById("chart-raw"), {
    type: "line",
    data: { datasets },
    options: opts,
  });
  renderRawLegend(datasets, zones);
}

function renderRawLegend(datasets, zones) {
  const el = document.getElementById("raw-legend");
  el.innerHTML = "";
  for (const z of zones) {
    const row = document.createElement("div");
    row.className = "legend-zone";
    const zLabel = document.createElement("span");
    zLabel.className = "zone-label";
    zLabel.textContent = (ZONE_NAMES[z] || z) + "：";
    row.appendChild(zLabel);

    datasets.forEach((ds, idx) => {
      if (ds._zone !== z) return;
      const item = document.createElement("span");
      item.className = "legend-item";

      const line = document.createElement("span");
      line.className = "legend-line";
      line.style.borderColor = ds.borderColor;
      if (ds.borderDash && ds.borderDash.length) line.style.borderTopStyle = "dashed";
      item.appendChild(line);

      const text = document.createElement("span");
      text.textContent = labelName(ds._label, ds._zone);
      item.appendChild(text);

      item.onclick = () => {
        const meta = chartRaw.getDatasetMeta(idx);
        meta.hidden = !meta.hidden;
        item.classList.toggle("hidden", meta.hidden);
        chartRaw.update();
      };
      row.appendChild(item);
    });
    el.appendChild(row);
  }
}

function renderRawStats(zones) {
  const container = document.getElementById("raw-stat-cards");
  let html = "";
  for (const z of zones) {
    let minT = Infinity, maxT = -Infinity, found = false;
    for (const lbl of tempData.meta.labels) {
      if (NON_SOIL_LABELS.includes(lbl)) continue;
      const s = tempData.series[`${z}|${lbl}`];
      if (!s) continue;
      found = true;
      for (const v of s.min) if (v !== null && v < minT) minT = v;
      for (const v of s.max) if (v !== null && v > maxT) maxT = v;
    }
    if (!found) continue;

    html += `
      <div class="stat-card">
        <div class="zone-name">${ZONE_NAMES[z] || z}<br>土壌最高温度</div>
        <div class="value">${maxT.toFixed(1)}<span class="unit"> ℃</span></div>
        <div class="stat-row"><span class="stat-label">期間中の最低</span><span class="stat-val">${minT.toFixed(1)} ℃</span></div>
        <div class="stat-row"><span class="stat-label">温度差</span><span class="stat-val">${(maxT - minT).toFixed(1)} ℃</span></div>
      </div>`;
  }
  container.innerHTML = html;
}

// --- 積算温度 ---
function renderAccumChart(zones) {
  const datasets = [];
  for (const z of zones) {
    const s = accumData.zones[z];
    if (!s) continue;
    datasets.push({
      label: ZONE_NAMES[z] || z,
      data: accumData.dates.map((d, i) => ({ x: d, y: s.accumulated[i] })),
      borderColor: ZONE_COLORS[z],
      backgroundColor: ZONE_COLORS[z],
      borderWidth: 2,
      borderDash: z === "zone-b" ? [6, 3] : z === "zone-c" ? [2, 2] : [],
      pointRadius: 2,
      fill: false,
      tension: 0.2,
    });
  }

  if (chartAccum) chartAccum.destroy();
  chartAccum = new Chart(document.getElementById("chart-accum"), {
    type: "line",
    data: { datasets },
    options: chartOptions("積算温度 (℃・日)", "day"),
  });
}

function renderAccumStats(zones) {
  const container = document.getElementById("accum-stat-cards");
  const n = accumData.dates.length;
  let html = "";
  for (const z of zones) {
    const s = accumData.zones[z];
    if (!s) continue;
    const total = s.accumulated[n - 1];
    const peak = Math.max(...s.daily_max.filter(v => v !== null));
    html += `
      <div class="stat-card">
        <div class="zone-name">${ZONE_NAMES[z] || z}</div>
        <div class="value">${total.toFixed(1)}<span class="unit"> ℃・日</span></div>
        <div class="stat-row"><span class="stat-label">日数</span><span class="stat-val">${n} 日</span></div>
        <div class="stat-row"><span class="stat-label">1日平均</span><span class="stat-val">${(total / n).toFixed(1)} ℃</span></div>
        <div class="stat-row"><span class="stat-label">日最高の最大</span><span class="stat-val">${peak.toFixed(1)} ℃</span></div>
      </div>`;
  }
  container.innerHTML = html;
}

// --- 概要 ---
function renderSummary() {
  const n = accumData.dates.length;
  const totals = Object.entries(accumData.zones)
    .map(([z, s]) => [z, s.accumulated[n - 1]])
    .sort((a, b) => b[1] - a[1]);

  let html = `
    <div class="summary-item">
      <div class="k">計測期間</div>
      <div class="v">${n}<span class="unit"> 日</span></div>
    </div>`;
  for (const [z, total] of totals) {
    html += `
      <div class="summary-item">
        <div class="k">${ZONE_NAMES[z] || z} 積算温度</div>
        <div class="v">${total.toFixed(1)}<span class="unit"> ℃・日</span></div>
      </div>`;
  }
  document.getElementById("summary-band").innerHTML = html;
}

async function init() {
  try {
    const [t, a] = await Promise.all([
      fetch(`${DATA_BASE}/temperature.json`).then(r => r.json()),
      fetch(`${DATA_BASE}/accumulated.json`).then(r => r.json()),
    ]);
    tempData = t;
    accumData = a;

    renderSummary();
    const rawZones = getActiveZones("raw-zone-toggles");
    renderRawChart(rawZones);
    renderRawStats(rawZones);
    const accumZones = getActiveZones("accum-zone-toggles");
    renderAccumChart(accumZones);
    renderAccumStats(accumZones);

    document.getElementById("raw-loading").style.display = "none";
    document.getElementById("accum-loading").style.display = "none";
  } catch (e) {
    console.error("データ読み込み失敗:", e);
    document.getElementById("raw-loading").textContent = "データを読み込めませんでした";
    document.getElementById("accum-loading").textContent = "データを読み込めませんでした";
  }
}

init();
</script>
