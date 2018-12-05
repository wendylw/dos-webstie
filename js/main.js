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

function client(){
	if (window.innerHeight !== undefined) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else if (document.compatMode === "CSS1Compat"){
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	} else {
		return {
			w: document.body.clientWidth,
			h: document.body.clientHeight
		}
	}
}

function setTeam() {
  if (client().w < 480) {
    var itemWidth = $('.team__item').width() * 0.75;
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
      if (!$('.header__logo').hasClass('normal')) {
        $('.header__logo').addClass('normal');
      }
    } else if (newScrollTop < bannerHeight && newScrollTop > 0 && !$('.header').hasClass('black')) {
      $('.header').addClass('black');
      $('.header').removeClass('white');
      $('.header__mobile-nav img').attr('src', './img/nav.png');
      if (!$('.header__logo').hasClass('normal')) {
        $('.header__logo').addClass('normal');
      }
    } else if (newScrollTop <= 0) {
      $('.header').removeClass('black');
      $('.header').removeClass('white');
      $('.header__mobile-nav img').attr('src', './img/nav.png');
      $('.header__logo').removeClass('normal');
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

  $('.header__mobile-nav').on('click', function() {
    $('.mobile-nav').toggleClass('show');
  });

  $('.mobile-nav__close').on('click', function() {
    $('.mobile-nav').toggleClass('show');
  });

  $( window ).scroll(function() {
    setHeader();
  });

  $(window).resize(function() {
    setTeam();
  });

  window.onload = function () {
    $('.loading').addClass('hidden');
    setHeader();
    timedCount();

    var $links = $('.header__item-link');

    $.each($links, function(index, item) {
      var itemWidth = $(item).width() + 10;

      $(item).css('width', itemWidth);
    });

    if (client().h > $('.banner').height()) {
      var increaseHeight = Math.floor((client().h - $('.banner').height() - 64) / 2);
      var paddingVertical = ((client().w < 768) ? 100 : 150) + increaseHeight;

      $('.banner .container').css('padding', paddingVertical + 'px 0');
    }

    setTeam();
  };
}(jQuery));