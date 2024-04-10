window.onpageshow = function(event) {
	if (event.persisted) {
    $('.hamburger').removeClass('active');
	}
};

function slideModal(target, open, swtag) {
  const modal = document.getElementById(target);
  const openModalBtns = document.getElementById(open).querySelectorAll('.js-content');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');
  const swiper = new Swiper( swtag, {
    loop: true,
    speed: 10,
    spaceBetween: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });

  openModalBtns.forEach((openModalBtn) => {
    openModalBtn.addEventListener('click', () => {
      const modalIndex = openModalBtn.dataset.slideIndex;
      swiper.slideTo(modalIndex);
      modal.classList.add('is-active');
    });
  });

  closeModalBtns.forEach((closeModalBtn) => {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
  });
}

$(window).on('load',function(){
  $('.hamburger').removeClass('active');
  $('.hamburger').on('click', function(){
    $(this).toggleClass('active');
  });
  $('.modalSlider').on('click', function(){
    $(this).toggleClass('zoom');
  });
});
