export default {
  debounce: 500,
  onResize(win) {
    const {
      innerWidth: winWidth,
      innerHeight: winHeight,
    } = win;
    let breakpoint = 'desktop';
    if (win.innerWidth >= 568) {
      breakpoint = 'tablet';
    }
    if (win.innerWidth >= 860) {
      breakpoint = 'desktop-sm';
    }
    if (win.innerWidth >= 1024) {
      breakpoint = 'desktop';
    }
    if (win.innerWidth < 768) {
      breakpoint = 'mobile';
    }
    return { breakpoint, winHeight, winWidth };
  },
  breakpoints: {
    tablet: 568,
    desktopSmall: 860,
    desktop: 1024,
  },
};
