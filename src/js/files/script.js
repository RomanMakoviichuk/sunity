const slides1 = document.querySelectorAll(".main__slider .slide");
const progressContainer1 = document.querySelector(".main__slider-progress");
const progress1 = Array.from(document.querySelectorAll(".main__slider-progress .progress"));
let currentSlideIndex1 = -1;

const slides2 = document.querySelectorAll(".features__slider .slide");
const progressContainer2 = document.querySelector(".features__slider-progress");
const progress2 = Array.from(document.querySelectorAll(".features__slider-progress .progress"));
let currentSlideIndex2 = -1;

function slideShow1() {
   const current1 = document.querySelector(".main__slider .active");

   if (current1) {
      current1.classList.remove("active");
   }

   const nextIndex1 = (currentSlideIndex1 + 1) % slides1.length;
   const next1 = slides1[nextIndex1];

   if (next1) {
      next1.classList.add("active");

      progress1.forEach((el) => {
         el.classList.remove("active", "passed");
      });

      const nextProgress1 = progress1[nextIndex1];
      if (nextProgress1) {
         nextProgress1.classList.add("active");
      }
   }

   currentSlideIndex1 = nextIndex1;
}

function slideShow2() {
   const current2 = document.querySelector(".features__slider .active");

   if (current2) {
      current2.classList.remove("active");
   }

   const nextIndex2 = (currentSlideIndex2 + 1) % slides2.length;
   const next2 = slides2[nextIndex2];

   if (next2) {
      next2.classList.add("active");

      progress2.forEach((el) => {
         el.classList.remove("active", "passed");
      });

      const nextProgress2 = progress2[nextIndex2];
      if (nextProgress2) {
         nextProgress2.classList.add("active");
         if (!document.querySelector(".home-progress")) return;
         if (window.innerWidth < 768) {
            const dataIndex = nextProgress2.getAttribute("data-index");
            switch (dataIndex) {
               case "1":
                  document.querySelector(".home-progress").style.left = `30px`;
                  break;
               case "2":
                  document.querySelector(".home-progress").style.left = `-194px`;
                  break;
               case "3":
                  document.querySelector(".home-progress").style.left = `-417px`;
                  break;
               case "4":
                  document.querySelector(".home-progress").style.left = `-640px`;
                  break;
               default:
                  document.querySelector(".home-progress").style.left = `30px`;
            }
         }
      }
   }

   currentSlideIndex2 = nextIndex2;

   if (document.querySelector(".home-progress")) {
      const imageSlides = document.querySelectorAll(".features__slider img.slide");
      const activeProgress = document.querySelectorAll(".features__slider-progress .progress");
      activeProgress.forEach((activeProgressItem, index) => {
         activeProgressItem.addEventListener("click", function () {
            // remove active class from all progress items
            progress2.forEach((el) => {
               el.classList.remove("active", "passed");
            });

            // remove active class from all image slides items
            imageSlides.forEach((el) => {
               el.classList.remove("active");
            });

            // add active class to clicked progress item image
            imageSlides[index].classList.add("active");

            // add active class to clicked progress item
            this.classList.add("active");
         });
      });
   }
}

function getOffset(el) {
   const rect = el.getBoundingClientRect();
   console.log("🚀 ~ getOffset ~ rect:", rect);
   return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
   };
}

progress1.forEach((el) => el.addEventListener("animationend", slideShow1, false));
progress2.forEach((el) => el.addEventListener("animationend", slideShow2, false));

window.onload = function () {
   slideShow1();
   slideShow2();
};

//========================================================================================================================================================

//eyes live

