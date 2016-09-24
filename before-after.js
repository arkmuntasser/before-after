'use strict';

class BeforeAfter {
  constructor() {
    this.widgets  = Array.from(document.querySelectorAll('[data-ba-widget]'));
    this.bottomImageEls = [];
    this.topImageEls = [];
    this.handleEls = [];

    const instance = this;
    this.widgets.forEach(function(widget) {
      instance.bottomImageEls.push(widget.querySelector('[data-ba-bottom]'));
      instance.topImageEls.push(widget.querySelector('[data-ba-top]'));
      instance.handleEls.push(widget.querySelector('[data-ba-handle]'));
    });

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
    this.topImageEls.forEach(function(topImageEl) {
      let src = topImageEl.querySelector('img').getAttribute('src');
      topImageEl.style.backgroundImage = `url(${src})`;
    });
  }

  setTopImageSize() {
    for(let i = 0; i < this.topImageEls.length; i++){
      let bottomImageRect = this.bottomImageEls[i].getBoundingClientRect();
      this.topImageEls[i].style.backgroundSize = `${bottomImageRect.width}px auto`;
    }
  }

  resizeDebounce() {
    clearTimeout(this.screenResizeTimeout);
    this.screenResizeTimeout = setTimeout(this.setTopImageSize, 250);
  }

  addEventListeners() {
    const instance = this;
    this.widgets.forEach(function(widget) {
      widget.addEventListener('mousemove', instance.onMouseMove);
      widget.addEventListener('touchstart', instance.onStart);
      widget.addEventListener('touchmove', instance.onTouchMove);
      widget.addEventListener('touchend', instance.onEnd);
    });

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

    const targetIndex = this.widgets.indexOf(evt.target);
    this.handleEls[targetIndex].style.willChange = 'left';
    this.topImageEls[targetIndex].style.willChange = 'width';
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
    const targetIndex = this.widgets.indexOf(evt.target);
    this.handleEls[targetIndex].style.willChange = 'left';
    this.topImageEls[targetIndex].style.willChange = 'width';

    evt.preventDefault();
  }

  onEnd(evt) {
    if(!this.target) {
      return;
    }

    this.target = null;
    const targetIndex = this.widgets.indexOf(evt.target);
    this.handleEls[targetIndex].style.willChange = 'initial';
    this.topImageEls[targetIndex].style.willChange = 'initial';
  }

  update() {
    if(!this.target) {
      return;
    }

    const widget = this.target;
    const widgetRect = widget.getBoundingClientRect();
    const widgetXPosition = this.startX - widgetRect.left;
    const bottomImageWidth = (widgetXPosition / widgetRect.width) * 100;
    const topImageWidth = 100 - bottomImageWidth;
    const targetIndex = this.widgets.indexOf(this.target);

    if(topImageWidth >= 0 && topImageWidth <= 100) {
      this.handleEls[targetIndex].style.left = `${bottomImageWidth}%`;
      this.topImageEls[targetIndex].style.width = `${topImageWidth}%`;
    }
  }

  resetTarget() {
    const targetIndex = this.widgets.indexOf(this.target);
    this.handleEls[targetIndex].style.willChange = 'initial';
    this.topImageEls[targetIndex].style.willChange = 'initial';
    this.target = null;
  }
}

new BeforeAfter();
