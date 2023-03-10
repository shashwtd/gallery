function activateListener() {
    var imgs = document.querySelectorAll(".img");
    imgs.forEach((img) => {
        img.addEventListener("mouseenter", (e) => {
            imgs.forEach((img2) => {
                img2.classList.add("off");
            });
            img.classList.remove("off");
        });
        
        img.addEventListener("mouseleave", (e) => {
            imgs.forEach((img2) => {
                img2.classList.remove("off");
            });
        });
    });
}

window.onload = () => {
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
