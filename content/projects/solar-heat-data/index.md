---
title: "太陽熱養生 データダッシュボード"
date: 2026-07-19
description: "積算温度・エリア別・深さ別のリアルタイム温度グラフとCSVダウンロード"
tags: ["IoT", "データ可視化", "農業"]
showTableOfContents: false
layout: "simple"
---

<style>
.dashboard-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: end;
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.control-group label {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
}
.control-group select,
.control-group input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-neutral-300);
  border-radius: 6px;
  background: var(--color-neutral-100);
  color: var(--color-neutral-900);
  font-size: 0.85rem;
}
.dark .control-group select,
.dark .control-group input {
  border-color: var(--color-neutral-600);
  background: var(--color-neutral-800);
  color: var(--color-neutral-100);
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
  background: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-200);
}
.dark .stat-card {
  background: var(--color-neutral-800);
  border-color: var(--color-neutral-700);
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
.stat-card .stat-label {
  opacity: 0.6;
}
.stat-card .stat-val {
  font-weight: 600;
}
.chart-container {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  background: var(--color-neutral-100);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--color-neutral-200);
}
.dark .chart-container {
  background: var(--color-neutral-800);
  border-color: var(--color-neutral-700);
}
.chart-container h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}
.chart-container canvas {
  width: 100% !important;
  max-height: 350px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-neutral-300);
  background: var(--color-neutral-100);
  color: var(--color-neutral-900);
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}
.btn:hover {
  background: var(--color-neutral-200);
}
.dark .btn {
  border-color: var(--color-neutral-600);
  background: var(--color-neutral-800);
  color: var(--color-neutral-100);
}
.dark .btn:hover {
  background: var(--color-neutral-700);
}
.btn-primary {
  background: var(--color-primary-600);
  color: #fff;
  border-color: var(--color-primary-600);
}
.btn-primary:hover {
  background: var(--color-primary-700);
}
.loading {
  text-align: center;
  padding: 3rem;
  opacity: 0.6;
}
.error-msg {
  color: #dc2626;
  padding: 1rem;
  border: 1px solid #dc2626;
  border-radius: 6px;
  margin: 1rem 0;
}
.download-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-neutral-200);
}
.dark .download-section {
  border-top-color: var(--color-neutral-700);
}
.zone-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
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
.zone-toggle.active {
  color: #fff;
}
.zone-toggle:not(.active) {
  background: transparent !important;
  opacity: 0.5;
}
.custom-legend {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  line-height: 1.8;
}
.custom-legend .legend-zone {
  margin-bottom: 0.25rem;
}
.custom-legend .zone-label {
  font-weight: 700;
  margin-right: 0.5rem;
}
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
</style>

## 30分間隔 温度推移

<div class="dashboard-controls">
  <div class="control-group">
    <label>表示期間</label>
    <select id="sel-raw-period" onchange="onRawPeriodChange()">
      <option value="1">過去1日</option>
      <option value="3" selected>過去3日</option>
      <option value="7">過去1週間</option>
      <option value="30">過去1か月</option>
      <option value="custom">カレンダー入力</option>
    </select>
  </div>
  <div class="control-group" id="raw-date-from-group" style="display:none">
    <label>開始日</label>
    <input type="date" id="raw-date-from" onchange="loadRawChart()">
  </div>
  <div class="control-group" id="raw-date-to-group" style="display:none">
    <label>終了日</label>
    <input type="date" id="raw-date-to" onchange="loadRawChart()">
  </div>
</div>

<div class="zone-toggles" id="raw-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1" onclick="toggleRawZone(this)">区A（標準区）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b" onclick="toggleRawZone(this)">区B（対照・菌なし）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981" onclick="toggleRawZone(this)">区C（対照・ビニールなし）</button>
</div>

<div class="stat-cards" id="raw-stat-cards"></div>

<div class="chart-container">
  <h3>温度推移（30分間隔・全センサー）</h3>
  <canvas id="chart-raw"></canvas>
  <div id="raw-legend" class="custom-legend"></div>
</div>

---

## CSVダウンロード

<div class="download-section">
  <button class="btn" onclick="downloadCSV('raw')">生データ</button>
  <button class="btn" onclick="downloadCSV('daily')">日別サマリー</button>
  <button class="btn" onclick="downloadCSV('accumulated')">積算温度データ</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script>
const API_BASE = "https://34-58-138-105.sslip.io/api";
const DATA_START = "2026-07-19T15:00:00";

const ZONE_NAMES = {
  "zone-a": "区A（標準区）",
  "zone-b": "区B（対照・菌なし）",
  "zone-c": "区C（対照・ビニールなし）",
};
const LABEL_NAMES = {
  "S1_center_10cm": "中央10cm",
  "S2_center_25cm": "中央25cm",
  "S3_center_40cm": "中央40cm",
  "S4_edge_10cm": "端部10cm",
  "S5_edge_25cm": "端部25cm",
  "S6_edge_40cm": "端部40cm",
  "S7_outdoor": "外気温",
};
const LABEL_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#6366f1", "#a855f7",
];

let chartRaw = null;

let rawDataCache = null;

function getRawZones() {
  return Array.from(document.querySelectorAll("#raw-zone-toggles .zone-toggle.active"))
    .map(b => b.dataset.zone);
}

