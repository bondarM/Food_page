window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabsContent() {
    tabsContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show", "fade");
    });

    tabs.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((el, i) => {
        if (target == el) {
          hideTabsContent();
          showTabContent(i);
        }
      });
    }
  });

  // const arr1 = [
  //   { id: 1, name: "meb" },
  //   { id: 2, name: "fima" },
  //   { id: 67, name: "keshmaa" },
  // ];

  // let objName1 = {};

  // arr1.forEach((el, i) => {
  //   objName1[i] = el;
  // });

  // console.log(objName1);

  // Timer

  const deadline = "2020-12-30";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // modal window

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((el) => {
    el.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 10000);

  // function showModalByScroll() {
  //   if (
  //     window.pageYOffset + document.documentElement.clientHeight >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     openModal();
  //     window.removeEventListener("scroll", showModalByScroll);
  //   }
  // }
  // window.addEventListener("scroll", showModalByScroll);


  class TestClas {
    constructor(num) {
      this.num = num;

    }

    mathNum() {
      return this.num * 2;
    }
  }

  const square = new TestClas(5)
  console.log(square.mathNum());

  //////////////cards

  class MenuCards {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.alt = alt;
      this.src = src;
      this.parent = document.querySelector(parentSelector)
      this.transfer = 27
      this.cahngeToUAH()
    }
    cahngeToUAH() {
      this.price = this.price * this.transfer
    }


    render() {
      const elementCard = document.createElement("div");
      if (this.classes.length === 0) {
        this.elementCard = "menu__item"
        elementCard.classList.add(this.elementCard)
      } else {
        this.classes.forEach(className => elementCard.classList.add(className))
      }

      elementCard.innerHTML = `
      
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
             ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         
      `
      this.parent.append(elementCard)
    }
  }

  new MenuCards(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();



  new MenuCards(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
  ).render();

  new MenuCards(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
  ).render();


});
