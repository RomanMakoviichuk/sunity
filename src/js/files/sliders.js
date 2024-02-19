/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
// import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import "../../../node_modules/swiper/swiper.scss";

// Ініціалізація слайдерів
function initSliders() {
   // Список слайдерів
   // Перевіряємо, чи є слайдер на сторінці
   if (document.querySelector(".swiper")) {
      // Вказуємо склас потрібного слайдера
      // Створюємо слайдер
      new Swiper(".swiper", {
         // Вказуємо склас потрібного слайдера
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Pagination, Autoplay],
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 67,
         autoHeight: false,
         speed: 800,

         //touchRatio: 0,
         //simulateTouch: false,
         loop: false,
         preloadImages: true,
         lazy: true,

         autoplay: {
            delay: 2500,
            disableOnInteraction: false,
         },

         // Ефекти
         // effect: 'fade',
         // autoplay: {
         // 	delay: 3000,
         // 	disableOnInteraction: false,
         // },

         // Пагінація

         pagination: {
            el: ".swiper-pagination",
            // clickable: true,
            type: "progressbar",
         },

         // Скроллбар
         /*
   		scrollbar: {
   			el: '.swiper-scrollbar',
   			draggable: true,
   		},
   		*/

         // Кнопки "вліво/вправо"
         navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
         },

         // Брейкпоінти
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 20,
               autoHeight: true,
               width: 312,
            },
            640: {
               slidesPerView: 1,
               spaceBetween: 40,
               autoHeight: true,
            },
            768: {
               slidesPerView: 1,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 1,
               spaceBetween: 20,
            },
            1268: {
               slidesPerView: 1.2,
               spaceBetween: 67,
            },
         },

         // Події
         on: {},
      });
   }
   if (document.querySelector(".services__slider")) {
      new Swiper(".services__slider", {
         // Вказуємо склас потрібного слайдера
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Pagination, Autoplay],
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 65,
         autoHeight: false,
         speed: 800,
         loop: false,
         preloadImages: true,
         lazy: true,

         autoplay: {
            delay: 2000,
            disableOnInteraction: false,
         },

         // Ефекти
         // effect: 'fade',
         // autoplay: {
         // 	delay: 3000,
         // 	disableOnInteraction: false,
         // },

         // Пагінація

         pagination: {
            el: ".swiper-pagination",
            // clickable: true,
            type: "progressbar",
         },

         // Брейкпоінти
         breakpoints: {
            320: {
               slidesPerView: 2.2,
               spaceBetween: 65,
               autoHeight: true,
            },
            640: {
               slidesPerView: 3,
               spaceBetween: 65,
               autoHeight: true,
            },
            768: {
               slidesPerView: 5,
               spaceBetween: 65,
            },
            992: {
               slidesPerView: 1,
               spaceBetween: 20,
            },
            1268: {
               slidesPerView: 1.2,
               spaceBetween: 67,
            },
         },

         // Події
         on: {},
      });
   }
   if (document.querySelector(".sp_slider")) {
      new Swiper(".sp_slider", {
         modules: [Navigation, Pagination, Autoplay],
         observer: true,
         observeParents: true,
         slidesPerView: "auto",
         spaceBetween: 131,
         autoHeight: false,
         speed: 800,
         loop: false,
         preloadImages: true,
         lazy: true,
         autoplay: {
            delay: 2000,
            disableOnInteraction: false,
         },

         pagination: {
            el: ".swiper-pagination",
            // clickable: true,
            type: "progressbar",
         },

         // Брейкпоінти
         breakpoints: {
            320: {
               slidesPerView: "auto",
               spaceBetween: 30,
               autoHeight: true,
            },
            640: {
               spaceBetween: 40,
               autoHeight: true,
            },
            768: {
               spaceBetween: 60,
            },
            992: {
               spaceBetween: 80,
            },
            1268: {
               spaceBetween: 100,
            },
         },

         // Події
         on: {},
      });
   }
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
   let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
   if (sliderScrollItems.length > 0) {
      for (let index = 0; index < sliderScrollItems.length; index++) {
         const sliderScrollItem = sliderScrollItems[index];
         const sliderScrollBar = sliderScrollItem.querySelector(".swiper-scrollbar");
         const sliderScroll = new Swiper(sliderScrollItem, {
            observer: true,
            observeParents: true,
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: {
               enabled: true,
            },
            scrollbar: {
               el: sliderScrollBar,
               draggable: true,
               snapOnRelease: false,
            },
            mousewheel: {
               releaseOnEdges: true,
            },
         });
         sliderScroll.scrollbar.updateSize();
      }
   }
}

window.addEventListener("load", function (e) {
   // Запуск ініціалізації слайдерів
   initSliders();
   // Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
   //initSlidersScroll();
});