function createEyeAnimation(canvasId, eyeRadiusValue = 50, variant = "big") {
   const canvas = document.getElementById(canvasId);
   const ctx = canvas.getContext("2d");
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   let eyes = [];
   let theta;
   const mouse = {
      x: undefined,
      y: undefined,
   };

   window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX - canvas.getBoundingClientRect().left;
      mouse.y = e.clientY - canvas.getBoundingClientRect().top;
   });

   class Eye {
      constructor(x, y, radius) {
         this.x = x;
         this.y = y;
         this.radius = radius;
      }
      draw() {
         let dx = mouse.x - this.x;
         let dy = mouse.y - this.y;
         theta = Math.atan2(dy, dx);

         let iris_x = this.x + (Math.cos(theta) * this.radius) / 10;
         let iris_y = this.y + (Math.sin(theta) * this.radius) / 10;
         let irisRadius = this.radius / 1.2;
         ctx.beginPath();
         ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
         ctx.fillStyle = "white";
         ctx.fill();
         ctx.closePath();

         let pupilRadius = this.radius / 2.5;
         let pupil_x = this.x + (Math.cos(theta) * this.radius) / 1.9;
         let pupil_y = this.y + (Math.sin(theta) * this.radius) / 1.9;
         ctx.beginPath();
         ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
         ctx.fillStyle = "black";
         ctx.fill();
         ctx.closePath();
      }
   }

   function init() {
      eyes = [];
      let eyeRadius = eyeRadiusValue;
      if (variant === "big") {
         let eye1 = new Eye(canvas.width / 2.7, canvas.height / 2, eyeRadius);
         let eye2 = new Eye((3 * canvas.width) / 4, canvas.height / 2, eyeRadius);

         eyes.push(eye1);
         eyes.push(eye2);
         return;
      }
      let eye1 = new Eye(canvas.width / 3, canvas.height / 2, eyeRadius);
      let eye2 = new Eye((3 * canvas.width) / 5, canvas.height / 2, eyeRadius);

      eyes.push(eye1);
      eyes.push(eye2);
   }

   function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < eyes.length; i++) {
         eyes[i].draw();
      }
   }

   init();
   animate();

   window.addEventListener("resize", function () {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
   });
}

const mainCanvas = document.getElementById("main_canvas");
if (mainCanvas) {
   createEyeAnimation("main_canvas", 50);
}
const main_product_canvas = document.getElementById("main_product_canvas");
if (main_product_canvas) {
   createEyeAnimation("main_product_canvas", 40, "small");
}

const questionsCanvas = document.getElementById("questions_canvas");
if (questionsCanvas) {
   createEyeAnimation("questions_canvas", 50);
}

const calcCanvas = document.getElementById("calc_canvas");
if (calcCanvas) {
   createEyeAnimation("calc_canvas", 50);
}

const productCanvas = document.getElementById("product_canvas");
if (productCanvas) {
   createEyeAnimation("product_canvas", 30, "small");
}

//========================================================================================================================================================
/*=============== RANGE SLIDER JS ===============*/
const rangeInputSlider = () => {
   const rangeThumb = document.getElementById("range-thumb"),
      rangeNumber = document.getElementById("range-number"),
      rangeLine = document.getElementById("range-line"),
      rangeInput = document.getElementById("range-input");

   if (rangeThumb && rangeNumber && rangeLine && rangeInput) {
      rangeNumber.textContent = rangeInput.value + ` €`;
      const thumbPosition = rangeInput.value / rangeInput.max,
         space = rangeInput.offsetWidth - rangeThumb.offsetWidth;
      rangeThumb.style.left = thumbPosition * space + "px";
      const percent = (rangeInput.value / rangeInput.max) * 100;
      rangeLine.style.width = percent + "%";
      rangeInput.addEventListener("input", rangeInputSlider);
   }
};

rangeInputSlider();

//========================================================================================================================================================
// switch tab
const tabModes = document.querySelectorAll(".nav__switch_mode");

tabModes.forEach((tab) => {
   tab.addEventListener("click", function () {
      tabModes.forEach((tab) => tab.classList.remove("active-tab"));
      this.classList.add("active-tab");
   });
});

