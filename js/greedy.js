;(function() {
  'use strict';

  var Greedy = function Greedy(options) {
    this.element = document.querySelector(options.element);
    this.counter = options.counter || false;
    this.visibleLinks = this.element.querySelector('ul');
    this.toggleButton = this.element.querySelector('.toggle-links');
    this.breakpoints = [];
    this.init();
  };

  window.Greedy = Greedy;

  Greedy.prototype.init = function() {
    this.setupMenu();
    this.updateMenu();
    this.addBindings();
  };

  Greedy.prototype.bindMethod = function(name) {
    return this['_' + name + '_'] || Object.defineProperty(
      this, '_' + name + '_', {value: this[name].bind(this)}
    )['_' + name + '_'];
  };

  Greedy.prototype.setupMenu = function() {
    this.hiddenLinks = document.createElement('ul');
    this.hiddenLinks.classList.add('hidden-links');
    this.hiddenLinks.classList.add('links-invisible');
    this.element.appendChild(this.hiddenLinks);
    this.visibleLinks.classList.add('visibile-links');

    if (this.counter) {
      this.toggleButton.classList.add('counter');
    } else {
      this.toggleButton.classList.add('no-counter');
    }
  };

  Greedy.prototype.addBindings = function() {
    window.addEventListener('resize', this.bindMethod('updateMenu'));
    this.toggleButton.addEventListener('click', this.bindMethod('toggleHiddenLinks'));
  };

  Greedy.prototype.updateMenu = function() {
    if (this.element.offsetWidth < this.visibleLinks.offsetWidth + this.toggleButton.offsetWidth) {
      this.toggleButton.classList.add('visible');

      while (this.element.offsetWidth < this.visibleLinks.offsetWidth + this.toggleButton.offsetWidth) {
        this.breakpoints.push(this.visibleLinks.offsetWidth + this.toggleButton.offsetWidth);
        this.hiddenLinks.insertBefore(this.visibleLinks.removeChild(this.visibleLinks.lastChild), this.hiddenLinks.firstChild);
      }
    } else {
      if (this.breakpoints.length) {
        while (this.element.offsetWidth > this.breakpoints[this.breakpoints.length - 1]) {
          this.visibleLinks.appendChild(this.hiddenLinks.removeChild(this.hiddenLinks.firstChild));
          this.breakpoints.pop();
        }
      } else {
        this.toggleButton.classList.remove('visible');
      }
    }

    if (this.counter) {
      this.toggleButton.setAttribute('data-count', this.hiddenLinks.children.length);
    }
  };

  Greedy.prototype.toggleHiddenLinks = function() {
    this.hiddenLinks.classList.toggle('links-invisible');
    this.toggleButton.classList.toggle('links-displayed');
  };
})();