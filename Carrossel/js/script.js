const carrossel = new Siema({
  loop: true,
  perPage: {
    0: 1,       // até 576px → 1 card
    768: 2,     // até 768px → 2 cards
    1024: 3     // acima de 1024px → 3 cards
  },
  easing: 'ease-out',
  draggable: true,
  onInit: highlightCards,
  onChange: highlightCards
});

function highlightCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('active'));

  // pega o índice do card central
  let centerIndex = carrossel.currentSlide;

  // aplica "active" só nos cards visíveis no centro
  for (let i = 0; i < carrossel.perPage; i++) {
    let index = (centerIndex + i) % cards.length;
    cards[index].classList.add('active');
  }
}
function addEvents() {
    const buttonPrev = document.querySelector(".prev")
    const buttonNext = document.querySelector(".next")

    buttonPrev.addEventListener("click", () => carrossel.prev())
    buttonNext.addEventListener("click", () => carrossel.next())
}

addEvents()