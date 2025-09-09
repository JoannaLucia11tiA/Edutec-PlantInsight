      document.addEventListener("DOMContentLoaded", () => {
        const carrossel = new Siema({
          loop: true,
          align: 'center',
          perPage: {
            0: 2,       // até 576px → 1 card
            768: 3,     // até 768px → 2 cards
            1024: 4    // acima de 1024px → 5 cards
          }
        });

       // Botões
       const buttonPrev = document.querySelector(".prev");
       const buttonNext = document.querySelector(".next");

       if (buttonPrev && buttonNext) {
         buttonPrev.addEventListener("click", () => carrossel.prev());
         buttonNext.addEventListener("click", () => carrossel.next());
       }
     });
      