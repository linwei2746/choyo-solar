/**
 * 全站交互
 * - Lenis（darkroomengineering/lenis）平滑滚动
 * - GSAP + ScrollTrigger（greensock/GSAP）入场与视差动画
 * 两个库都通过 CDN 加载；加载失败时页面照常显示，只是没有动画
 */
(() => {
    const S = window.SITE;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. 填入站点公共信息
    document.querySelectorAll('[data-site]').forEach(el => {
        const v = S[el.dataset.site];
        if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-site-tel]').forEach(el => {
        el.setAttribute('href', `tel:${S.tel.replace(/-/g, '')}`);
    });
    document.title = document.title.replace('{name}', S.nameFull);

    // 2. 平滑滚动
    let lenis = null;
    if (window.Lenis && !reduceMotion) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        if (window.gsap) {
            gsap.ticker.add(t => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);
        } else {
            const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        }
    }

    const headerOffset = () => -(document.querySelector('.site-header')?.offsetHeight || 0);
    const scrollToTarget = (target) => {
        if (lenis) lenis.scrollTo(target, { offset: headerOffset() });
        else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + headerOffset(), behavior: 'smooth' });
    };

    // 同页锚点（包括 index.html#xxx 这种指向当前页的链接）
    document.addEventListener('click', e => {
        const a = e.target.closest('a[href*="#"]');
        if (!a) return;
        const url = new URL(a.href, location.href);
        const norm = p => p.replace(/index\.html$/, '');
        if (norm(url.pathname) !== norm(location.pathname) || !url.hash) return;
        const target = document.querySelector(decodeURIComponent(url.hash));
        if (!target) return;
        e.preventDefault();
        scrollToTarget(target);
        history.replaceState(null, '', url.hash);
    });

    // 从别的页面带 hash 进入时，修正固定页头的遮挡
    if (location.hash) {
        window.addEventListener('load', () => {
            const target = document.querySelector(decodeURIComponent(location.hash));
            if (target) setTimeout(() => scrollToTarget(target), 60);
        });
    }

    // 3. 动画
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
        document.documentElement.classList.add('no-gsap');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on('scroll', ScrollTrigger.update);

    // 首屏
    const hero = document.querySelector('.hero');
    if (hero) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from('.hero-title', { y: 40, opacity: 0, duration: 1.4 })
            .fromTo('.hero-visual .main', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.6, ease: 'expo.inOut' }, 0)
            .from('.hero-visual .main img', { scale: 1.25, duration: 2.2 }, 0)
            .fromTo('.hero-visual .sub', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'expo.inOut' }, 0.6)
            .from('.hero-side > *', { y: 24, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.5)
            .from('.hero-foot', { opacity: 0, duration: 1 }, 1.1);
    }

    // 子页面标题
    if (document.querySelector('.page-head')) {
        gsap.from('.page-en, .page-title, .page-lead', { y: 30, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' });
        gsap.fromTo('.page-visual', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'expo.inOut', delay: 0.2 });
    }

    // 滚动入场
    gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });

    // 列表逐项入场
    gsap.utils.toArray('[data-stagger]').forEach(list => {
        gsap.from(list.children, {
            y: 28,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: list, start: 'top 85%', once: true }
        });
    });

    // 图片视差（图片高度为容器的 116%~120%）
    gsap.utils.toArray('[data-parallax] img').forEach(img => {
        gsap.fromTo(img, { yPercent: -8 }, {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    // 单价对比条
    gsap.utils.toArray('.compare-bar i').forEach(bar => {
        gsap.from(bar, {
            scaleX: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', once: true }
        });
    });
})();
