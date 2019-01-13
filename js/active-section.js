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

function isSafari() {
  return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
}

function getElementViewTop(element){
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  var elementScrollTop = 0;

  while (current !== null){
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  if (document.compatMode == "BackCompat"){
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }

  if (isSafari()) {
    elementScrollTop = $(window).scrollTop();
  }

  return actualTop - elementScrollTop;
}

function isActive($el, extraHeight) {
  var scrollTop = getElementViewTop($el.get(0));
  var windowHeight = client().h;
  var extra = extraHeight || 0;

  if (scrollTop < (windowHeight + extra) && !$el.hasClass('active')) {
    $el.addClass('active');

    return true;
  }

  return false;
}

function sectionTitleActive() {
  var $el = $('.section-title');
  if (isActive($el, -100)) {
    $el.addClass('fadeInUp')
  }
}

function introActive() {
  if (isActive($('#about-us'))) {
    $('.intro__image-container').addClass('fadeInRight');
    $('.intro__content-container').addClass('fadeInLeft');
  }
}

function innovationsActive() {
  if (isActive($('#innovations'), -300)) {
    $('.feature__left').addClass('fadeInLeft');
    $('.feature__right').addClass('fadeInRight');
  }
}

function useCaseActive() {
  if (isActive($('#use-cases'), -300)) {
    $('.case__item').addClass('fadeInUpMin');
  }
}

function teamActive() {
  if (isActive($('#team'), -300)) {
    $('#team').find('.team__image').addClass('fadeInDownMin');
    $('#team').find('.team__item-content').addClass('fadeInUpMin');
  }
}

function advisorsActive() {
  if (isActive($('.advisors'), -300)) {
    $('.advisors').find('.team__image').addClass('fadeInDownMin');
    $('.advisors').find('.team__item-content').addClass('fadeInUpMin');
  }
}

function partnerActive() {
  if (isActive($('#partners'), -300)) {
    $('.partners').find('.team__image').addClass("fadeIn");
  }
}

function roadMapActive() {
  if (isActive($('#roadmap'), -300)) {
    if (client().w > 767) {
      $('.road-map__item').removeClass('fadeInUpMin').addClass('fadeRight');
    } else {
      $('.road-map__item').removeClass('fadeRight').addClass('fadeInUpMin');
    }
  }
}