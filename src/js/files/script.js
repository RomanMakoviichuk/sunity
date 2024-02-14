const slides1 = document.querySelectorAll('.main__slider .slide');
const progressContainer1 = document.querySelector('.main__slider-progress');
const progress1 = Array.from(document.querySelectorAll('.main__slider-progress .progress'));
let currentSlideIndex1 = -1;

const slides2 = document.querySelectorAll('.features__slider .slide');
const progressContainer2 = document.querySelector('.features__slider-progress');
const progress2 = Array.from(document.querySelectorAll('.features__slider-progress .progress'));
let currentSlideIndex2 = -1;

function slideShow1() {
	const current1 = document.querySelector('.main__slider .active');

	if (current1) {
		current1.classList.remove('active');
	}

	const nextIndex1 = (currentSlideIndex1 + 1) % slides1.length;
	const next1 = slides1[nextIndex1];

	if (next1) {
		next1.classList.add('active');

		progress1.forEach((el) => {
			el.classList.remove('active', 'passed');
		});

		const nextProgress1 = progress1[nextIndex1];
		if (nextProgress1) {
			nextProgress1.classList.add('active');
		}
	}

	currentSlideIndex1 = nextIndex1;
}

function slideShow2() {
	const current2 = document.querySelector('.features__slider .active');

	if (current2) {
		current2.classList.remove('active');
	}

	const nextIndex2 = (currentSlideIndex2 + 1) % slides2.length;
	const next2 = slides2[nextIndex2];

	if (next2) {
		next2.classList.add('active');

		progress2.forEach((el) => {
			el.classList.remove('active', 'passed');
		});

		const nextProgress2 = progress2[nextIndex2];
		if (nextProgress2) {
			nextProgress2.classList.add('active');
		}
	}

	currentSlideIndex2 = nextIndex2;
}

progress1.forEach((el) => el.addEventListener('animationend', slideShow1, false));
progress2.forEach((el) => el.addEventListener('animationend', slideShow2, false));

window.onload = function () {
	slideShow1();
	slideShow2();
};


//========================================================================================================================================================

//eyes live

function createEyeAnimation(canvasId) {
	const canvas = document.getElementById(canvasId);
	const ctx = canvas.getContext("2d");
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	let eyes = [];
	let theta;
	const mouse = {
		x: undefined,
		y: undefined
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

			let iris_x = this.x + Math.cos(theta) * this.radius / 10;
			let iris_y = this.y + Math.sin(theta) * this.radius / 10;
			let irisRadius = this.radius / 1.2;
			ctx.beginPath();
			ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.closePath();

			let pupilRadius = this.radius / 2.5;
			let pupil_x = this.x + Math.cos(theta) * this.radius / 1.9;
			let pupil_y = this.y + Math.sin(theta) * this.radius / 1.9;
			ctx.beginPath();
			ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
		}
	}

	function init() {
		eyes = [];
		let eyeRadius = 50;
		let eye1 = new Eye(canvas.width / 2.7, canvas.height / 2, eyeRadius);
		let eye2 = new Eye((3 * canvas.width) / 4, canvas.height / 2, eyeRadius);

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
	createEyeAnimation("main_canvas");
}

const questionsCanvas = document.getElementById("questions_canvas");
if (questionsCanvas) {
	createEyeAnimation("questions_canvas");
}

const calcCanvas = document.getElementById("calc_canvas");
if (calcCanvas) {
	createEyeAnimation("calc_canvas");
}

//========================================================================================================================================================

// const el = document.querySelector(".parallax__container");
// const items = document.querySelectorAll(".parallax__item");

// const offset = 300;
// const transforms = [-17, 5, -6, -6, -12, 10, 16, -15, 14, -17];
// let lastScrollVal = 0;

// const getCurrentRotation = (element) => {
// 	const style = window.getComputedStyle(element);
// 	const transform = style.getPropertyValue("transform");
// 	const matrix = transform.match(/^matrix\((.+)\)$/);

// 	let rotation = 0;

// 	if (matrix) {
// 		const values = matrix[1].split(",");
// 		const a = values[0];
// 		const b = values[1];
// 		rotation = Math.atan2(b, a) * (180 / Math.PI);
// 	}

// 	return rotation;
// };

// const originalTopValues = Array.from(items).map(item => parseInt(getComputedStyle(item).top));

