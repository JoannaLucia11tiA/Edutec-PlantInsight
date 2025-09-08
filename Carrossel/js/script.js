const carrossel = new Siema({
  loop: true,
  perPage: {
    0: 1,       // até 576px → 1 card
    768: 2,     // até 768px → 2 cards
    1024: 3     // acima de 1024px → 3 cards
  },
  easing: 'ease-out',
  draggable: true
});

function addEvents() {
    const buttonPrev = document.querySelector(".prev")
    const buttonNext = document.querySelector(".next")

    buttonPrev.addEventListener("click", () => carrossel.prev())
    buttonNext.addEventListener("click", () => carrossel.next())
}

addEvents()