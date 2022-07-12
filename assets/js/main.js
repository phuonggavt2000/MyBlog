VanillaTilt.init(document.querySelectorAll(".product__link"), {
  max: 6,
  speed: 200,
});

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
  for (i = 0; i < listSidebar.length; i++) {
    listSidebar[i].addEventListener("click", function (e) {
      var indexSidebar = this.dataset.index;
      console.log();
      for (j = 0; j < listSidebar.length; j++) {
        listSidebar[j].classList.remove("sidebar-item--activity");
        listContent[j].classList.remove("content__container--activity");
      }
      this.classList.add("sidebar-item--activity");
      listContent[indexSidebar].classList.add("content__container--activity");
      listContent[indexSidebar].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      var educationClass = listContent[indexSidebar].classList[1];
      if (educationClass == "content-education") {
        setTimeout(() => {
          new WOW().init();
        }, 1000);
      }
    });
  }
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
  let slider = document.querySelector(".slider");
  let sliderList = document.querySelector(".slider__list");
  let sliderItems = document.querySelectorAll(".slider__item");
  let leftBnt = document.querySelector(".slider__icon-left");
  let rightBnt = document.querySelector(".slider__icon-right");
  var controlItems = document.querySelectorAll(".slider__control-item");
  var sliderItemWidth = sliderItems[0].offsetWidth;
  let sliderItemAmount = sliderItems.length;
  var positionX = 0;
  var index = 0;
  var time = 9000;
  leftBnt.addEventListener("click", function () {
    handleBnt(-1);
    return;
  });

  rightBnt.addEventListener("click", function () {
    handleBnt(1);
    return;
  });

  function handleBnt(receive) {
    if (receive == 1) {
      handleRight();
    } else if (receive == -1) {
      handleLeft();
    }

    // right
    function handleRight() {
      var sliderItemWidth = sliderItems[0].offsetWidth;
      var controlItems = document.querySelectorAll(".slider__control-item");
      positionX = positionX - sliderItemWidth;
      console.log("positionX", positionX);
      index = Math.abs(positionX) / sliderItemWidth;
      if (index > sliderItemAmount - 1) {
        index = 0;
      }
      [...controlItems].forEach((ele) =>
        ele.classList.remove("slider__control-item--active")
      );
      controlItems[index].classList.add("slider__control-item--active");
      if (positionX <= -sliderItemAmount * sliderItemWidth) {
        positionX = 0;
      }
      sliderList.style = `transform: translateX(${positionX}px)`;
    }

    // left
    function handleLeft() {
      var sliderItemWidth = sliderItems[0].offsetWidth;
      var controlItems = document.querySelectorAll(".slider__control-item");
      positionX = positionX + sliderItemWidth;
      index = positionX / -sliderItemWidth;
      if (index < 0) {
        index = sliderItemAmount - 1;
      }
      [...controlItems].forEach((ele) =>
        ele.classList.remove("slider__control-item--active")
      );
      controlItems[index].classList.add("slider__control-item--active");
      if (positionX > 0) {
        positionX = (-sliderItemAmount + 1) * sliderItemWidth;
      }
      sliderList.style = `transform: translateX(${positionX}px)`;
    }
  }

  // handle Control item
  [...controlItems].forEach((ele) =>
    ele.addEventListener("click", function (e) {
      var sliderItemWidth = sliderItems[0].offsetWidth;
      positionX = -e.target.dataset.index * sliderItemWidth;
      sliderList.style = `transform: translateX(${positionX}px)`;
      [...controlItems].forEach((ele) =>
        ele.classList.remove("slider__control-item--active")
      );
      e.target.classList.add("slider__control-item--active");
    })
  );

  // auto
  var autoNext = setInterval(function () {
    handleBnt(1);
  }, time);
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