//========================================================================================================================================================
//product circle loading animation
function initProductCircleLoading() {
   let svgCircleProgressPaths = document.querySelectorAll("[id^=svgCircleProgressPath]");
   let installStepsItems = document.querySelectorAll(".install__steps_item");
   let installStepsImages = document.querySelectorAll(".install__steps_image .slide");
   let duration = 6000;
   let lengths = [];

   svgCircleProgressPaths.forEach(function (path, index) {
      let length = path.getTotalLength();
      lengths.push(length);
      path.style.strokeDasharray = length;
   });

   let currentIndex = 0;

   function animateCircle(duration) {
      let start = null;
      function step(timestamp) {
         if (!svgCircleProgressPaths.length) return;
         if (!start) start = timestamp;
         let progress = timestamp - start;
         svgCircleProgressPaths[currentIndex].style.strokeDashoffset =
            lengths[currentIndex] - (progress / duration) * lengths[currentIndex];
         if (progress < duration) {
            window.requestAnimationFrame(step);
         } else {
            installStepsItems[currentIndex].classList.remove("active");
            installStepsImages[currentIndex].classList.remove("active");
            currentIndex++;
            if (currentIndex >= installStepsItems.length) {
               currentIndex = 0;
            }
            svgCircleProgressPaths[currentIndex].style.strokeDashoffset = lengths[currentIndex];
            installStepsItems[currentIndex].classList.add("active");
            installStepsImages[currentIndex].classList.add("active");
            animateCircle(duration);
         }
      }
      window.requestAnimationFrame(step);
   }

   animateCircle(duration);
}
initProductCircleLoading();

//========================================================================================================================================================
//Parallax

