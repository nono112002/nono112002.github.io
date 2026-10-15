---
title: "②-2 太陽熱養生 / 結果"
date: 2026-09-23
url: "/projects/soil-temp/solarization-result/"
description: "養生27日間の3区の差と、ビニールを剥がしたあとに差がどう消えたか。最高49.0℃、40℃以上が211時間。"
tags: ["農業", "データ可視化"]
showTableOfContents: true
layout: "simple"
---

<link rel="stylesheet" href="/css/soil-temp.css">

2026年7月20日から8月15日までの27日間、3区画の地温を測りました。そのあとビニールを剥がして、**差がどう消えるか**も4日半ぶん測っています。

<div class="summary-band" id="sol-summary"></div>

---

## 1. 40℃には届いた。55℃には届かなかった

最高地温（土壌センサー、期間中の最大値）です。

| 位置 | 区A（標準） | 区B（菌なし） | 区C（ビニールなし） |
|---|---|---|---|
| 中央15cm | **49.0 ℃** | 41.9 ℃ | 36.9 ℃ |
| 中央25cm | 40.2 ℃ | 37.4 ℃ | 32.8 ℃ |
| 中央40cm | 33.4 ℃ | 33.2 ℃ | 31.0 ℃ |
| 端部15cm | 47.1 ℃ | 43.5 ℃ | 36.4 ℃ |
| 端部25cm | 38.3 ℃ | 37.6 ℃ | 32.0 ℃ |
| 端部40cm | 34.3 ℃ | 32.9 ℃ | — |

事前に決めた基準（[②-1](/projects/soil-temp/solarization-design/)）に当てはめます。

**基準1：最高地温40℃** — 区Aは中央15cmで49.0℃、端部15cmで47.1℃。**達成**。区Bも端部15cmで43.5℃まで上がりました。区Cは36.9℃止まりで届かず。

**基準2：40℃以上の継続時間** — ここが一番はっきり出ました。

| 位置 | 区A | 区B | 区C |
|---|---|---|---|
| 中央15cm | **211 時間** | 25 時間 | 0 時間 |
| 端部15cm | 143 時間 | 71 時間 | 0 時間 |

区Aは中央15cmで**のべ211時間**、40℃以上を維持しています。区Bの8倍です。

**基準3：55℃を3日以上** — **届きませんでした**。最高でも49.0℃で、55℃には6℃足りません。書籍にある「多くの種子が死滅する」水準には、今年の条件では到達していないことになります。

深さについては、**効いたのは15cmまで**というのが正直なところです。25cmで40.2℃、40cmでは33.4℃と外気温に近い値まで落ちます。作土層の浅い部分はリセットできても、深いところはそのまま、と読むべきでしょう。

---

## 2. 温度推移

<div class="zone-toggles" id="sol-raw-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1">区A（標準区）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b">区B（菌なし）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981">区C（ビニールなし）</button>
</div>

<div class="stat-cards" id="sol-raw-stat-cards"></div>

<div class="chart-container">
  <h3>地温の推移<span class="granularity">／1時間平均・凡例をクリックで系列を消せます</span></h3>
  <div class="loading" id="sol-raw-loading">データを読み込み中…</div>
  <canvas id="sol-chart-raw"></canvas>
  <div id="sol-raw-legend" class="custom-legend"></div>
</div>

日中のピークと夜間の落ち込みが、浅いほど大きく出ます。40cmはほとんど平らで、日射の影響が届いていないことが見て取れます。

---

## 3. ビニールの効果は歴然

積算温度（土壌センサーの日最高温度を日ごとに足した値）です。

<div class="zone-toggles" id="sol-accum-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1">区A（標準区）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b">区B（菌なし）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981">区C（ビニールなし）</button>
</div>

<div class="stat-cards" id="sol-accum-stat-cards"></div>

<div class="chart-container">
  <h3>積算温度の推移<span class="granularity">／日最高温度の累積・土壌センサーのみ</span></h3>
  <div class="loading" id="sol-accum-loading">データを読み込み中…</div>
  <canvas id="sol-chart-accum"></canvas>
</div>

27日間の合計です。

| 比較 | 差 | 意味 |
|---|---|---|
| 区B − 区C | **+164.1 ℃・日（+17.9%）** | ビニール被覆の効果 |
| 区A − 区B | +114.5 ℃・日（+10.6%） | 微生物資材の効果…？ |

**ビニールの効果は疑う余地がありません。** 同じたい肥を入れた土を覆うか覆わないかだけで、27日で18%の差がつきました。期間平均地温でも 32.6℃ 対 29.8℃ です。

問題は下の行です。

---

## 4. 「微生物資材が効いた」と言っていいのか

区Aと区Bの違いは微生物資材の有無だけです。差は +114.5 ℃・日、中央15cmの最高地温で 7.1℃。発酵熱が出ているなら、これは大きな成果ということになります。

ですが、**この数字だけでは言えません**。区Aと区Bは別の区画です。土も日当たりも完全に同じではない。差が処理によるものか、区画そのものの性質なのかを、養生中のデータだけでは分離できません。

そこで、**ビニールを剥がしてからも測り続けました**。

---

## 5. ビニールを剥がして分かったこと

