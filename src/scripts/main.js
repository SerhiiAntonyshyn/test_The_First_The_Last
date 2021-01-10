/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const swiper = new Swiper('.swiper-container', {
  speed: 1000,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  on: {
    slidePrevTransitionEnd: function() {
      const photosMain = document.querySelector('.photo_main');

      changePhotos(photosMain, 'next');

      const photosLeft = document.querySelector('.photo_left');

      setTimeout(() => changePhotos(photosLeft, 'next'), 100);

      const photosRight = document.querySelector('.photo_right');

      setTimeout(() => changePhotos(photosRight, 'next'), 200);
    },
    slideNextTransitionEnd: function() {
      const photosMain = document.querySelector('.photo_main');

      changePhotos(photosMain, 'prev');

      const photosLeft = document.querySelector('.photo_left');

      setTimeout(() => changePhotos(photosLeft, 'prev'), 100);

      const photosRight = document.querySelector('.photo_right');

      setTimeout(() => changePhotos(photosRight, 'prev'), 200);
    },
  },
});

function changePhotos(photoContainer, direction) {
  const visibleSlide = photoContainer.querySelector('.photo_img_visible');

  if (direction === 'next') {
    const nextSlide = visibleSlide.nextElementSibling;

    visibleSlide.classList.remove('photo_img_visible');

    if (nextSlide) {
      nextSlide.classList.add('photo_img_visible');
    } else {
      photoContainer.firstElementChild.classList.add('photo_img_visible');
    }
  } else if (direction === 'prev') {
    const prevSlide = visibleSlide.previousElementSibling;

    visibleSlide.classList.remove('photo_img_visible');

    if (prevSlide) {
      prevSlide.classList.add('photo_img_visible');
    } else {
      photoContainer.lastElementChild.classList.add('photo_img_visible');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.createElement('div');

  cursor.textContent = 'DRAG ME';
  cursor.classList.add('custom-cursor');

  const slider = document.querySelector('.swiper-container');
  let isIn = false;

  slider.addEventListener('mouseenter', e => {
    isIn = true;
    cursor.style.top = e.clientY;
    cursor.style.left = e.clentX;
    document.body.appendChild(cursor);

    const addClasstimer = setTimeout(() => cursor.classList
      .add('custom-cursor_visible'), 500);

    window.addEventListener('mousemove', moveCursor);

    function moveCursor(e) {
      if (isIn) {
        cursor.style.top = e.clientY - 8 + 'px';
        cursor.style.left = e.clientX + 17 + 'px';
      }
    }

    slider.addEventListener('mouseleave', leaveSlider);

    function leaveSlider() {
      isIn = false;

      if (!cursor.classList.contains('custom-cursor_visible')) {
        clearTimeout(addClasstimer);
      }
      cursor.classList.remove('custom-cursor_visible');
      document.body.removeChild(cursor);
      window.removeEventListener('mousemove', moveCursor);
      slider.removeEventListener('mouseleave', leaveSlider);
    }
  });

  let photos = document.querySelectorAll('.photo');
  const photosParentCoords = document.querySelector('.photos')
    .getBoundingClientRect();

  photos = [].map.call(photos, (photo) => {
    const coords = photo.getBoundingClientRect();

    coords.centerX = (coords.left + coords.right) / 2;
    coords.centerY = (coords.top + coords.bottom) / 2;

    return {
      element: photo,
      params: coords,
    };
  });

  window.addEventListener('mousemove', movePhotos);

  function movePhotos(e) {
    [].map.call(photos, photo => {
      const mount = +photo.element.dataset['depth'] * 30;

      photo.element.style.left = photo.params.x - (e.clientX - photo.params
        .centerX) / photo.params.width * mount + 'px';

      photo.element.style.top = photo.params.y - photosParentCoords
        .top - (e.clientY - photo.params.centerY) / photo
        .params.height * mount + 'px';
    });
  }

  const burgerMenu = document.querySelector('.burger');

  burgerMenu.addEventListener('click', clickBurger);

  function clickBurger(e) {
    this.classList.toggle('burger_active');

    if (this.classList.contains('burger_active')) {
      document.querySelector('.menu').classList.add('menu_visible');
    } else {
      document.querySelector('.menu').classList.remove('menu_visible');
    }
  }
});
