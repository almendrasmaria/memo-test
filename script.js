const tryCount = document.getElementById("try"); 
const timeValue = document.getElementById("time"); 
const buttonControl = document.getElementById("button-control"); 
const gameContainer = document.querySelector(".game-board"); 
const controls = document.querySelector(".game-stats"); 
let cards;

// Array de las imagenes 
const items = [
    {name: "candy-cane", image: "candy-cane.png"}, 
    {name: "christmas-tree", image: "christmas-tree.png"}, 
    {name: "gingerbread-man", image: "gingerbread-man.png"}, 
    {name: "snow-globe", image: "snow-globe.png"}, 
    {name: "snowman-head", image: "snowman-head.png"}, 
    {name: "snowman", image: "snowman.png"}, 
    {name: "winter-hat", image: "winter-hat.png"}, 
    {name: "wreath", image: "wreath.png"},
];

// Funcion mezclar tarjetas aleatoriamente 
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];

    size = (size * size) / 2;

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

// Función para mostrar el tablero de juego
const matrixGenerator = (cardValues, size = 4) => {
gameContainer.innerHTML = "";

cardValues = [...cardValues, ...cardValues];
cardValues.sort(() => Math.random() - 0.5);

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
    
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
    cards = document.querySelectorAll(".card-container");
};

const initialCardValues = generateRandom();
matrixGenerator(initialCardValues);


