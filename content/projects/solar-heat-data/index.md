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
</style>

## 積算温度

<div class="dashboard-controls" id="controls">
  <div class="control-group">
    <label>エリア</label>
    <select id="sel-zone" multiple size="3">
      <option value="zone-a" selected>区A（対照区）</option>
      <option value="zone-b" selected>区B（標準養生）</option>
      <option value="zone-c" selected>区C（微生物養生）</option>
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

## エリア別温度推移

<div class="chart-container">
  <h3>日平均温度</h3>
  <canvas id="chart-daily"></canvas>
</div>

---

## CSVダウンロード

<div class="download-section">
  <button class="btn" onclick="downloadCSV('raw')">生データ (1分間隔)</button>
  <button class="btn" onclick="downloadCSV('daily')">日平均データ</button>
  <button class="btn" onclick="downloadCSV('accumulated')">積算温度データ</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script>
const API_BASE = "http://34.58.138.105/api";

const ZONE_COLORS = {
  "zone-a": { line: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  "zone-b": { line: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  "zone-c": { line: "#10b981", bg: "rgba(16,185,129,0.1)" },
};
const ZONE_NAMES = {
  "zone-a": "区A（対照区）",
  "zone-b": "区B（標準養生）",
  "zone-c": "区C（微生物養生）",
};

let chartAccum = null;
let chartDaily = null;

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
    const resp = await fetch(`${API_BASE}/accumulated?${qs}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    renderStatCards(data, params.zones);
    renderAccumulatedChart(data, params.zones);
    renderDailyChart(data, params.zones);
  } catch (e) {
    document.getElementById("stat-cards").innerHTML =
      `<div class="error-msg">データ取得エラー: ${e.message}<br>サーバーに接続できない可能性があります。</div>`;
  }
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
    options: chartOptions("積算温度 (℃・日)"),
  });
}

function renderDailyChart(data, zones) {
  const datasets = zones.map(z => {
    const points = data
      .filter(d => d.zone === z)
      .map(d => ({ x: d.date, y: d.daily_avg }));
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
    options: chartOptions("日平均温度 (℃)"),
  });
}

function chartOptions(yLabel) {
  const isDark = document.documentElement.classList.contains("dark");
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#e5e5e5" : "#333";

  return {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "yyyy-MM-dd" },
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        title: { display: true, text: yLabel, color: textColor },
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
    },
    plugins: {
      legend: { labels: { color: textColor } },
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
