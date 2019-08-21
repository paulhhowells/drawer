var app = app || {};

app.drawer = (function (window, document, undefined) {
  var button = {
    show : 'show nav',
    hide : 'hide nav'
  };

  // On ready.
  $(function () {
    $('.drawer__button').text(button.show);
  });

  return {
    open : false,
    click : click,
  };

  function click (ev) {
    app.drawer.open = !app.drawer.open;

    if (app.drawer.open) {
      show();
    }
    else {
      hide();
    }
  }

  function show () {
    $('.drawer__button')
      .addClass('is-open')
      .text(button.hide);
    $('.drawer').addClass('is-open');

    setTimeout(addHandlerToMain, 1);
  }

  function hide () {
    $('.drawer__button')
      .removeClass('is-open')
      .text(button.show);
    $('.drawer').removeClass('is-open');
    $('.drawer__main').off('click', app.drawer.click);
  }

  function addHandlerToMain () {
    $('.drawer__main').on('click', app.drawer.click);
  }
})(window, document);

$(function () {
  $('.drawer__button').click(app.drawer.click);

  if (app.supports.transform && app.supports.transition) {
    $('body').addClass('cuts-mustard');
  }

  if (app.supports.transform3d) {
    $('body').addClass('supports-transform3d');
  }
});
