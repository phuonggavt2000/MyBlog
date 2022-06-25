VanillaTilt.init(document.querySelectorAll(".product__link"), {
  max: 25,
  speed: 400,
});

setTimeout(() => {
  new WOW().init();
}, 3000);

function start() {
  addEducationClass();
  addClass();
  handleSlider();
}

start();

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
      var educationClass = listContent[indexSidebar].classList[1];
    });
  }
}

function addEducationClass() {
  var skillDot = document.querySelectorAll(".education-skill__dot");
  var skillCircle = document.querySelectorAll(".education-skill__circle");
  var skillDecs = document.querySelectorAll(".education-skill__decs");
  for (i = 0; i < skillDot.length; i++) {
    skillDot[i].classList.add("wow");
    skillCircle[i].classList.add("wow");
    skillDecs[i].classList.add("wow");
  }
}

function handleSlider() {
  const slider = document.querySelector(".slider");
  const sliderList = document.querySelector(".slider__list");
  const sliderItems = document.querySelectorAll(".slider__item");
  const leftBnt = document.querySelector(".slider__icon-left");
  const rightBnt = document.querySelector(".slider__icon-right");
  const controlItems = document.querySelectorAll(".slider__control-item");
  const sliderItemWidth = sliderItems[0].offsetWidth;
  const sliderItemAmount = sliderItems.length;
  var positionX = 0;
  var index = 0;
  var time = 9000;
  leftBnt.addEventListener("click", function () {
    handleBnt(-1);
  });

  rightBnt.addEventListener("click", function () {
    handleBnt(1);
  });

  function handleBnt(receive) {
    if (receive == 1) {
      handleRight();
    } else if (receive == -1) {
      handleLeft();
    } else if (receive == 2) {
      handleRight();
    }

    // right
    function handleRight() {
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
    handleBnt(2);
  }, time);
}
