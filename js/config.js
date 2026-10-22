/**
 * 站点基本信息 —— 公司名、电话、地址等都在这里统一修改
 * 页面中带 data-site="xxx" 的元素会自动填入对应内容
 */
window.SITE = {
    nameJp: 'グリーンエネルギーテクノ',
    nameFull: 'グリーンエネルギーテクノ株式会社',
    nameEn: 'Green Energy Techno Co., Ltd.',
    copyright: 'Green Energy Techno Co., Ltd.',
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

// Logo 图形（从公司提供的 LOGO 原图中抠出，透明底 PNG）
window.SITE.logoMark = `${window.SITE.root}images/common/logo-mark.png`;
window.SITE.logoFull = `${window.SITE.root}images/common/logo-full.png`;
