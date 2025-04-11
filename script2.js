const imgSlider = document.querySelector(".img-slider");
const imgFruit = document.querySelectorAll(".img-item.fruit");
const infoBox = document.querySelector(".info-box");
const infoSlider = document.querySelector(".info-slider");
const bgs = document.querySelectorAll(".bg-box .bg");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let indexSlider = 0;
let index = 0;
let direction;

const updateSlide = (i) => {
  indexSlider = i;
  index = i;
  imgSlider.style.transform = `rotate(${index * -90}deg)`;

  document.querySelector(".fruit.active").classList.remove("active");
  imgFruit[index].classList.add("active");

  document.querySelector(".bg.active").classList.remove("active");
  bgs[index].classList.add("active");

  while (infoSlider.firstChild) {
    infoSlider.removeChild(infoSlider.firstChild);
  }

  const infoItems = document.querySelectorAll(".info-item");
  infoItems.forEach((item, idx) => {
    if (idx === index) {
      infoSlider.appendChild(item.cloneNode(true));
    }
  });
};

nextBtn.addEventListener("click", () => {
  index = (index + 1) % imgFruit.length;
  updateSlide(index);
  direction = -1;
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + imgFruit.length) % imgFruit.length;
  updateSlide(index);
  direction = 1;
});

infoSlider.addEventListener("transitionend", () => {
  infoSlider.style.transition = "none";
  infoSlider.style.transform = "translateY(0)";
  setTimeout(() => {
    infoSlider.style.transition = "0.5s cubic-bezier(0.215, 0.61, 0.355, 1)";
  });
});

// Form & Nav Logic
const navBtns = document.querySelectorAll(".nav-btn");
const forms = document.querySelectorAll(".role-form");
const formSection = document.querySelector(".form-sections");
const carouselWrapper = document.querySelector(".carousel-wrapper");

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const role = btn.dataset.role;
    let slideIndex = 0;

    if (role === "manufacturer") slideIndex = 0;
    else if (role === "channel") slideIndex = 1;
    else if (role === "retailer") slideIndex = 2;

    updateSlide(slideIndex);

    carouselWrapper.style.display = "none";
    formSection.style.display = "flex";
    forms.forEach((form) => (form.style.display = "none"));

    const targetForm = document.getElementById(`${role}-form`);
    if (targetForm) targetForm.style.display = "flex";
  });
});

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    formSection.style.display = "none";
    carouselWrapper.style.display = "block";
  });
});
