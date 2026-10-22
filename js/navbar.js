/**
 * 导航栏集中管理脚本
 * 菜单项在 NAV_ITEMS 中统一维护；「お問い合わせ」跳到每页底部的咨询栏（#contact）
 */
(() => {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const S = window.SITE;
    const NAV_ITEMS = [
        { href: `${S.root}index.html`, jp: 'ホーム', en: 'Home' },
        { href: `${S.page}service/service.html`, jp: 'サービス', en: 'Service' },
        { href: `${S.page}simulation/simulation.html`, jp: '発電シミュレーション', en: 'Simulation' },
        { href: `${S.page}flow/flow.html`, jp: '導入の流れ', en: 'Flow' },
        { href: `${S.page}faq/faq.html`, jp: 'よくあるご質問', en: 'FAQ' },
        { href: `${S.page}news/news.html`, jp: 'お知らせ', en: 'News' },
    ];
    const contactHref = '#contact';
    const telHref = `tel:${S.tel.replace(/-/g, '')}`;

    container.innerHTML = `
    <header class="site-header">
        <a class="brand" href="${S.root}index.html" aria-label="${S.nameFull} トップへ">
            ${S.logoSvg}
            <span class="brand-text">
                <span class="brand-jp">${S.nameJp}</span>
                <span class="brand-en">${S.nameEn}</span>
            </span>
        </a>
        <nav class="gnav" aria-label="メインメニュー">
            <ul>
                ${NAV_ITEMS.map(i => `<li><a href="${i.href}">${i.jp}</a></li>`).join('')}
            </ul>
        </nav>
        <div class="header-cta">
            <a class="header-contact" href="${contactHref}">お問い合わせ<small>CONTACT</small></a>
            <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="メニューを開く">
                <span class="bars"><span></span></span>
            </button>
        </div>
    </header>
    <div class="drawer" id="drawer">
        <ul class="drawer-nav">
            ${NAV_ITEMS.map(i => `<li><a href="${i.href}">${i.jp}<span>${i.en}</span></a></li>`).join('')}
        </ul>
        <div class="drawer-foot">
            <a class="drawer-tel" href="${telHref}">${S.tel}</a>
            <small>${S.telHours}</small>
            <a class="btn btn--orange btn--block" href="${contactHref}">無料見積り・お問い合わせ</a>
        </div>
    </div>`;

    // 当前页面高亮（首页按目录判断）
    const path = window.location.pathname;
    const current = path.endsWith('/') ? 'index.html' : path.split('/').pop();
    container.querySelectorAll('.gnav a').forEach(a => {
        const file = a.getAttribute('href').split('/').pop();
        if (file === current) a.classList.add('is-current');
    });

    // 汉堡菜单
    const btn = container.querySelector('.menu-btn');
    const setMenu = (open) => {
        document.body.classList.toggle('is-menu-open', open);
        btn.setAttribute('aria-expanded', open);
        btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };
    btn.addEventListener('click', () => setMenu(!document.body.classList.contains('is-menu-open')));
    container.querySelectorAll('.drawer a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();
