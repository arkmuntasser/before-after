'use strict';

class BeforeAfter {
  constructor() {
    this.widgetEl = document.querySelector('[data-ba-widget]');
    this.leftImageEl = document.querySelector('[data-ba-left]');
    this.rightImageEl = document.querySelector('[data-ba-right]');
    this.handleEl = document.querySelector('[data-ba-handle]');

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;

    this.addEventListeners();
  }

  addEventListeners() {
    this.widgetEl.addEventListener('mousemove', this.onMouseMove);
    this.widgetEl.addEventListener('touchmove', this.onTouchMove);
  }

  onTouchMove(evt) {
    this.startX = evt.touches[0].pageX;
    requestAnimationFrame(this.update);
  }

  onMouseMove(evt) {
    this.startX = evt.pageX;
    requestAnimationFrame(this.update);
  }

  update() {
    const widgetRect = this.widgetEl.getBoundingClientRect();
    const widgetXPosition = this.startX - widgetRect.left;
    const leftImageWidth = (widgetXPosition / widgetRect.width) * 100;
    const rightImageWidth = 100 - leftImageWidth;

    if(leftImageWidth >= 0 && rightImageWidth <= 100) {
      this.handleEl.style.left = `${leftImageWidth}%`;
      this.leftImageEl.style.width = `${leftImageWidth}%`;
      this.rightImageEl.style.width = `${rightImageWidth}%`;
    }
  }
}

new BeforeAfter();
