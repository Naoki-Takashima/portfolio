/*------------------------------------------
	10周年記念LP
------------------------------------------*/
/*--- slider(bnr) ---*/
function initSwiper(sliderName){
  var $slider = $('.'+sliderName);
  var options = {
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 12,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    wrapperClass: 'js-slider-list',
    slideClass: 'js-slider-item',
    pagination: {
      el:'.js-slider-pagination',
    },
    navigation: {
      nextEl:'.js-slider-next',
      prevEl:'.js-slider-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  }
  if($slider){
    $slider.each(function(i){
      var uniqueName = sliderName+(i+1);
      var uniqueClass = '.'+uniqueName;
      if(!$(this).hasClass(uniqueClass)){
        $(this).addClass(uniqueName);
      }
      var swiper = new Swiper(uniqueClass, options);
    });
  }
}

$(window).on('load', function () {
	initSwiper('js-slider-wrap_bigbnr');
});

//アコーディオン
$(function () {
	var scrollPosition = 0;
	var coverHeight = 0;
	//show
	function showItemList(showCont) {
		coverHeight = showCont.height();
		const showHeight = showCont.css({ height: "auto" }).height();
		showCont.height(coverHeight).animate({ height: showHeight }, 300, function () {
			showCont.height("auto");
			scrollPosition = $(window).scrollTop();
		});
	}
	//hide
	function hideItemList(showCont) {
		showCont.animate({ height: coverHeight }, 300);
		$('html, body').animate({ scrollTop: scrollPosition }, 300);
	}
	//handle
	function handleButtonClick(targetAccordion) {
		const showCont = $(this).parent('#' + targetAccordion);
		if ($(this).hasClass('active')) {
			hideItemList(showCont);
			$(this).removeClass('active');
			showCont.removeClass('active');
			$(this).find('span').text($(this).data('open-text'));
		} else {
			showItemList(showCont);
			$(this).addClass('active');
			showCont.addClass('active');
			$(this).find('span').text($(this).data('close-text'));
		}
	}
	$('.noteMoreBtn').on('click', function () {
		const targetAccordion = $(this).parent("[id^='note']").attr('id');
		handleButtonClick.call(this, targetAccordion);
  });
});
