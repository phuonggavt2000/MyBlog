VanillaTilt.init(document.querySelectorAll(".product__link"), {
  max: 6,
  speed: 200,
});

new WOW().init();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function start() {
  handleLoading();
  addEducationClass();
  addClass();
  handleSlider();
  handleScroll();
  for (i = 0; i <= 40; i++) {
    handleSnow();
  }
}

start();

function handleScroll() {
  var content = document.querySelector(".content");
  var nav = document.querySelector("#nav");
  window.onscroll = () => {
    let contentTop = content.offsetTop;
    let scrollTop = window.scrollY || document.documentElement.offsetTop;
    if (scrollTop > contentTop - 10) {
      nav.classList.add("fixed");
    } else if (scrollTop <= contentTop - 12) {
      nav.classList.remove("fixed");
    }

    // Show skill progress when scroll to view
    // let skillElementToTop = this.skillElement.getBoundingClientRect().top;
    // if (skillElementToTop < window.innerHeight) {
    //   this.skillElement.setAttribute(
    //     "style",
    //     "--animation-progress: skill-progress 1s forwards"
    //   );
    // } else {
    //   this.skillElement.removeAttribute("style");
    // }
  };
}

function addClass() {
  var listSidebar = document.querySelectorAll(".sidebar-item");
  var listContent = document.querySelectorAll(".content__container");

  var activeSidebar = $(".sidebar-item.active");
  listSidebar.forEach((item, index) => {
    item.onclick = function () {
      if ($(".sidebar-item.active") !== null) {
        $(".sidebar-item.active").classList.remove("active");
      }
      $(".content__container.active").classList.remove("active");

      this.classList.add("active");
      listContent[index].classList.add("active");

      listContent[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      var educationClass = listContent[index].classList[1];
      if (educationClass == "content-education") {
        setTimeout(() => {
          new WOW().init();
        }, 1000);
      }
    };
  });
}

function addEducationClass() {
  var skillDot = document.querySelectorAll(".education-skill__dot");
  var skillCircle = document.querySelectorAll(".education-skill__circle");
  var skillDecs = document.querySelectorAll(".education-skill__decs");
  for (i = 0; i < skillDot.length; i++) {
    skillDot[i].classList.add("wow");
    skillDecs[i].classList.add("wow");
  }
}

function handleSlider() {
  const prevBnt = $(".slider__icon-left");
  const nextBnt = $(".slider__icon-right");
  const controlItems = $$(".slider__control-item");
  console.log(controlItems);

  const sliderItems = $$(".slider__item");
  const sliderList = $(".slider__list");
  var currentIndex = 0;

  nextBnt.onclick = function () {
    handleNextBnt();
  };

  prevBnt.onclick = function () {
    handlePrevBnt();
  };

  // show Slider
  function showSlider() {
    sliderList.style.transform = `translateX(${-sliderItems[currentIndex]
      .offsetLeft}px)`;
  }

  // handle Button
  function handlePrevBnt() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = sliderItems.length - 1;
    }
    showSlider();
    showControl();
  }

  function handleNextBnt() {
    currentIndex++;
    if (currentIndex >= sliderItems.length) {
      currentIndex = 0;
    }
    showSlider();
    showControl();
  }
  // handle control button
  controlItems.forEach((control, index) => {
    control.onclick = function () {
      currentIndex = index;
      showSlider();
      showControl();
    };
  });

  function showControl() {
    $(".slider__control-item.active").classList.remove("active");

    controlItems[currentIndex].classList.add("active");
  }

  setInterval(() => {
    handleNextBnt();
  }, 9000);
}

function handleSnow() {
  const snowObject = {
    second: Math.floor(Math.random() * (60 - 10) + 10),
    scaleForm: Math.floor(Math.random() * (4 - 1) + 1),
    scaleTo: Math.floor(Math.random() * (5 - 3) + 3),
    snowText: "❆",
    margin: Math.floor(Math.random() * (50 - 10) + 10),
    bottomForm: Math.floor(Math.random() * (100 - 20) + 20),
  };
  let snowList = document.querySelector(".snow-list");
  let snow = document.createElement("span");
  snow.classList.add("snow");
  snow.style.cssText = `--second: ${snowObject.second}; --scale-form: ${snowObject.scaleForm}; --scale-to: ${snowObject.scaleTo};--margin: ${snowObject.margin}px; --bottom-form: ${snowObject.bottomForm}vh`;
  snow.innerText = `${snowObject.snowText}`;
  snowList.appendChild(snow);
  // let snow = `<span class="snow" style="--second: ${snowObject.second}; --scale-form: ${snowObject.scaleForm}; --scale-to: ${snowObject.scaleTo}">${snowObject.snowText}</span>`;
}

// none Loading
function handleLoading() {
  let eleLoading = document.querySelector(".loading");
  let transition = 500;
  setTimeout(() => {
    eleLoading.style.transition = ` opacity ${transition}ms linear `;
  }, 1000);
  window.onload = () => {
    setTimeout(() => {
      noneLoading();
    }, 1000);
  };
  function noneLoading() {
    eleLoading.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(eleLoading);
    }, transition);
  }
}
