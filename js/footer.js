/**
 * 页脚 + 咨询引导条 集中管理脚本
 * 在 <div id="footer-container" data-cta="false"> 上设置 data-cta="false" 可隐藏引导条（如咨询页）
 */
(() => {
    const container = document.getElementById('footer-container');
    if (!container) return;

    const S = window.SITE;
    const showCta = container.dataset.cta !== 'false';
    const telHref = `tel:${S.tel.replace(/-/g, '')}`;
    const year = new Date().getFullYear();

    const cta = `
    <section class="cta" id="contact">
        <div class="cta-sun" aria-hidden="true"></div>
        <div class="wrap cta-inner">
            <div data-reveal>
                <p class="sec-label">Contact</p>
                <h2 class="cta-title">まずは、屋根を<br>見せてください。</h2>
                <p class="cta-text">現地調査・お見積りは無料です。<br class="pc-only">設置に向かない屋根の場合は、正直にそうお伝えします。</p>
            </div>
            <div class="cta-actions" data-reveal>
                <a class="cta-tel" href="${telHref}">
                    <small>お電話でのご相談（${S.telHours.replace('受付 ', '')}）</small>
                    <strong>${S.tel}</strong>
                </a>
                <a class="btn" href="mailto:${S.email}">メールでお問い合わせ<span class="arrow"></span></a>
            </div>
        </div>
    </section>`;

    container.innerHTML = `
    ${showCta ? cta : ''}
    <footer class="site-footer">
        <div class="wrap">
            <div class="footer-grid">
                <div class="footer-info">
                    <a class="brand" href="${S.root}index.html">
                        ${S.logoSvg}
                        <span class="brand-text">
                            <span class="brand-jp">${S.nameJp}</span>
                            <span class="brand-en">${S.nameEn}</span>
                        </span>
                    </a>
                    <dl>
                        <dt>所在地</dt><dd>${S.zip}<br>${S.address}</dd>
                        <dt>電話</dt><dd><a href="${telHref}">${S.tel}</a></dd>
                        <dt>受付</dt><dd>${S.telHours.replace('受付 ', '')}</dd>
                    </dl>
                </div>
                <div class="footer-nav">
                    <div>
                        <h4>SERVICE</h4>
                        <ul>
                            <li><a href="${S.page}service/service.html#solar">太陽光発電</a></li>
                            <li><a href="${S.page}service/service.html#battery">家庭用蓄電池</a></li>
                            <li><a href="${S.page}service/service.html#v2h">V2H・EV連携</a></li>
                            <li><a href="${S.page}service/service.html#maintenance">点検・メンテナンス</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>GUIDE</h4>
                        <ul>
                            <li><a href="${S.page}simulation/simulation.html">発電シミュレーション</a></li>
                            <li><a href="${S.page}flow/flow.html">導入の流れ</a></li>
                            <li><a href="${S.page}faq/faq.html">よくあるご質問</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>COMPANY</h4>
                        <ul>
                            <li><a href="${S.root}index.html#concept">私たちの考え</a></li>
                            <li><a href="${S.root}index.html#promise">私たちの約束</a></li>
                            <li><a href="${S.page}news/news.html">お知らせ</a></li>
                            <li><a href="#contact">お問い合わせ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <span>${S.license}</span>
                <span class="en">&copy; ${year} ${S.copyright}</span>
            </div>
        </div>
    </footer>`;
})();
