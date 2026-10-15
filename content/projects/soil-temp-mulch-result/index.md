---
title: "③-2 マルチ資材比較 / 結果"
date: 2026-09-23
url: "/projects/soil-temp/mulch-result/"
description: "白黒と黒に地温差はなかった。34日間の測定と、最後に全プローブを同じバケツに入れて測ったセンサー個体差。"
tags: ["農業", "データ可視化"]
showTableOfContents: true
layout: "simple"
---

<link rel="stylesheet" href="/css/soil-temp.css">

2026年8月20日12時から9月22日9時まで、34日間。

**結論から書くと、白黒マルチと黒マルチの地温差はありませんでした。** 差が無いことを言うために何をしたか、という話になります。

<div class="summary-band" id="mul-summary"></div>

---

## 1. 温度推移

<div class="zone-toggles" id="mul-raw-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1">区A（白黒マルチ）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b">区B（黒マルチ）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981">区C（透明マルチ）</button>
</div>

<div class="stat-cards" id="mul-raw-stat-cards"></div>

<div class="chart-container">
  <h3>地温の推移<span class="granularity">／1時間平均・センサー個体差を補正済み</span></h3>
  <div class="loading" id="mul-raw-loading">データを読み込み中…</div>
  <canvas id="mul-chart-raw"></canvas>
  <div id="mul-raw-legend" class="custom-legend"></div>
</div>

養生期間（最高49.0℃）と比べると、全体に低い温度帯です。9月に入ってからは最高でも30℃台前半まで落ちています。

期間中の最高地温は次のとおりでした。

| 位置 | 区A（白黒） | 区B（黒） | 区C（透明） |
|---|---|---|---|
| 中央15cm | 36.6 ℃ | 34.9 ℃ | **40.4 ℃** |
| 端部15cm | 36.5 ℃ | 36.4 ℃ | 35.2 ℃ |
| 中央25cm | 33.1 ℃ | 32.9 ℃ | 33.1 ℃ |

40℃を超えたのは区Cの中央15cmで**のべ2時間**だけです。養生期間の区A（211時間）とは比べものになりません。**マルチだけでは土の消毒になる温度帯には入らない**ということが、はっきり出ました。

---

## 2. 積算温度

<div class="zone-toggles" id="mul-accum-zone-toggles">
  <button class="zone-toggle active" data-zone="zone-a" style="border-color:#6366f1;background:#6366f1">区A（白黒マルチ）</button>
  <button class="zone-toggle active" data-zone="zone-b" style="border-color:#f59e0b;background:#f59e0b">区B（黒マルチ）</button>
  <button class="zone-toggle active" data-zone="zone-c" style="border-color:#10b981;background:#10b981">区C（透明マルチ）</button>
</div>

<div class="stat-cards" id="mul-accum-stat-cards"></div>

<div class="chart-container">
  <h3>積算温度の推移<span class="granularity">／日最高温度の累積・土壌センサーのみ</span></h3>
  <div class="loading" id="mul-accum-loading">データを読み込み中…</div>
  <canvas id="mul-chart-accum"></canvas>
</div>

34日間の合計です。

| 区 | 積算温度 | 区Aとの差 |
|---|---|---|
| 区A（白黒） | 1039.2 ℃・日 | — |
| 区B（黒） | 1022.9 ℃・日 | −16.3（−1.6%） |
| 区C（透明） | 1082.7 ℃・日 | +43.5（+4.2%） |

養生期間では区Aと区Cで30%開いていました。今回は最大でも4.2%です。**そもそも差が小さい試験**だということが、この時点で分かります。

---

## 3. 白黒と黒の差：1.6%をどう読むか

区Aが区Bより 1.6% 高い。これを「白黒のほうが温度が高い」と読んでいいのか、というのがこのページの本題です。

深さごとに、1時間平均の差を見ます（区A − 区B、センサー個体差を補正した値）。

| 位置 | 区A − 区B |
|---|---|
| 中央15cm | −0.14 ℃ |
| 中央25cm | −0.09 ℃ |
| 中央40cm | −0.23 ℃ |
| **端部15cm** | **+0.60 ℃** |
| 端部25cm | −0.08 ℃ |
| 端部40cm | −0.09 ℃ |

**6か所のうち5か所は ±0.25℃ 以内**、しかも符号がばらばらです。白黒が一貫して高い／低いという傾向はありません。

残るのは端部15cmの +0.60℃ ただ1か所。そして積算温度の +1.6% も、ほぼこの1本と中央15cmの日最高値で説明がついてしまいます。

### 端部15cmの +0.60℃ はマルチの差ではない