function parallaxAnimation() {
   const block1 = document.querySelector(".parallax__item._1");
   const block2 = document.querySelector(".parallax__item._2");
   const block3 = document.querySelector(".parallax__item._3");
   const block4 = document.querySelector(".parallax__item._4");
   const block5 = document.querySelector(".parallax__item._5");
   const block6 = document.querySelector(".parallax__item._6");
   const block7 = document.querySelector(".parallax__item._7");
   const block8 = document.querySelector(".parallax__item._8");
   const block9 = document.querySelector(".parallax__item._9");
   const block10 = document.querySelector(".parallax__item._10");

   // prevent animation on other pages
   if (block1 === null) return;

   let transformValues = {
      block1: { t1: 200, t2: 200, r: -25, main: 200 },
      block2: { t1: 180, t2: 140, r: 6, main: 180 },
      block3: { t1: 160, t2: 0, r: -4, main: 160 },
      block4: { t1: 80, t2: -80, r: -7, main: 80 },
      block5: { t1: 120, t2: -120, r: 29, main: 120 },
      block6: { t1: 0, t2: -150, r: -5, main: 150 },
      block7: { t1: -120, t2: -120, r: -6, main: 120 },
      block8: { t1: -160, t2: 0, r: -13, main: 160 },
      block9: { t1: -170, t2: 170, r: -6, main: 170 },
      block10: { t1: -190, t2: 190, r: 10, main: 190 },
   };
   if (window.innerWidth < 768) {
      transformValues = {
         block1: { t1: 100, t2: 100, r: -25, main: 100 },
         block2: { t1: 90, t2: 70, r: 6, main: 90 },
         block3: { t1: 80, t2: 0, r: -4, main: 80 },
         block4: { t1: 40, t2: -40, r: -7, main: 40 },
         block5: { t1: 60, t2: -60, r: 29, main: 60 },
         block6: { t1: 0, t2: -75, r: -5, main: 75 },
         block7: { t1: -60, t2: -60, r: -6, main: 60 },
         block8: { t1: -80, t2: 0, r: -13, main: 80 },
         block9: { t1: -85, t2: 85, r: -6, main: 85 },
         block10: { t1: -95, t2: 95, r: 10, main: 95 },
      };
   }

   const blocks = [block1, block2, block3, block4, block5, block6, block7, block8, block9, block10];

   blocks.forEach((block, index) => {
      const { t1, t2, r } = transformValues[`block${index + 1}`];
      setTransform(block, `translate(${t1}px, ${t2}px) rotate(0deg)`);
   });

   const container1 = document.querySelector(".testimonial__parallax");
   const container2 = document.querySelector(".parallax__body");
   const containerOriginal = container1.getBoundingClientRect();
   const contentContainer = container2.getBoundingClientRect();

   window.addEventListener("scroll", handleScroll);

   function handleScroll() {
      const { top } = container1.getBoundingClientRect();
      const animationStartY = containerOriginal.height / 3;
      if (top > animationStartY) {
         blocks.forEach((block, index) => {
            const { t1, t2, r } = transformValues[`block${index + 1}`];
            setTransform(block, `translate(${t1}px, ${t2}px) rotate(0deg)`);
         });

         setOpacityToNodes("0%");
      }

      if (top < animationStartY) {
         const isTopPlusValue = top > 0;
         const animateValue = isTopPlusValue
            ? (animationStartY - top) * 0.8
            : (-top + animationStartY) * 0.8;
         const onePercent = (contentContainer.height * 0.25) / 100;
         const opacity = animateValue / onePercent;

         blocks.forEach((block, index) => {
            animateBlocks(`block${index + 1}`, animateValue, opacity);
         });

         if (opacity >= 100) {
            setOpacityToNodes("100%");
         }

         setOpacityToNodes(`${opacity}%`);
      }
      if (top < -contentContainer.height) {
         blocks.forEach((block) => {
            setTransform(block, `translate(0px, 0px) rotate(0deg)`);
         });
         setOpacityToNodes("100%");
         return;
      }
   }
   function getRotateValue(radiusValue, animateValue) {
      if (radiusValue > 0) {
         return animateValue / 10 < radiusValue ? animateValue / 10 : radiusValue;
      }
      return animateValue / 10 < -radiusValue ? -(animateValue / 10) : radiusValue;
   }
   function animateBlocks(el, animateValue) {
      switch (el) {
         case "block1":
            let position = transformValues.block1.main - animateValue;
            let rotateValue = getRotateValue(transformValues.block1.r, animateValue);
            if (position <= 0) {
               setTransform(block1, `translate(0px, 0px) rotate(${rotateValue}deg)`);
               return;
            }
            setTransform(
               block1,
               `translate(${position}px, ${position}px) rotate(${rotateValue}deg)`
            );
            break;
         case "block2":
            let position_2 = transformValues.block2.main - animateValue;

            let rotateValue_2 = getRotateValue(transformValues.block2.r, animateValue);
            if (position_2 <= 0) {
               setTransform(block2, `translate(0px, 0px) rotate(${rotateValue_2}deg)`);
               return;
            }
            setTransform(
               block2,
               `translate(${position_2}px, ${position_2}px) rotate(${rotateValue_2}deg)`
            );
            break;
         case "block3":
            let position_3 = transformValues.block3.main - animateValue;
            let rotateValue_3 = getRotateValue(transformValues.block3.r, animateValue);
            if (position_3 <= 0) {
               setTransform(block3, `translate(0px, 0px) rotate(${rotateValue_3}deg)`);
               return;
            }
            setTransform(block3, `translate(${position_3}px, 0px) rotate(${rotateValue_3}deg)`);
            break;
         case "block4":
            let position_4 = transformValues.block4.main - animateValue;
            let rotateValue_4 = getRotateValue(transformValues.block4.r, animateValue);
            if (position_4 <= 0) {
               setTransform(block4, `translate(0px, 0px) rotate(${rotateValue_4}deg)`);
               return;
            }
            setTransform(
               block4,
               `translate(${position_4}px, -${position_4}px) rotate(${rotateValue_4}deg)`
            );
            break;
         case "block5":
            let position_5 = transformValues.block5.main - animateValue;
            let rotateValue_5 = getRotateValue(transformValues.block5.r, animateValue);
            if (position_5 <= 0) {
               setTransform(block5, `translate(0px, 0px) rotate(${rotateValue_5}deg)`);
               return;
            }
            setTransform(
               block5,
               `translate(${position_5}px, -${position_5}px) rotate(${rotateValue_5}deg)`
            );
            break;
         case "block6":
            let position_6 = transformValues.block6.main - animateValue;
            let rotateValue_6 = getRotateValue(transformValues.block6.r, animateValue);
            if (position_6 <= 0) {
               setTransform(block6, `translate(0px, 0px) rotate(${rotateValue_6}deg)`);
               return;
            }
            setTransform(block6, `translate(0px, -${position_6}px) rotate(${rotateValue_6}deg)`);
            break;
         case "block7":
            let position_7 = transformValues.block7.main - animateValue;
            let rotateValue_7 = getRotateValue(transformValues.block7.r, animateValue);
            if (position_7 <= 0) {
               setTransform(block7, `translate(0px, 0px) rotate(${rotateValue_7}deg)`);
               return;
            }
            setTransform(
               block7,
               `translate(-${position_7}px, -${position_7}px) rotate(${rotateValue_7}deg)`
            );
            break;
         case "block8":
            let position_8 = transformValues.block8.main - animateValue;
            let rotateValue_8 = getRotateValue(transformValues.block8.r, animateValue);
            if (position_8 <= 0) {
               setTransform(block8, `translate(0px, 0px) rotate(${rotateValue_8}deg)`);
               return;
            }
            setTransform(block8, `translate(-${position_8}px, 0px) rotate(${rotateValue_8}deg)`);
            break;
         case "block9":
            let position_9 = transformValues.block9.main - animateValue;
            let rotateValue_9 = getRotateValue(transformValues.block9.r, animateValue);
            if (position_9 <= 0) {
               setTransform(block9, `translate(0px, 0px) rotate(${rotateValue_9}deg)`);
               return;
            }
            setTransform(
               block9,
               `translate(-${position_9}px, ${position_9}px) rotate(${rotateValue_9}deg)`
            );
            break;
         case "block10":
            let position_10 = transformValues.block10.main - animateValue;
            let rotateValue_10 = getRotateValue(transformValues.block10.r, animateValue);
            if (position_10 <= 0) {
               setTransform(block10, `translate(0px, 0px) rotate(${rotateValue_10}deg)`);
               return;
            }
            setTransform(
               block10,
               `translate(-${position_10}px, ${position_10}px) rotate(${rotateValue_10}deg)`
            );
            break;
         default:
            break;
      }
   }
}
parallaxAnimation();

