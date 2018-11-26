var currentIndex = -1;
var t = null;

function timedCount() {
  currentIndex = (currentIndex + 1) % 6;

  activeFeaturePoint(currentIndex);

  t = setTimeout("timedCount()", 6000);
}

function stopCount() {
  clearTimeout(t);
}

function activeFeaturePoint(index) {
  var items = $('.features__item');
  var circleItems = $('.features__circle-item');

  $('.features__circle-item').removeClass('active');
  $('.features__item').removeClass('active');

  $.each(circleItems, function() {
    if ($(this).data('value') === index) {
      $(this).addClass('active');
    }
  });

  $.each(items, function() {
    if ($(this).data('value') === index) {
      $(this).addClass('active');
    }
  });
}

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

    if (newScrollTop >= bannerHeight && !$('.header').hasClass('white')) {
      $('.header').addClass('white');
      $('.header').removeClass('black');
    } else if (newScrollTop < bannerHeight && newScrollTop > 0 && !$('.header').hasClass('black')) {
      $('.header').addClass('black');
      $('.header').removeClass('white');
    } else if (newScrollTop <= 0) {
      $('.header').removeClass('black');
      $('.header').removeClass('white');
    }
  }

  $('.features__circle-item, .features__item').on('mouseenter', function() {
    stopCount();

    var el = $(this);

    setTimeout(function() {
      currentIndex = el.data('value');
      activeFeaturePoint(currentIndex);
    }, 10);

  });

  $('.features__circle-item, .features__item').on('mouseleave', function() {
    timedCount();
  });

  $( window ).scroll(function() {
    setHeader();
  });

  window.onload = function () {
    $('.loading').addClass('hidden');
    setHeader();
    timedCount();
  };
}(jQuery));