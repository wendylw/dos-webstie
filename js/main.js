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

function setTeam() {
  if (client().w < 480) {
    var itemWidth = client().w * 0.58;
    var teamLength = $('.team').find('.team__item').length;
    var investorsLength = $('.investors').find('.team__item').length;
    var partnersLength = $('.partners').find('.team__item').length;

    $('.team .team__list').css('width', itemWidth * teamLength + 'px');
    $('.investors .team__list').css('width', itemWidth * investorsLength + 'px');
    $('.partners .team__list').css('width', itemWidth * partnersLength + 'px');

    $('.team__item').css({
      'width': itemWidth,
      'display': 'inline-block'
    });
  } else {
    $('.team .team__list').attr('style', '');
    $('.investors .team__list').attr('style', '');
    $('.partners .team__list').attr('style', '');
    $('.team__item').attr('style', '');
  }
}

function banner() {
  if (client().h > $('.banner').height()) {
    var increaseHeight = Math.floor((client().h - $('.banner').height() - 64) / 2);
    var paddingVertical = ((client().w < 768) ? 100 : 50) + increaseHeight;

    $('.banner .container').css('padding', paddingVertical + 'px 0');
  }
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
      $('.header__mobile-nav img').attr('src', './img/nav-black.png');
      $('.header__language-icon').attr('src', './img/down-b.png');
    } else if (newScrollTop < bannerHeight && newScrollTop > 0 && !$('.header').hasClass('black')) {
      $('.header').addClass('black');
      $('.header').removeClass('white');
      $('.header__mobile-nav img').attr('src', './img/nav.png');
      $('.header__language-icon').attr('src', './img/down.png');
    } else if (newScrollTop <= 0) {
      $('.header').removeClass('black');
      $('.header').removeClass('white');
      $('.header__mobile-nav img').attr('src', './img/nav.png');
      $('.header__language-icon').attr('src', './img/down.png');
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

  $('.header__logo').on('click', function() {
    $('html,body').animate({scrollTop: 0}, 400);
  });

  $('.header__mobile-nav').on('click', function() {
    $('.mobile-nav').toggleClass('show');
  });

  $('.mobile-nav__close, .header__item-link').on('click', function() {
    if (client().w < 768) {
      $('.mobile-nav').toggleClass('show');
    }
  });

  $('.header__item-link').click(function(e){
    e.preventDefault();

    $('html,body').animate({scrollTop: ($($(this).data('target')).offset().top -50 )}, 1000);
  });

  $('.social-icons__item a').on({
    mouseenter: function(e) {
      if ($(this).find('.banner__social-image').length === 0) {
        return;
      }

      var src = $(this).find('.banner__social-image').attr('src').split('.png');

      src.push('-hover.png');

      $(this).find('.banner__social-image').attr('src', src.join(''));
    },
    mouseleave: function() {
      if ($(this).find('.banner__social-image').length === 0) {
        return;
      }

      var src = $(this).find('.banner__social-image').attr('src').split('-hover');

      $(this).find('.banner__social-image').attr('src', src.join(''));
    }
});

$('.social-icons__telegram-container').on('click', function() {
  $('.social-icons__telegram').toggle();
});

$('.header__language').on('click', function() {
  $('.header__language-list').toggle();
});

$('body').on('click', function(e) {

  if ($(e.target).closest('.social-icons__telegram-container').length <= 0) {
    $('.social-icons__telegram').hide();
  }

  if ($(e.target).closest('.header__language').length <= 0) {
    $('.header__language-list').hide();
  }
});

$('.faq__title').on('click', function(e) {
  e.stopPropagation();

  $(this).parent('.faq__item').toggleClass('active');
  $(this).next('.faq__content').slideToggle('fast');
});

  $( window ).scroll(function() {
    setHeader();
    sectionTitleActive();

    introActive();
    innovationsActive();
    useCaseActive();
    teamActive();
    advisorsActive();
    partnerActive();
  });

  $(window).resize(function() {
    setTeam();
  });

  window.onload = function () {
    $('.loading').addClass('hidden');
    setHeader();
    timedCount();

    var $links = $('.header__item-link');

    if (client().w > 767) {
      $.each($links, function(index, item) {
        var itemWidth = $(item).width() + 10;

        $(item).css('width', itemWidth);
      });
    }

    banner();

    setTeam();
    sectionTitleActive();

    introActive();
    innovationsActive();
    useCaseActive();
    teamActive();
    advisorsActive();
    partnerActive();
  };
}(jQuery));