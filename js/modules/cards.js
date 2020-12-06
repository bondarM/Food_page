import { getResource } from '../services/services'
function cards() {
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





    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCards(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

}

export default cards