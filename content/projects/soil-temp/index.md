---
title: "地温測定 2026"
date: 2026-09-23
url: "/projects/soil-temp/"
description: "畑に温度センサー21本を埋めて、太陽熱養生とマルチ資材の地温を2か月間測った記録。機器の自作から、試験設計、結果まで。"
tags: ["IoT", "データ可視化", "農業", "センサー"]
showTableOfContents: false
layout: "simple"
---

<link rel="stylesheet" href="/css/soil-temp.css">

畑の地温を、**温度センサー21本・2か月・約130万レコード**で測りました。測定機器の自作から、試験の組み立て、結果の判定までの記録です。

2026年夏に2つの試験をやっています。前半が**太陽熱養生**（ビニールで畑を覆って地温を上げ、土を消毒する）、後半が**マルチ資材の比較**（白黒・黒・透明の3種類で地温がどう変わるか）。

<div class="summary-band" style="margin-top:2rem">
  <div class="summary-item">
    <div class="k">計測期間</div>
    <div class="v">65<span class="unit"> 日</span></div>
  </div>
  <div class="summary-item">
    <div class="k">センサー</div>
    <div class="v">21<span class="unit"> 本 / 3区画</span></div>
  </div>
  <div class="summary-item">
    <div class="k">養生期間の最高地温</div>
    <div class="v">49.0<span class="unit"> ℃（中央15cm）</span></div>
  </div>
  <div class="summary-item">
    <div class="k">40℃以上</div>
    <div class="v">211<span class="unit"> 時間（標準区）</span></div>
  </div>
</div>

---

<div class="toc-group">① 測定機器</div>

<div class="toc-cards">
  <a class="toc-card" href="/projects/soil-temp/equipment/">
    <div class="num">01</div>
    <div class="t">測定機器をつくる</div>
    <div class="d">DS18B20 を7本束ねた測定ユニットを3台。基板設計、ファーム、通信、電源、そして現場で壊れたところ。</div>
  </a>
</div>

<div class="toc-group">② 太陽熱養生</div>

<div class="toc-cards">
  <a class="toc-card" href="/projects/soil-temp/solarization-design/">
    <div class="num">02-1</div>
    <div class="t">評価準備 — 何を比べるために、どう埋めたか</div>
    <div class="d">3つの試験区の設計、センサーの配置、「効いた」と判断する基準の決め方。</div>
  </a>
  <a class="toc-card" href="/projects/soil-temp/solarization-result/">
    <div class="num">02-2</div>
    <div class="t">結果 — ビニールを剥がして分かったこと</div>
    <div class="d">養生中の3区の差と、ビニール撤去後に差がどう消えたか。差が土そのものではなく処理によるものだと確かめた話。</div>
  </a>
  <a class="toc-card" href="/projects/soil-temp/solarization-report/">
    <div class="num">02-3</div>
    <div class="t">総括レポート — 目的・資材・地温・土壌診断を1枚に</div>
    <div class="d">養生前後のJA土壌診断を加えた総まとめ。pHは目標範囲に入り、ECは倍になり、過剰なリン酸と塩基は持ち越し。</div>
  </a>
</div>

<div class="toc-group">③ マルチ資材比較</div>

<div class="toc-cards">
  <a class="toc-card" href="/projects/soil-temp/mulch-design/">
    <div class="num">03-1</div>
    <div class="t">評価準備 — 0.5℃を見分けるための準備</div>
    <div class="d">白黒・黒・透明の3種類。養生と違って差が小さいと分かっていたので、センサー個体差を実測する段取りを先に決めた。</div>
  </a>
  <a class="toc-card" href="/projects/soil-temp/mulch-result/">
    <div class="num">03-2</div>
    <div class="t">結果 — 白黒と黒に差はなかった</div>
    <div class="d">34日間の測定と、最後に全プローブを同じバケツに入れて測った個体差。補正して残った差と、残らなかった差。</div>
  </a>
</div>

---

## 使った道具

| 項目 | 内容 |
|---|---|
| センサー | DS18B20 × 21本（3区画 × 7本。深さ15/25/40cm、中央と端部） |
| マイコン | Raspberry Pi Pico W × 3台（MicroPython） |
| 通信 | MQTT over WiFi（モバイルルーター経由） |
| 記録 | SQLite。SDカードにローカル二重記録 |
| 可視化 | Chart.js（このサイト）、Grafana（手元） |

回路図・基板データ・ファームウェアは [GitHub](https://github.com/nono112002) に置いてあります。

## データ

このサイトのグラフは、すべて書き出し済みの静的データを読んでいます。計測サーバーは2026年9月に停止したため、外部への問い合わせは発生しません。

<div class="download-section">
  <a class="btn" href="/data/soil-temp/solarization/temperature.json" download>太陽熱養生 温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/mulch-comparison/temperature.json" download>マルチ比較 温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/calibration/offsets.json" download>センサー個体差 (JSON)</a>
</div>