function toggleRawZone(btn) {
  btn.classList.toggle("active");
  if (rawDataCache) {
    const zones = getRawZones();
    renderRawChart(rawDataCache, zones);
    renderRawStats(rawDataCache, zones);
  }
}

function onRawPeriodChange() {
  const period = document.getElementById("sel-raw-period").value;
  const showCustom = period === "custom";
  document.getElementById("raw-date-from-group").style.display = showCustom ? "" : "none";
  document.getElementById("raw-date-to-group").style.display = showCustom ? "" : "none";
  if (!showCustom) loadRawChart();
}

function getRawDateRange() {
  const period = document.getElementById("sel-raw-period").value;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const to = tomorrow.toISOString().slice(0, 10);

  if (period === "custom") {
    return {
      from: document.getElementById("raw-date-from").value || "",
      to: document.getElementById("raw-date-to").value || to,
    };
  }
  const from = new Date();
  from.setDate(from.getDate() - parseInt(period));
  return { from: from.toISOString().slice(0, 10), to };
}

async function loadRawChart() {
  const { from, to } = getRawDateRange();

  const q = new URLSearchParams();
  q.set("zone", "zone-a,zone-b,zone-c");
  const effectiveFrom = (!from || from < DATA_START) ? DATA_START : from;
  q.set("from", effectiveFrom);
  q.set("to", to);

  try {
    const resp = await fetch(`${API_BASE}/temperature?${q}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    rawDataCache = await resp.json();
    const zones = getRawZones();
    renderRawChart(rawDataCache, zones);
    renderRawStats(rawDataCache, zones);
  } catch (e) {
    console.error("30分間隔データ取得失敗:", e);
  }
}

function renderRawStats(data, zones) {
  const container = document.getElementById("raw-stat-cards");
  if (!data || data.length === 0 || zones.length === 0) {
    container.innerHTML = "";
    return;
  }

  let html = "";
  for (const z of zones) {
    const soil = data.filter(d => d.zone === z && d.label !== "S7_outdoor");
    if (soil.length === 0) continue;

    const temps = soil.map(d => d.temp);
    const minT = Math.min(...temps);
    const maxT = Math.max(...temps);

    const dailyMax = {};
    for (const d of soil) {
      const day = d.timestamp.slice(0, 10);
      dailyMax[day] = Math.max(dailyMax[day] || -Infinity, d.temp);
    }
    const accum = Object.values(dailyMax).reduce((s, v) => s + v, 0);

    html += `
      <div class="stat-card">
        <div class="zone-name">${ZONE_NAMES[z] || z}</div>
        <div class="value">${accum.toFixed(1)}<span class="unit"> ℃・日</span></div>
        <div class="stat-row"><span class="stat-label">MIN</span><span class="stat-val">${minT.toFixed(1)} ℃</span></div>
        <div class="stat-row"><span class="stat-label">MAX</span><span class="stat-val">${maxT.toFixed(1)} ℃</span></div>
      </div>`;
  }
  container.innerHTML = html;
}

function renderRawChart(data, zones) {
  const labels = [...new Set(data.map(d => d.label))].sort();
  const datasets = [];

  for (const z of zones) {
    labels.forEach((lbl, i) => {
      const points = data
        .filter(d => d.zone === z && d.label === lbl)
        .map(d => ({ x: d.timestamp, y: d.temp }));
      if (points.length === 0) return;

      const color = LABEL_COLORS[i % LABEL_COLORS.length];
      const dash = z === "zone-b" ? [6, 3] : z === "zone-c" ? [2, 2] : [];

      datasets.push({
        label: `${LABEL_NAMES[lbl] || lbl}`,
        data: points,
        borderColor: color,
        borderWidth: 1.5,
        borderDash: dash,
        pointRadius: 0,
        fill: false,
        tension: 0.2,
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
      item.dataset.index = idx;

      const line = document.createElement("span");
      line.className = "legend-line";
      line.style.borderColor = ds.borderColor;
      if (ds.borderDash && ds.borderDash.length) {
        line.style.borderTopStyle = "dashed";
      }
      item.appendChild(line);

      const text = document.createElement("span");
      text.textContent = LABEL_NAMES[ds._label] || ds._label;
      item.appendChild(text);

      item.onclick = () => {
        const i = parseInt(item.dataset.index);
        const meta = chartRaw.getDatasetMeta(i);
        meta.hidden = !meta.hidden;
        item.classList.toggle("hidden", meta.hidden);
        chartRaw.update();
      };
      row.appendChild(item);
    });
    el.appendChild(row);
  }
}

function chartOptions(yLabel, timeUnit) {
  const isDark = document.documentElement.classList.contains("dark");
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#e5e5e5" : "#333";

  const timeConfig = timeUnit === "hour"
    ? {
        unit: "hour",
        stepSize: 6,
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
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        type: "time",
        time: timeConfig,
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          maxTicksLimit: 24,
          maxRotation: 45,
          minRotation: 0,
        },
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

function downloadCSV(type) {
  const { from, to } = getRawDateRange();
  const zones = getRawZones().join(",");
  const q = new URLSearchParams();
  q.set("zone", zones || "zone-a,zone-b,zone-c");
  const effectiveFrom = (!from || from < DATA_START) ? DATA_START : from;
  q.set("from", effectiveFrom);
  q.set("to", to);
  q.set("type", type);
  window.open(`${API_BASE}/csv?${q}`, "_blank");
}

// 初期表示
loadRawChart();
</script>
