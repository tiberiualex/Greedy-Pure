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
    this.calculateBreakpoints();
    this.updateMenu();
    this.addBindings();
  };

  /*
    Creates/returns a method bounded with 'this'. Used for creating
    named event listeners that can easily be removed
  */
  Greedy.prototype.bindMethod = function(name) {
    return this['_' + name + '_'] || Object.defineProperty(
      this, '_' + name + '_', {value: this[name].bind(this)}
    )['_' + name + '_'];
  };

  /*
    Creates the necessary markup and adds the necessary classes
  */
  Greedy.prototype.setupMenu = function() {
    this.hiddenLinks = document.createElement('ul');
    this.hiddenLinks.classList.add('hidden-links');
    this.hiddenLinks.classList.add('links-invisible');
    this.element.appendChild(this.hiddenLinks);
    this.visibleLinks.classList.add('visible-links');

    if (this.counter) {
      this.toggleButton.classList.add('counter');
    } else {
      this.toggleButton.classList.add('no-counter');
    }
  };

  /*
    For each navigation item, calculate how much space is needed
    to accomodate it
  */
  Greedy.prototype.calculateBreakpoints = function() {
    var childrenWidth = 0;

    for (var i = 0; i < this.visibleLinks.children.length; i++) {
      childrenWidth += this.visibleLinks.children[i].offsetWidth;
      this.breakpoints[i] = childrenWidth;
    }
  };

  Greedy.prototype.addBindings = function() {
    window.addEventListener('resize', this.bindMethod('updateMenu'));
    this.toggleButton.addEventListener('click', this.bindMethod('toggleHiddenLinks'));
  };

  Greedy.prototype.updateMenu = function() {
    var availableSpace = this.element.offsetWidth - this.toggleButton.offsetWidth;
    var itemsVisible = this.visibleLinks.children.length;
    var requiredSpace = this.breakpoints[itemsVisible - 1];

    /*
      Check if there is not enough space for the visible links or
      if there is space available for the hidden link
    */
    if (availableSpace < this.breakpoints[itemsVisible - 1]) {
      this.toggleButton.classList.add('visible');

      while (availableSpace < this.breakpoints[itemsVisible - 1]) {
        this.hiddenLinks.insertBefore(this.visibleLinks.children[itemsVisible - 1], this.hiddenLinks.firstChild);
        itemsVisible--;
      }
    } else if (availableSpace > this.breakpoints[itemsVisible]) {
      while (availableSpace > this.breakpoints[itemsVisible]) {
        this.visibleLinks.appendChild(this.hiddenLinks.removeChild(this.hiddenLinks.firstChild));
        itemsVisible++;
      }
    }

    if (this.counter) {
      this.toggleButton.setAttribute('data-count', this.hiddenLinks.children.length);
      if (!this.hiddenLinks.children.length) {
        this.toggleButton.classList.remove('visible');
      }
    }
  };

  Greedy.prototype.toggleHiddenLinks = function() {
    this.hiddenLinks.classList.toggle('links-invisible');
    this.toggleButton.classList.toggle('links-displayed');
  };
})();