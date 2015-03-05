alv-ch-ng.text-truncate [![Build Status](https://travis-ci.org/alv-ch-ng/text-truncate.svg?branch=master)](https://travis-ci.org/alv-ch-ng/text-truncate) [![Coverage Status](https://coveralls.io/repos/alv-ch-ng/text-truncate/badge.svg)](https://coveralls.io/r/alv-ch-ng/text-truncate) [![Code Climate](https://codeclimate.com/github/alv-ch-ng/text-truncate/badges/gpa.svg)](https://codeclimate.com/github/alv-ch-ng/text-truncate)
=======================

This is a simple, but fully functional, directive for truncating text in [angularjs](https://angularjs.org/) apps. This directive not only truncates your text, but also permits toggling the hidden part of the truncated text.

It's a fork from the original directive [*ng-text-truncate*](https://github.com/lorenooliveira/ng-text-truncate).

Usage Instructions
==================

1. Include the JS file
----------------------

*Bower*

```shell
$ bower install alv-ch-ng.text-truncate
```

```html
<script src="angular.min.js"></script>
...
<script src="alv-ch-ng.text-truncate.js"></script>
```

As usual, include this file after the inclusion of the *angular.min.js* file.

2. Import *alv-ch-ng.text-truncate* in your app
--------------------------------------

```javascript
angular.module( "TestApp", [ "alv-ch-ng.text-truncate" ] );
```

3. Assign a text to some variable
---------------------------------

```javascript
$scope.longText = "Lorem ipsum dolor sit amet, and a possibly long remaining text.";
```

4. Apply the directive to the element where you intend to put your text
-----------------------------------------------------------------------

Use the *ng-text-truncate* attribute to pass the variable holding your text. In the *ng-tt-chars-threshold* attribute you should indicate the maximum number of chars to be displayed before truncation. That is, any string bigger than *ng-tt-chars-threshold* will be truncated.

```html
<p ng-text-truncate="longText"
   ng-tt-chars-threshold="40"></p>
```

6. Features
-----------

By using this directive you can:

* Truncate your text based on the number of chars to be displayed;
* Truncate your text based on the number of words to be displayed;
* Toggle the hidden part of truncated text visible or not;
* Customize the text of the toggling elements (the defaults are "More" and "Less");
* If you want/need, you can just truncate the text (i.e., ommit the toggling elements);
* Take a ride in Bootstrap's styles for the toggling elements;
* Customize the appearance of the toggling elements by means of a custom CSS class (for the case you don't like Bootstrap's defaults or if you are not using Bootstrap).
