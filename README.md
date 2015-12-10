# Greedy-Pure
The pure JavaScript version of Luke Jackson's [https://github.com/lukejacksonn/GreedyNav](Greedy Nav).

## Usage

Include the `greedy.css` and `greedy.js` files in your page, then include the markup which should have a wrapper for the menu (can be `div` or `nav`), a `button` with the class `toggle-links` and the unordered list of links. Example:

```
<nav class="greedy-menu">
  <button class="toggle-links"></button>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
  </ul>
</nav>
```

Then call the Greedy function, passing it an object that contains the selector for the wrapper you used:
```
document.addEventListener('DOMContentLoaded', function(event) {
  var menu = new Greedy({
                        element: '.greedy-menu',
                        counter: true
                       });
});
```

## Contributing

I've included some Gulp tasks to make development and contributing easier. You have to run
* `npm install`
* `gulp sass` for compiling the styles
* `gulp watch` for watching the changed files and reloading the browser automatically

## Todo

* Change the styles to use flexbox
* Add more options
* Add more themes
* Throttle resize event handler
* Attach event handlers in a nicer way
* Fix the bug that throws an error when no links are visible
