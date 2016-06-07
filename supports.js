var app = app || {};

app.supports = (function (window, document, undefined) {
  'use strict';

  var
    supports = {},
    support,
    features = {
      transform : {
        test : function (el) {
          el.style.transform = 'translateX(0.5em)';
          var has2d = window.getComputedStyle(el).getPropertyValue('transform').substr(0, 7);
          return (has2d === 'matrix(');
        }
      },
      transform3d : {
        style : 'transform',
        test : function (el) {
          // el.style.transform = 'translate3d(1px, 1px, 1px)';
          el.style.transform = 'translateZ(1px)';
          var has3d = window.getComputedStyle(el).getPropertyValue('transform').substr(0, 8);
          return (has3d === 'matrix3d');
        }
      },
      transition : {}
    },
    feature,
    featureKey,
    style,
    i,
    el = document.createElement('div'),
    body = document.body || document.createElement('body');

  // Add el to the body to get the computed style
  body.insertBefore(el, null);

  if (!!window.getComputedStyle) {
    // Loop through styles and determine if they are supported.
    for (featureKey in features) {
      if (features.hasOwnProperty(featureKey)) {
        feature = features[featureKey];
        style = feature.style || featureKey;

        if (el.style[style] !== undefined) {
          support = (feature.test) ? feature.test(el) : true;
          supports[featureKey] = support;
        }
      }
    }
  }

  // Clean up DOM.
  body.removeChild(el);

  // See also: https://www.bigfork.co.uk/takeaway/cutting-the-mustard-3d-transform-feature-detection

  return supports;
})(window, document);