function setOpacityToNodes(opacity, nodesName = ".parallax__item") {
   const nodes = document.querySelectorAll(nodesName);
   nodes.forEach((node) => {
      node.style.opacity = opacity;
   });
}

function setTransform(el, transform) {
   el.style.transform = transform;
   el.style.WebkitTransform = transform;
   el.style["will-change"] = transform;
}

//========================================================================================================================================================
const accordionItems = document.querySelectorAll(".questionnaire__content_item");

accordionItems.forEach((item) => {
   const header = item.querySelector(".accordion__header");
   const content = item.querySelector(".accordion__content");

   header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      accordionItems.forEach((otherItem) => {
         otherItem.classList.remove("active");
         otherItem.querySelector(".accordion__content").style.maxHeight = "0rem";
      });

      if (!isOpen) {
         item.classList.add("active");
         content.style.maxHeight = content.scrollHeight / 14 + "rem";
      }
   });
});
//========================================================================================================================================================
//product counter
// if (document.querySelector(".productList__item")) {
//   const countPluses = document.querySelectorAll("._icon-x");

//   countPluses.forEach(function (countPlus) {
//     countPlus.addEventListener("click", function () {
//       const counter = countPlus
//         .closest(".description__body")
//         .querySelector(".description__counter span");
//       counter.textContent = parseInt(counter.textContent) + 1;
//     });
//   });
//   const countMinuses = document.querySelectorAll("._icon_minus-container");
//   countMinuses.forEach(function (countMinus) {
//     countMinus.addEventListener("click", function () {
//       const counter = countMinus
//         .closest(".description__body")
//         .querySelector(".description__counter span");
//       let currentValue = parseInt(counter.textContent);
//       if (currentValue > 1) {
//         counter.textContent = currentValue - 1;
//       }
//     });
//   });
// }
// // Purchase counter
// if (document.querySelector(".extension__btn")) {
//   const incrementButtons = document.querySelectorAll(".increment");
//   const decrementButtons = document.querySelectorAll(".decrement");

//   incrementButtons.forEach(function (incrementButton) {
//     incrementButton.addEventListener("click", function () {
//       const counter = incrementButton.parentElement.querySelector("span");
//       counter.textContent = parseInt(counter.textContent) + 1;
//     });
//   });

//   decrementButtons.forEach(function (decrementButton) {
//     decrementButton.addEventListener("click", function () {
//       const counter = decrementButton.parentElement.querySelector("span");
//       let currentValue = parseInt(counter.textContent);
//       if (currentValue > 0) {
//         counter.textContent = currentValue - 1;
//       }
//     });
//   });
// }
