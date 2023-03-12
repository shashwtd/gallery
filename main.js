var displayActive = false;
var template;
var imgs;

function em(n = 1) {
	return (
		parseFloat(getComputedStyle(document.documentElement).fontSize) * n +
		"px"
	);
}

function activateListener() {
	gsap.defaults({
		ease: "power1.out",
		duration: 0.8,
	});

	imgs = document.querySelectorAll(".img");
	imgs.forEach((img) => {
		img.addEventListener("mouseenter", (e) => {
			console.log("image hovered: " + img.src);
			if (displayActive) return;
			var notImg = Array.from(imgs).filter((elm) => elm != img);
			gsap.to(notImg, {
				width: "2.5em",
				opacity: "0.1",
			});
			gsap.to(img, {
				width: "20em",
				opacity: "0.8",
				filter: "grayscale(0.4)",
				height: "34em",
			});
		});

		img.addEventListener("mouseleave", (e) => {
			img.removeEventListener("click", (e) => {});
			console.log("image left: " + img.src);
			if (displayActive) return;
			gsap.to(imgs, {
				width: "3em",
				height: "30em",
				opacity: "0.3",
				filter: "grayscale(1)",
			});
		});

		img.addEventListener("click", (e) => {
			console.log("image clicked: " + img.src);
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
							var pagee = document.querySelector(".page");
							var text = pagee.querySelector(".content .text");
							gsap.to(img, {
								top:
									window.innerHeight / 2 -
									imgHeight / 2 +
									"px",
								left: em(3),
								height: imgHeight + "px",
								width: imgWidth + "px",
								duration: 0.8,
								ease: "power1.inOut",
								onComplete: () => {
									img.classList.add("active");
									var clone = img.cloneNode(true);
									pagee
										.querySelector(".content")
										.appendChild(clone);
									clone.onload = () => {
										img.style.display = "none";
									};
									gsap.to(text, {
										opacity: "1",
										duration: 0.3,
										ease: "power1.in",
									});
									gsap.to(text.querySelector(".desc"), {
										delay: 0.1,
										duration: 0.5,
										opacity: "var(--max-opacity)",
										ease: "power1.in",
										transform: "translateY(0)",
									});
									gsap.to(text.querySelector(".exit"), {
										delay: 0.3,
										duration: 0.4,
										opacity: "var(--max-opacity)",
										ease: "power1.in",
										transform: "translateY(0)",
									});
								},
							});
							gsap.to(img, {
								delay: 0.35,
								duration: 0.4,
								opacity: "1",
								filter: "grayscale(0)",
							});
							gsap.to(pagee, {
								display: "block",
								opacity: "1",
								duration: 0.6,
								ease: "power1.in",
								onComplete: () => {
									pagee.classList.add("active");
								},
							});
						},
					});
				},
			});
		});
	});
}

var loadNum = 0;

function imgLoad() {
	loadNum += 1;
	if (loadNum == imgs.length) {
		displayActive = false;
		activateListener();
		let magicPage = document.querySelector(".magic-page");
		magicPage.querySelector(".waiter").style.opacity = "0";
		gsap.to(magicPage, {
			duration: 0.6,
			ease: "power2.in",
			transform: "translateX(calc(-100vw - 200px))",
			onComplete: () => {
				magicPage.style.transform = "translateX(calc(100vw + 200px))";
			},
		});
	}
}

function transition() {
	let magicPage = document.querySelector(".magic-page");
	gsap.to(magicPage, {
		duration: 0.6,
		transform: "translateX(0)",
		ease: "power2.out",
		onComplete: () => {
			magicPage.querySelector(".waiter").style.opacity = "0.7";
			loadNum = 0;
			let newData = template;
			newData = newData.replace(/<img/g, '<img onload="imgLoad()"');
			document.querySelector("#main").innerHTML = newData;
		},
	});
}

function setSize() {
	var imgs = document.querySelectorAll(".img");
	imgs.forEach((img) => {
		img.setAttribute("elm-height", img.clientHeight);
		img.setAttribute("elm-width", img.clientWidth);

		// Change the size of the image
		img.style.height = "30em";
		img.style.width = "3em";
	});
}

window.onload = () => {
	setSize();
	template = document.querySelector("#main").innerHTML;

	activateListener();
};

var counting = setInterval(function () {
	var e = document.getElementById("percentage"),
		n = parseInt(e.innerHTML),
		t = 99 - n,
		i = document.getElementById("loader-progress");
	(e.innerHTML = ++n),
		n > 89 &&
			((e.innerHTML = 90),
			window.jQuery &&
				((e.innerHTML = 95),
				"interactive" == document.readyState && (e.innerHTML = 99),
				"complete" == document.readyState &&
					(clearInterval(counting),
					(e.innerHTML = 100),
					jQuery("body").toggleClass("page-loaded"),
					setTimeout(function () {
						jQuery("nav").css("visibility", "visible");
					}, 880)))),
		(i.style.transition = "0.15s"),
		(i.style.width = t + "%");
}, 20);
