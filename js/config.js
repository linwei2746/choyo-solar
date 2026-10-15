/**
 * 站点基本信息 —— 公司名、电话、地址等都在这里统一修改
 * 页面中带 data-site="xxx" 的元素会自动填入对应内容
 */
window.SITE = {
    nameJp: '暢陽ソーラー',
    nameFull: '暢陽ソーラー株式会社',
    nameEn: 'CHOYO SOLAR',
    copyright: 'Choyo Solar Co., Ltd.',
    tel: '0120-000-000',          // TODO: 替换为真实号码
    telHours: '受付 9:00–18:00（水曜定休）',
    zip: '〒000-0000',            // TODO
    address: '東京都〇〇区〇〇 1-2-3',  // TODO
    email: 'info@example.com',    // TODO
    license: '建設業許可 東京都知事（般-00）第000000号'  // TODO：如无可删除
};

// 公共路径：子页面位于 /page/xxx/ 下
window.SITE.isSubPage = window.location.pathname.includes('/page/');
window.SITE.root = window.SITE.isSubPage ? '../../' : './';
window.SITE.page = window.SITE.isSubPage ? '../' : 'page/';

// Logo：升起的太阳 + 三排面板
window.SITE.logoSvg = `
<svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M9 23a11 11 0 0 1 22 0z" fill="#d9822b"/>
    <path d="M4 27.5h32M8 32h24M12 36.5h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>
    <path d="M20 4.5v4M8.3 9.3l2.8 2.8M31.7 9.3l-2.8 2.8" stroke="#d9822b" stroke-width="1.6" stroke-linecap="square"/>
</svg>`;