8月15日の13時にビニールを撤去し、3区とも露地・無処理の状態にしました。条件が揃うので、ここで残る差が「区画そのものの差」です。

<div class="summary-band" id="bare-summary"></div>

<div class="zone-toggles" id="bare-raw-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1">区A</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b">区B</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981">区C</button>
</div>

<div class="chart-container">
  <h3>ビニール撤去後の地温<span class="granularity">／8/16〜8/20・3区とも露地</span></h3>
  <div class="loading" id="bare-raw-loading">データを読み込み中…</div>
  <canvas id="bare-chart-raw"></canvas>
  <div id="bare-raw-legend" class="custom-legend"></div>
</div>

<div class="chart-container">
  <h3>ビニール撤去後の積算温度</h3>
  <div class="loading" id="bare-accum-loading">データを読み込み中…</div>
  <canvas id="bare-chart-accum"></canvas>
</div>
<div class="stat-cards" id="bare-accum-stat-cards"></div>

**3本の線がほぼ重なります。** 養生中は30%も開いていた区Aと区Cの差が、露地では 2.5% まで縮みました。

| | 養生中（27日） | 露地（5日） |
|---|---|---|
| 区A − 区B | +10.6% | **+1.4%** |
| 区A − 区C | +30.5% | **+2.5%** |

深さ別に見ると、こうなります（1時間平均の差、区A − 区B）。

| 位置 | 養生中 | 露地 |
|---|---|---|
| 中央15cm | +2.70 ℃ | +0.83 ℃ |
| 中央25cm | +1.57 ℃ | +0.57 ℃ |
| 中央40cm | +0.34 ℃ | +0.12 ℃ |
| 端部15cm | +2.35 ℃ | +0.81 ℃ |
| 端部25cm | +0.78 ℃ | +0.26 ℃ |
| 端部40cm | +0.90 ℃ | +0.29 ℃ |

つまり、**区Aと区Bの間にはもともと 0.8℃ 程度の下駄がある**。養生中の +2.70℃ のうち、0.83℃ は区画そのものの差で、残りの約1.9℃が処理による差、という読み方になります。

<div class="note-box">

**この比較の限界**：露地期間は5日しかなく、天候も養生期間とは違います。また端部15cmの区Aは欠測が多く、露地期間で有効なのは108時間中26時間だけでした。**「下駄の大きさはだいたい0.8℃」くらいの精度**として扱うべきで、これで補正して差し引きするほどの確度はありません。

</div>

---

## 結論

1. **太陽熱養生は効いた。** ビニールの有無で積算温度が18%違い、被覆区だけが40℃を超えた。
2. **ただし効いたのは深さ15cmまで。** 25cmで40℃前後、40cmでは外気温に近い。
3. **55℃・3日以上には届かなかった。** 種子を死滅させる水準までは行っていない。
4. **微生物資材の効果は「あったと思われる」止まり。** 差の3割ほどは区画そのものの差だった。断定するには、翌年に区の割り当てを入れ替えて再現するしかない。

3番目と4番目が、この試験でいちばん学んだところです。**差が出たときに、それが処理のものか場所のものかを分けられる設計になっていなかった。** ビニールを剥がしてから測り続けたのは後付けの救済で、最初から「条件を揃えた期間」を計画に入れておくべきでした。

この反省が、次のマルチ資材比較の準備につながります。

---

## データ

<div class="download-section">
  <a class="btn" href="/data/soil-temp/solarization/temperature.json" download>養生期間 温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/solarization/accumulated.json" download>養生期間 積算温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/bare-baseline/temperature.json" download>露地期間 温度 (JSON)</a>
</div>

### 注記

- 温度はすべて**センサー個体差を補正した値**です（補正の実測は [③-2](/projects/soil-temp/mulch-result/#校正) を参照）。
- **積算温度**は各区の土壌センサー6本の日最高温度を日ごとに足した値（℃・日）。書籍にある 800〜900℃ とは計算方法が違うため直接比較できません。
- 最終日 8/15 はビニール撤去の13時までの部分計測です。
- 8/15 13:00〜8/16 00:00 は撤去作業中のため、どちらの期間にも含めていません。
- 区A・区Bの7本目は 7/28 8:50 に外気温から土壌5cmへ差し替えたため、参考値として積算温度には含めていません。
- 区C 端部40cm は校正値が取れなかったため補正後の値がありません。
- 読み取り失敗による 0.0℃（区A・端部15cmに53件）は集計から除外しています。

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script src="/js/soil-temp.js"></script>
<script>
var SOLAR_ZONES = {
  "zone-a": "区A（標準区）",
  "zone-b": "区B（菌なし）",
  "zone-c": "区C（ビニールなし）",
};
SoilTemp.mount({ base: "/data/soil-temp/solarization", prefix: "sol", zoneNames: SOLAR_ZONES });
SoilTemp.mount({ base: "/data/soil-temp/bare-baseline", prefix: "bare", zoneNames: SOLAR_ZONES });
</script>

<div class="page-nav">
  <a href="/projects/soil-temp/solarization-design/">← ②-1 評価準備</a>
  <span class="spacer"></span>
  <a href="/projects/soil-temp/solarization-report/">②-3 総括レポート →</a>
</div>
