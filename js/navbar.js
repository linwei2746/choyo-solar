/**
 * 导航栏集中管理脚本
 * 菜单项在 NAV_ITEMS 中统一维护
 * 每个菜单项对应 page/xxx/xxx.html；「無料見積り」跳到每页底部的咨询栏（#contact）
 */
(() => {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const S = window.SITE;
    const NAV_ITEMS = [
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
            <a class="header-tel" href="${telHref}">
                <strong>${S.tel}</strong>
                <small>${S.telHours}</small>
            </a>
            <a class="btn btn--sun btn--sm" href="${contactHref}">無料見積り<span class="arrow"></span></a>
            <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer">
                <span class="bars"></span><span class="label">MENU</span>
            </button>
        </div>
    </header>
    <div class="drawer" id="drawer">
        <ul class="drawer-nav">
            ${NAV_ITEMS.map(i => `<li><a href="${i.href}">${i.jp}<span>${i.en}</span></a></li>`).join('')}
            <li><a href="${contactHref}">お問い合わせ<span>Contact</span></a></li>
        </ul>
        <div class="drawer-foot">
            <a class="drawer-tel" href="${telHref}">${S.tel}</a>
            <small>${S.telHours}</small>
            <a class="btn btn--sun" href="${contactHref}">無料見積り・現地調査のご依頼<span class="arrow"></span></a>
        </div>
    </div>`;

    // 当前页面高亮
    const current = window.location.pathname.split('/').pop();
    container.querySelectorAll('.gnav a').forEach(a => {
        const file = a.getAttribute('href').split('/').pop();
        if (current && current !== 'index.html' && file === current) a.classList.add('is-current');
    });

    // 汉堡菜单
    const btn = container.querySelector('.menu-btn');
    const label = btn.querySelector('.label');
    const setMenu = (open) => {
        document.body.classList.toggle('is-menu-open', open);
        btn.setAttribute('aria-expanded', open);
        label.textContent = open ? 'CLOSE' : 'MENU';
    };
    btn.addEventListener('click', () => setMenu(!document.body.classList.contains('is-menu-open')));
    container.querySelectorAll('.drawer a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

    // 向下滚动时隐藏、向上滚动时显示
    const header = container.querySelector('.site-header');
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 10);
        if (!document.body.classList.contains('is-menu-open')) {
            header.classList.toggle('is-hidden', y > lastY && y > 240);
        }
        lastY = y;
    }, { passive: true });
})();