// window.addEventListener("scroll", () => {
// 	const direction = window.scrollY > lastScrollVal ? "forward" : "backward";

// 	if (window.scrollY >= el.offsetTop - offset) {
// 		items.forEach((item, i) => {
// 			let nextRotation;
// 			if (direction === "forward") {
// 				nextRotation = getCurrentRotation(item) + 1;
// 			} else {
// 				nextRotation = getCurrentRotation(item) - 1;
// 			}

// 			const rotationEnabled = Math.abs(nextRotation) < Math.abs(transforms[i]);
// 			if (rotationEnabled) {
// 				item.style.transform = `rotate(${nextRotation}deg)`;
// 			}

// 			let newTop;
// 			if (direction === "forward") {
// 				newTop = Math.min(parseInt(getComputedStyle(item).top) + 3, originalTopValues[i] + 100);
// 			} else {
// 				newTop = Math.max(parseInt(getComputedStyle(item).top) - 3, originalTopValues[i] - 100);
// 			}
// 			item.style.top = `${newTop}px`;
// 		});
// 	}

// 	lastScrollVal = window.scrollY;
// });

//========================================================================================================================================================
/*=============== RANGE SLIDER JS ===============*/
const rangeInputSlider = () => {
	const rangeThumb = document.getElementById('range-thumb'),
		rangeNumber = document.getElementById('range-number'),
		rangeLine = document.getElementById('range-line'),
		rangeInput = document.getElementById('range-input');

	if (rangeThumb && rangeNumber && rangeLine && rangeInput) {
		rangeNumber.textContent = rangeInput.value + ` €`;
		const thumbPosition = (rangeInput.value / rangeInput.max),
			space = rangeInput.offsetWidth - rangeThumb.offsetWidth;
		rangeThumb.style.left = (thumbPosition * space) + 'px';
		const percent = (rangeInput.value / rangeInput.max) * 100;
		rangeLine.style.width = percent + '%';
		rangeInput.addEventListener('input', rangeInputSlider);
	}
};

rangeInputSlider();

//========================================================================================================================================================
// switch tab
const tabModes = document.querySelectorAll('.nav__switch_mode');

tabModes.forEach(tab => {
	tab.addEventListener('click', function () {
		tabModes.forEach(tab => tab.classList.remove('active-tab'));
		this.classList.add('active-tab');
	});
});

//========================================================================================================================================================
//open eyes - calc page
const caclCoord = document.querySelector(".calculator");
const eye = document.querySelector(".decor__eyes");

if (eye) {
	caclCoord.addEventListener("mouseenter", function () {
		eye.classList.remove("eye-closed");
		eye.classList.add("eye-opened");
	});

	caclCoord.addEventListener("mouseleave", function () {
		eye.classList.remove("eye-opened");
		eye.classList.add("eye-closed");
	});
}

//========================================================================================================================================================
//product circle loading animation

var svgCircleProgressPaths = document.querySelectorAll("[id^=svgCircleProgressPath]");
var installStepsItems = document.querySelectorAll(".install__steps_item");
var duration = 5000; // Длительность анимации в миллисекундах
var lengths = []; // Массив длин окружностей

svgCircleProgressPaths.forEach(function(path, index) {
    var length = path.getTotalLength();
    lengths.push(length);
    path.style.strokeDasharray = length; // Устанавливаем длину окружности как начальное значение
});

var currentIndex = 0; // Индекс текущего активного элемента

function animateCircle(duration) {
    var start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        svgCircleProgressPaths[currentIndex].style.strokeDashoffset = lengths[currentIndex] - progress / duration * lengths[currentIndex];
        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            // По достижении 100% анимации переключаем класс active на следующий элемент
            installStepsItems[currentIndex].classList.remove("active");
            currentIndex++;
            if (currentIndex >= installStepsItems.length) {
                currentIndex = 0; // Если достигнут последний элемент, переключаемся на первый
            }
            svgCircleProgressPaths[currentIndex].style.strokeDashoffset = lengths[currentIndex]; // Сбрасываем состояние круга перед анимацией следующего элемента
            installStepsItems[currentIndex].classList.add("active");
            // Запускаем анимацию заново для текущего элемента
            animateCircle(duration);
        }
    }
    window.requestAnimationFrame(step);
}

animateCircle(duration);
