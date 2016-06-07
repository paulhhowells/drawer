var app = app || {};

app.supports = (function (window, document, undefined) {
  'use strict';

  var
    supports = {},
    support,
    features = {
      flex : {
        // Testing for the contemporary flex spec, rather than the original one.
        // Both style.flex and style.flexWrap will be tested.
        test : function (el) {
          return (el.style.flexWrap !== undefined);
        }
      },
      transform : {
        test : function (el) {
          var has2d;
          el.style.transform = 'translateX(0.5em)';
          has2d = window.getComputedStyle(el).getPropertyValue('transform').substr(0, 7);
          return (has2d === 'matrix(');
        }
      },
      transform3d : {
        style : 'transform',
        test : function (el) {
          var has3d;
          el.style.transform = 'translateZ(1px)';
          has3d = window.getComputedStyle(el).getPropertyValue('transform').substr(0, 8);
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
