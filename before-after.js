'use strict';

class BeforeAfter {
  constructor() {
    this.widgetEl = document.querySelector('[data-ba-widget]');
    this.bottomImageEl = document.querySelector('[data-ba-bottom]');
    this.topImageEl = document.querySelector('[data-ba-top]');
    this.handleEl = document.querySelector('[data-ba-handle]');

    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.update = this.update.bind(this);
    this.setTopImageSize = this.setTopImageSize.bind(this);
    this.resizeDebounce = this.resizeDebounce.bind(this);
    this.resetTarget = this.resetTarget.bind(this);

    this.target = null;
    this.startX = 0;
    this.screenResizeTimeout = null;
    this.mouseIdleTimeout = null;

    this.setTopImageSrc();
    this.setTopImageSize();
    this.addEventListeners();
  }

  setTopImageSrc() {
    const src = this.topImageEl.querySelector('img').getAttribute('src');
    this.topImageEl.style.backgroundImage = `url(${src})`;
  }

  setTopImageSize() {
    const bottomImageRect = this.bottomImageEl.getBoundingClientRect();
    this.topImageEl.style.backgroundSize = `${bottomImageRect.width}px auto`;
  }

  resizeDebounce() {
    clearTimeout(this.screenResizeTimeout);
    this.screenResizeTimeout = setTimeout(this.setTopImageSize, 250);
  }

  addEventListeners() {
    this.widgetEl.addEventListener('mousemove', this.onMouseMove);
    this.widgetEl.addEventListener('touchstart', this.onStart);
    this.widgetEl.addEventListener('touchmove', this.onTouchMove);
    this.widgetEl.addEventListener('touchend', this.onEnd);
    window.addEventListener('resize', this.resizeDebounce);
  }

  onTouchMove(evt) {
    if(!this.target) {
      return;
    }

    this.startX = evt.touches[0].pageX;
    this.update();
  }

  onMouseMove(evt) {
    if(!evt.target.hasAttribute('data-ba-widget')) {
      evt.preventDefault();
      return;
    }

    clearTimeout(this.mouseIdleTimeout);
    this.mouseIdleTimeout = setTimeout(this.resetTarget, 2000);

    this.handleEl.style.willChange = 'left';
    this.topImageEl.style.willChange = 'width';
    this.target = evt.target;
    this.startX = evt.pageX;
    this.update();
  }

  onStart(evt) {
    if(this.target) {
      return;
    }

    if(!evt.target.hasAttribute('data-ba-widget')) {
      return;
    }

    this.target = evt.target;
    this.handleEl.style.willChange = 'left';
    this.topImageEl.style.willChange = 'width';

    evt.preventDefault();
  }

  onEnd(evt) {
    if(!this.target) {
      return;
    }

    this.target = null;
    this.handleEl.style.willChange = 'initial';
    this.topImageEl.style.willChange = 'initial';
  }

  update() {
    if(!this.target) {
      return;
    }

    const widgetRect = this.widgetEl.getBoundingClientRect();
    const widgetXPosition = this.startX - widgetRect.left;
    const bottomImageWidth = (widgetXPosition / widgetRect.width) * 100;
    const topImageWidth = 100 - bottomImageWidth;

    if(topImageWidth >= 0 && topImageWidth <= 100) {
      this.handleEl.style.left = `${bottomImageWidth}%`;
      this.topImageEl.style.width = `${topImageWidth}%`;
    }
  }

  resetTarget() {
    this.handleEl.style.willChange = 'initial';
    this.topImageEl.style.willChange = 'initial';
    this.target = null;
  }
}

new BeforeAfter();
