/**
 * 発電シミュレーション（概算）
 * 数值均为一般性参考值，可在 ASSUMPTIONS 中调整
 */
(() => {
    const form = document.getElementById('sim-form');
    if (!form) return;

    const ASSUMPTIONS = {
        buyPrice: 31,        // 買電単価の目安（円/kWh）：全国家庭電気製品公正取引協議会の目安単価
        co2: 0.45,           // CO2排出係数の目安（kg-CO2/kWh）
        areaPerKw: 5.5,      // 1kWあたりの必要屋根面積の目安（㎡）
        selfRate: { none: 0.3, battery: 0.65 },   // 発電量のうち自家消費できる割合の目安
        maxSelfShare: 0.7    // 自家消費は使用量の7割までと仮定
    };

    // 地域別 1kWあたりの年間発電量の目安（kWh/kW・年）
    const REGION_YIELD = {
        hokkaido: 1100, tohoku: 1050, kanto: 1150, chubu: 1150,
        kansai: 1200, chugoku: 1200, kyushu: 1200
    };
    // 屋根の向きによる補正
    const DIR_FACTOR = { s: 1.0, se: 0.96, ew: 0.85, n: 0.65 };

    const $ = id => document.getElementById(id);
    const yen = n => Math.round(n).toLocaleString('ja-JP');

    const setRangeFill = (input) => {
        const p = (input.value - input.min) / (input.max - input.min) * 100;
        input.style.setProperty('--p', `${p}%`);
    };

    const calc = () => {
        const kw = parseFloat($('sim-kw').value);
        const bill = parseFloat($('sim-bill').value);
        const region = $('sim-region').value;
        const dir = form.querySelector('input[name="dir"]:checked').value;
        const bat = form.querySelector('input[name="bat"]:checked').value;
        const sell = Math.max(0, parseFloat($('sim-sell').value) || 0);

        const gen = kw * REGION_YIELD[region] * DIR_FACTOR[dir];
        const annualUse = bill / ASSUMPTIONS.buyPrice * 12;
        const self = Math.min(gen * ASSUMPTIONS.selfRate[bat], annualUse * ASSUMPTIONS.maxSelfShare);
        const surplus = gen - self;
        const saving = self * ASSUMPTIONS.buyPrice;
        const income = surplus * sell;

        $('out-kw').innerHTML = `${kw.toFixed(1)}<small>kW</small>`;
        $('out-bill').innerHTML = `${yen(bill)}<small>円</small>`;
        $('r-area').textContent = `約 ${Math.round(kw * ASSUMPTIONS.areaPerKw)}`;
        $('r-gen').textContent = yen(gen);
        $('r-self').textContent = yen(saving);
        $('r-sell').textContent = yen(income);
        $('r-co2').textContent = yen(gen * ASSUMPTIONS.co2);
        $('r-total').textContent = yen(saving + income);
        $('r-month').textContent = yen((saving + income) / 12);

        form.querySelectorAll('input[type="range"]').forEach(setRangeFill);
    };

    form.addEventListener('input', calc);
    form.addEventListener('submit', e => e.preventDefault());
    calc();
})();
