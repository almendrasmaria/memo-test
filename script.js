const moves = document.getElementById("moves-count"); 
const timeValue = document.getElementById("time"); 
const buttonControl = document.querySelector(".button-control"); 
const controls = document.querySelector(".game-stats"); 
const gameContainer = document.querySelector(".game-board");
let firstCard = false; 
let secondCard = false; 
let movesCount = 0;
let buttonClicked = false;


// Array de las imagenes 
const items = [
  { name: "candy-cane", image: "candy-cane.png" }, 
  { name: "christmas-tree", image: "christmas-tree.png" },
  { name: "gingerbread-man", image: "gingerbread-man.png" },
  { name: "snow-globe", image: "snow-globe.png" },
  { name: "snowman-head", image: "snowman-head.png" },
  { name: "snowman", image: "snowman.png" },
  { name: "winter-hat", image: "winter-hat.png" },
  { name: "wreath", image: "wreath.png" },
];

// Función para generar cartas aleatorias
function generateRandom(size = 4) {
  let tempArray = [...items];
  let cardValues = [];

  size = (size * size) / 2; 

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);

    tempArray.splice(randomIndex, 1); 
  }

  return cardValues;
}

// Función para mostrar el tablero de juego
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";

  // Se duplican las cartas y se mezclan
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);

  // Se genera el HTML para cada carta y se inserta en el contenedor del juego
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[index].name}"
          style="grid-column: ${j + 1}; grid-row: ${i + 1};">
          <div class="card-before"></div>
          <div class="card-after">
            <img src="images/${cardValues[index].image}" class="image"/>
          </div>
        </div>
      `;
    }
  }

  // Se establece la estructura del tablero de juego
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  const cards = document.querySelectorAll(".card-container");

  // Se añade un evento de clic a cada carta para voltearla
  cards.forEach(card => card.addEventListener("click", flipCard));
};

// Evento de clic en el botón de inicio
buttonControl.addEventListener("click", () => {
  // Reiniciar contador de movimientos solo cuando se hace clic en el botón
  if (buttonClicked) {
    movesCount = 0;
    moves.textContent = `Movimientos: ${movesCount}`;
  }

  // Cambiar el estado del juego
  buttonClicked = !buttonClicked;
});

// Función para voltear una carta
const flipCard = (event) => {
  const selectedCard = event.target.closest(".card-container");

  // Se verifica si la carta no está emparejada y el juego está en curso
  if (!selectedCard.classList.contains("matched") && buttonClicked) {
    selectedCard.classList.add("flipped");

    if (!firstCard) {
      // Se guarda la primera carta seleccionada
      firstCard = selectedCard;
      firstCardValue = selectedCard.getAttribute("data-card-value");
    } else {
      // Se guarda la segunda carta seleccionada
      secondCard = selectedCard;
      let secondCardValue = selectedCard.getAttribute("data-card-value");

      // Se verifica si las cartas seleccionadas son un par
      if (firstCardValue === secondCardValue) {
        // Si son un par, se marcan como emparejadas
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
        secondCard = null;
      } else {
        // Si no son un par, se voltean nuevamente después de un tiempo
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = null;
          secondCard = null;
        }, 900);
      }

      // Incrementar el contador de movimientos solo si el juego está en curso
      movesCount++;
      moves.textContent = `Movimientos: ${movesCount}`;
    }
  }
};


// Inicializar el juego
const initialCardValues = generateRandom();
matrixGenerator(initialCardValues);

