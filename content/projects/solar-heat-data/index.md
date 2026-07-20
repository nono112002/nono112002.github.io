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
</style>

## 積算温度

<div class="dashboard-controls" id="controls">
  <div class="control-group">
    <label>エリア</label>
    <select id="sel-zone" multiple size="3">
      <option value="zone-a" selected>区A（標準区）</option>
      <option value="zone-b" selected>区B（対照・菌なし）</option>
      <option value="zone-c" selected>区C（対照・ビニールなし）</option>
    </select>
  </div>
  <div class="control-group">
    <label>深さ・位置</label>
    <select id="sel-label">
      <option value="S1_center_10cm">中央 10cm</option>
      <option value="S2_center_25cm">中央 25cm</option>
      <option value="S3_center_40cm">中央 40cm</option>
      <option value="S4_edge_10cm">エッジ 10cm</option>
      <option value="S5_edge_25cm">エッジ 25cm</option>
      <option value="S6_edge_40cm">エッジ 40cm</option>
      <option value="S7_outdoor">外気温</option>
    </select>
  </div>
  <div class="control-group">
    <label>開始日</label>
    <input type="date" id="date-from" value="2026-07-01">
  </div>
  <div class="control-group">
    <label>終了日</label>
    <input type="date" id="date-to">
  </div>
  <div class="control-group">
    <label>&nbsp;</label>
    <button class="btn btn-primary" onclick="loadData()">表示更新</button>
  </div>
</div>

<div class="stat-cards" id="stat-cards">
  <div class="loading">データ読み込み中...</div>
</div>

<div class="chart-container">
  <h3>積算温度（℃・日）</h3>
  <canvas id="chart-accumulated"></canvas>
</div>

---

## 日最高温度推移

<div class="chart-container">
  <h3>日最高温度（℃）</h3>
  <canvas id="chart-daily"></canvas>
</div>

---

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

const ZONE_COLORS = {
  "zone-a": { line: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  "zone-b": { line: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "zone-c": { line: "#10b981", bg: "rgba(16,185,129,0.1)" },
};
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

let chartAccum = null;
let chartDaily = null;
let chartRaw = null;

function getParams() {
  const selZone = document.getElementById("sel-zone");
  const zones = Array.from(selZone.selectedOptions).map(o => o.value);
  const label = document.getElementById("sel-label").value;
  const from = document.getElementById("date-from").value;
  const to = document.getElementById("date-to").value || new Date().toISOString().slice(0, 10);
  return { zones, label, from, to };
}

function buildQuery(params) {
  const q = new URLSearchParams();
  q.set("zone", params.zones.join(","));
  q.set("label", params.label);
  if (params.from) q.set("from", params.from);
  if (params.to) q.set("to", params.to);
  return q.toString();
}

async function loadData() {
  const params = getParams();
  const qs = buildQuery(params);

  document.getElementById("stat-cards").innerHTML = '<div class="loading">読み込み中...</div>';

  try {
    const accumResp = await fetch(`${API_BASE}/accumulated?${qs}`);
    if (!accumResp.ok) throw new Error(`HTTP ${accumResp.status}`);
    const accumData = await accumResp.json();

    renderStatCards(accumData, params.zones);
    renderAccumulatedChart(accumData, params.zones);
    renderDailyChart(accumData, params.zones);
  } catch (e) {
    document.getElementById("stat-cards").innerHTML =
      `<div class="error-msg">データ取得エラー: ${e.message}<br>サーバーに接続できない可能性があります。</div>`;
  }
  loadRawChart();
}

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
  if (from) q.set("from", from);
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

function renderStatCards(data, zones) {
  const latest = {};
  for (const row of data) {
    latest[row.zone] = row;
  }

  let html = "";
  for (const z of zones) {
    const row = latest[z];
    if (!row) continue;
    html += `
      <div class="stat-card">
        <div class="zone-name">${ZONE_NAMES[z] || z}</div>
        <div class="value">${row.accumulated.toFixed(1)}<span class="unit"> ℃・日</span></div>
      </div>`;
  }
  document.getElementById("stat-cards").innerHTML = html || '<div class="loading">データなし</div>';
}

function renderAccumulatedChart(data, zones) {
  const datasets = zones.map(z => {
    const points = data
      .filter(d => d.zone === z)
      .map(d => ({ x: d.date, y: d.accumulated }));
    return {
      label: ZONE_NAMES[z] || z,
      data: points,
      borderColor: ZONE_COLORS[z]?.line || "#888",
      backgroundColor: ZONE_COLORS[z]?.bg || "rgba(0,0,0,0.05)",
      fill: true,
      tension: 0.3,
    };
  });

  if (chartAccum) chartAccum.destroy();
  chartAccum = new Chart(document.getElementById("chart-accumulated"), {
    type: "line",
    data: { datasets },
    options: chartOptions("積算温度 (℃・日)", "day"),
  });
}

function renderDailyChart(data, zones) {
  const datasets = zones.map(z => {
    const points = data
      .filter(d => d.zone === z)
      .map(d => ({ x: d.date, y: d.daily_max }));
    return {
      label: ZONE_NAMES[z] || z,
      data: points,
      borderColor: ZONE_COLORS[z]?.line || "#888",
      backgroundColor: ZONE_COLORS[z]?.bg || "rgba(0,0,0,0.05)",
      fill: false,
      tension: 0.3,
    };
  });

  if (chartDaily) chartDaily.destroy();
  chartDaily = new Chart(document.getElementById("chart-daily"), {
    type: "line",
    data: { datasets },
    options: chartOptions("日最高温度 (℃)", "day"),
  });
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
      const zoneSuffix = zones.length > 1 ? ` [${ZONE_NAMES[z]?.charAt(0) || z}]` : "";
      const dash = zones.length > 1
        ? (z === "zone-b" ? [6, 3] : z === "zone-c" ? [2, 2] : [])
        : [];

      datasets.push({
        label: `${LABEL_NAMES[lbl] || lbl}${zoneSuffix}`,
        data: points,
        borderColor: color,
        borderWidth: 1.5,
        borderDash: dash,
        pointRadius: 0,
        fill: false,
        tension: 0.2,
      });
    });
  }

  if (chartRaw) chartRaw.destroy();
  chartRaw = new Chart(document.getElementById("chart-raw"), {
    type: "line",
    data: { datasets },
    options: chartOptions("温度 (℃)", "hour"),
  });
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
  const params = getParams();
  const qs = buildQuery(params);
  window.open(`${API_BASE}/csv?${qs}&type=${type}`, "_blank");
}

// 初期表示
document.getElementById("date-to").value = new Date().toISOString().slice(0, 10);
loadData();
</script>
