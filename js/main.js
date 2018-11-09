(function($) {
  function getBodyScrollTop() {
    var scrollTop = window.pageYOffset  //用于FF
                  || document.documentElement.scrollTop
                  || document.body.scrollTop
                  || 0;

    return scrollTop;
  }

  function setHeader() {
    var newScrollTop = getBodyScrollTop();
    var bannerHeight = $('.banner').height();

    if (newScrollTop >= bannerHeight && !$('.header').hasClass('fadeInDown')) {
      $('.header').show();
      $('.header').addClass('fadeInDown');
      $('.header').removeClass('fadeOutUp');
    } else if (newScrollTop < bannerHeight && !$('.header').hasClass('fadeOutUp')) {
      $('.header').addClass('fadeOutUp');
      $('.header').removeClass('fadeInDown');
    }
  }

  $( window ).scroll(function() {
    setHeader();
  });

  window.onload = function () {
    $('.loading').addClass('hidden');
    setHeader();
  };
}(jQuery));