ここで、[③-1](/projects/soil-temp/mulch-design/#準備1区画そのものの差はもう測ってある)で用意しておいた露地4日半が効きます。3区とも無処理だった期間の同じ場所の差は、**+0.81℃** でした。

| 端部15cm 区A − 区B | 値 |
|---|---|
| 太陽熱養生中（27日） | +2.35 ℃ |
| **露地・無処理（4日半）** | **+0.81 ℃** |
| マルチ比較中（34日） | +0.60 ℃ |

マルチを張る前、何も処理していない状態ですでに 0.81℃ ありました。マルチ期はむしろ**そこから縮んでいます**。つまりこの差は、**区画そのもの・埋設位置の差**であって、白黒か黒かによるものではありません。

### 昼と夜では符号が逆になる

もう一つ見ておきます。白黒マルチが効くとしたら日中の反射のはずなので、時間帯で分けました。

| 位置 | 昼（10–16時） | 夜（22–5時） | 終日 |
|---|---|---|---|
| 中央15cm | +0.68 ℃ | −0.69 ℃ | −0.14 ℃ |
| 中央25cm | −0.03 ℃ | −0.15 ℃ | −0.09 ℃ |

中央15cmは**昼に高く、夜に低い**。つまり区Aのほうが日較差がわずかに大きいだけで、1日を通した平均はゼロです。白黒マルチが日射を反射して地温を抑える、という向きの効果は読み取れませんでした。

---

## 4. 校正 {#校正}

ここまでの「補正した値」が何なのかを書きます。

9月22日9時に**全プローブを土から引き揚げ、水を張ったバケツに入れました**。全部が同じ温度にいる状態を作れば、読み値のばらつきがそのままセンサー個体差になります。

- 投入から1時間で、系列間のばらつきが **4.8℃ → 0.63℃** に収束しました。
- そのまま翌朝9時まで回し、水温 **21.1〜29.0℃** の範囲をカバーしました（この24時間ぶんで固定）。
- 各プローブの偏差の標準偏差は 0.04〜0.10℃。**オフセットは安定していました。**

<div class="chart-container">
  <h3>水浴校正<span class="granularity">／全プローブを同一バケツに浸漬・生データ</span></h3>
  <div class="loading" id="bath-loading">データを読み込み中…</div>
  <canvas id="bath-chart"></canvas>
</div>

実測したオフセット（全体平均からの偏差）です。

| 位置 | 区A | 区B | 区C |
|---|---|---|---|
| 中央15cm | +0.10 | −0.06 | +0.13 |
| 中央25cm | −0.02 | +0.08 | +0.17 |
| 中央40cm | +0.11 | −0.09 | +0.23 |
| 端部15cm | **−0.27** | +0.14 | −0.12 |
| 端部25cm | +0.09 | +0.16 | −0.04 |
| 端部40cm | −0.16 | +0.04 | 未取得 |
| 5cm/外気 | −0.11 | +0.07 | +0.09 |

20本の散らばりは **幅 0.50℃、標準偏差 0.13℃**。DS18B20 のカタログ精度 ±0.5℃ には全数収まっていますが、**今回見ようとしていた差と同じ大きさ**です。

### 校正しなかったらどうなっていたか

区A − 区Bの値が、補正の前後でどう動いたかです。

| 位置 | 補正前 | 補正後 |
|---|---|---|
| 中央15cm | +0.03 | **−0.14** |
| 中央25cm | −0.19 | −0.09 |
| 中央40cm | −0.04 | **−0.23** |
| 端部15cm | +0.19 | **+0.60** |
| 端部25cm | −0.16 | −0.08 |
| 端部40cm | −0.29 | −0.09 |

動く量は 0.08〜0.41℃。**差そのものと同じ大きさなので、符号が変わる項目すら出ます**（中央15cm）。

同じ補正を太陽熱養生のデータに当てても、そちらの結論はまったく動きません（積算温度の区A−区Bは +10.48% → +10.61%）。差が数℃ある試験では 0.4℃ の誤差は無視できるからです。

**養生の結論は校正なしでも正しかった。マルチ比較の結論は校正なしでは出せなかった。** 最後に水浴を回した判断は、ここで効きました。

<div class="note-box">

**取り切れなかったもの**：区C 端部40cm のプローブは、引き揚げ作業中の9:18を最後に受信が止まりました。バケツに入っていないため**この1本だけ補正値がありません**。グラフとデータでは補正後の値を欠測として扱っています。「1本でも抜くときはその場で水浴を回す」というルールを決めていたのに、壊れたことに気づいたのが翌日でした。

</div>

---

## 5. 透明マルチについて

区C（透明）は積算温度で区Aより 4.2% 高く、唯一40℃を超えました。ただし**センサーごとに見ると様子が違います**。

| 位置 | 区C − 区A |
|---|---|
| 中央15cm | **+50.9 ℃・日** |
| 中央25cm | −1.2 ℃・日 |
| 中央40cm | +0.3 ℃・日 |
| 端部15cm | −43.3 ℃・日 |
| 端部25cm | −25.1 ℃・日 |

**区Cが高いのは中央15cmの1本だけ**で、端部ではむしろ低い。区全体が一様に熱いわけではありません。浅い中央に効果が集中するのは透明マルチの性質として理解できますが、区Cは受信率が76%（区A 92% / 区B 99%）と欠測が多く、積算温度の絶対値の確度が他の2区より落ちます。

**「透明は中央の浅いところだけ明確に高い」** というのが、このデータから言える範囲です。

---

## 結論

1. **白黒マルチと黒マルチに、地温の差はなかった。** 6か所中5か所が ±0.25℃ 以内、残る1か所もマルチを張る前から存在した区画差だった。
2. **どちらを選ぶかは、地温以外の理由で決めてよい。** 雑草抑制・durability・コストで選ぶ話になる。
3. **透明マルチは中央の浅い層だけ明確に高い。** ただし区全体が熱くなるわけではない。
4. **マルチでは土の消毒温度帯に入らない。** 40℃超はのべ2時間。養生の211時間とは別物。

### この試験の限界

- **34日、そのうち快晴日は限られる。** 白黒と黒の差が出るとしたら快晴日の日中なので、条件のいい日がもっと多ければ違う結果が出る可能性は残ります。
- **区の割り当てを入れ替えていない。** 区画差を露地期間で測ってはいますが、割り当てを替えて再現するのが本来です。
- **露地の基準は4日半しかない。** 特に端部15cmの区Aは欠測が多く、有効なのは108時間中26時間でした。

それでも、**「差がある」と言えない、ということは言える**水準にはなったと考えています。

---

## データ

<div class="download-section">
  <a class="btn" href="/data/soil-temp/mulch-comparison/temperature.json" download>温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/mulch-comparison/accumulated.json" download>積算温度 (JSON)</a>
  <a class="btn" href="/data/soil-temp/calibration/offsets.json" download>センサー個体差 (JSON)</a>
  <a class="btn" href="/data/soil-temp/calibration/bath.json" download>水浴校正 生データ (JSON)</a>
</div>

### 注記

- 温度はすべてセンサー個体差を補正した値（`真値 = 実測値 − オフセット`）です。
- 端部15cmのオフセットだけ水温で 0.1〜0.2℃ 変わります（温度依存）。圃場は水浴より高温域なので高温側の値を使うと差はもう少し開きますが、露地基準の範囲内で結論は変わりません。
- 9/22 9:00〜10:00 は引き揚げ〜投入の作業中のため、圃場データからも水浴データからも除外しています。
- 区C 端部40cm は補正値なし。
- **積算温度**は土壌センサー6本の日最高温度を日ごとに足した値（℃・日）です。

<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script src="/js/soil-temp.js"></script>
<script>
SoilTemp.mount({
  base: "/data/soil-temp/mulch-comparison",
  prefix: "mul",
  zoneNames: {
    "zone-a": "区A（白黒マルチ）",
    "zone-b": "区B（黒マルチ）",
    "zone-c": "区C（透明マルチ）",
  },
});

// 水浴は区ごとの比較ではなく「全部が1本に重なる」のを見せたいので、
// 共通パネルではなく単独のグラフにする。
(function () {
  fetch("/data/soil-temp/calibration/bath.json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var times = d.t.map(function (s) { return s * 1000; });
      var datasets = Object.keys(d.series).sort().map(function (key, i) {
        var vals = d.series[key];
        var points = [];
        for (var k = 0; k < times.length; k++) {
          if (vals[k] !== null) points.push({ x: times[k], y: vals[k] });
        }
        return {
          label: key,
          data: points,
          borderColor: "hsl(" + (i * 360 / 20) + ",65%,55%)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0,
        };
      });
      var opts = SoilTemp.chartOptions("水温 (℃)", "hour");
      opts.plugins.legend = { display: false };
      new Chart(document.getElementById("bath-chart"),
                { type: "line", data: { datasets: datasets }, options: opts });
      document.getElementById("bath-loading").style.display = "none";
    })
    .catch(function (e) {
      console.error(e);
      document.getElementById("bath-loading").textContent = "データを読み込めませんでした";
    });
})();
</script>

<div class="page-nav">
  <a href="/projects/soil-temp/mulch-design/">← ③-1 評価準備</a>
  <span class="spacer"></span>
  <a href="/projects/soil-temp/">目次 →</a>
</div>
