/**
 * 咨询栏 + 页脚 集中管理脚本
 * 在 <div id="footer-container" data-cta="false"> 上设置 data-cta="false" 可隐藏咨询栏
 */
(() => {
    const container = document.getElementById('footer-container');
    if (!container) return;

    const S = window.SITE;
    const showCta = container.dataset.cta !== 'false';
    const telHref = `tel:${S.tel.replace(/-/g, '')}`;
    const year = new Date().getFullYear();

    const contact = `
    <section class="contact bg-grid" id="contact">
        <div class="wrap">
            <div class="bubble" data-reveal>
                <h2 class="bubble-ttl">お気軽にお問い合わせください</h2>
            </div>
            <div class="contact-cards" data-stagger>
                <div class="contact-card">
                    <h3>お電話でのご相談</h3>
                    <p class="tel">${S.tel}</p>
                    <p>${S.telHours}</p>
                    <a class="btn" href="${telHref}">電話をかける</a>
                </div>
                <div class="contact-card">
                    <h3>メールでのご相談</h3>
                    <p>現地調査・お見積りは無料です。<br>屋根や電気代のことなど、お気軽にどうぞ。</p>
                    <a class="btn" href="mailto:${S.email}">メールを送る</a>
                </div>
            </div>
        </div>
    </section>`;

    container.innerHTML = `
    ${showCta ? contact : ''}
    <footer class="site-footer">
        <div class="wrap">
            <div class="footer-top">
                <div>
                    <a class="footer-logo" href="${S.root}index.html">
                        <img src="${S.logoFull}" alt="${S.nameFull}" width="616" height="402">
                    </a>
                    <p class="footer-info">${S.zip} ${S.address}</p>
                </div>
                <div class="footer-contact">
                    <a href="${telHref}">Tel：${S.tel}</a>
                    <a href="mailto:${S.email}">Mail：${S.email}</a>
                    <small>${S.telHours}</small>
                </div>
            </div>
            <nav class="footer-nav" aria-label="フッターメニュー">
                <a href="${S.root}index.html">ホーム</a>
                <a href="${S.page}service/service.html">サービス</a>
                <a href="${S.page}simulation/simulation.html">発電シミュレーション</a>
                <a href="${S.page}flow/flow.html">導入の流れ</a>
                <a href="${S.page}faq/faq.html">よくあるご質問</a>
                <a href="${S.page}news/news.html">お知らせ</a>
                <a href="#contact">お問い合わせ</a>
            </nav>
            <div class="footer-bottom">
                <span>${S.license}</span>
                <span>&copy; ${year} ${S.copyright}</span>
            </div>
        </div>
    </footer>`;
})();
