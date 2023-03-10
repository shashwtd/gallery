var displayActive = false;
var imgs;

function activateListener() {
	gsap.defaults({
		ease: "power4.out",
		duration: 0.4,
	});

	imgs = document.querySelectorAll(".img");
	imgs.forEach((img) => {
		img.addEventListener("mouseenter", (e) => {
			if (displayActive) return;
			var notImg = Array.from(imgs).filter((elm) => elm != img);
			gsap.to(notImg, {
				width: "2.5em",
				opacity: "0.1",
			})
			gsap.to(img, {
				width: "20em",
				opacity: "0.8",
				filter: "grayscale(0.4)",
				height: "34em",
			});
		});

		img.addEventListener("mouseleave", (e) => {
			if (displayActive) return;
			gsap.to(imgs, {
				width: "3em",
				height: "30em",
				opacity: "0.3",
				filter: "grayscale(1)",
			});
		});

		img.addEventListener("click", (e) => {
			if (displayActive) return;
			displayActive = true;

			var imgHeight = img.getAttribute("elm-height");
			var imgWidth = img.getAttribute("elm-width");

			var notImg = Array.from(imgs).filter((elm) => elm != img);
			gsap.to(notImg, {
				duration: 0.3, 
				opacity: "0",
				onComplete: () => {
					gsap.to(img, {
						position: "fixed",
						top: img.getBoundingClientRect().top + "px",
						left: img.getBoundingClientRect().left + "px",
						duration: 0,
						zIndex: 20,
						onComplete: () => {
							gsap.to(img, {
								top: window.innerHeight / 2 - imgHeight / 2 + "px",
								left: window.innerHeight / 2 - imgHeight / 2 + "px",
								height: imgHeight + "px",
								width: imgWidth + "px",
								opacity: "1",
								filter: "grayscale(0)",
								borderRadius: "10px",
								duration: 0.6,
								ease: "power1.in",
								onComplete : () => {
									img.classList.add("active");
								}
							});
							gsap.to('.page', {
								display: "block",
								opacity: "1",
								duration: 0.6,
								ease: "power1.in",
							})
						}
					})
				}
			})

		});
	});
}

function setSize() {
	var imgs = document.querySelectorAll(".img");
	imgs.forEach((img) => {
		img.setAttribute('elm-height', img.clientHeight);
		img.setAttribute('elm-width', img.clientWidth);

		// Change the size of the image
		img.style.height = "30em";
		img.style.width = "3em";
	});
}

window.onload = () => {

	setSize();

	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
		direction: "vertical", // vertical, horizontal
		gestureDirection: "vertical", // vertical, horizontal, both
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false,
		touchMultiplier: 2,
	});

	//get scroll value
	lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
		console.log({ scroll, limit, velocity, direction, progress });
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	activateListener();
};
