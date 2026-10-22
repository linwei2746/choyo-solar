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

    // 3. 首屏轮播（不依赖 GSAP）
    const slides = document.querySelectorAll('.hero-slide');
    const dotsBox = document.querySelector('.hero-dots');
    if (slides.length > 1 && dotsBox) {
        let index = 0;
        let timer = null;
        const dots = [...slides].map((_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('aria-label', `${i + 1}枚目の画像`);
            b.addEventListener('click', () => { show(i); restart(); });
            dotsBox.appendChild(b);
            return b;
        });
        const show = (i) => {
            slides[index].classList.remove('is-active');
            dots[index].classList.remove('is-active');
            index = i;
            slides[index].classList.add('is-active');
            dots[index].classList.add('is-active');
        };
        const restart = () => {
            clearInterval(timer);
            if (!reduceMotion) timer = setInterval(() => show((index + 1) % slides.length), 6000);
        };
        dots[0].classList.add('is-active');
        restart();
    }

    // 4. 动画
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
        document.documentElement.classList.add('no-gsap');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) lenis.on('scroll', ScrollTrigger.update);

    // 首屏文字
    if (document.querySelector('.hero-copy')) {
        gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', delay: 0.2 });
    }

    // 子页面标题
    if (document.querySelector('.page-hero')) {
        gsap.from('.page-hero-ttl, .page-hero-en', { x: -30, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' });
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
