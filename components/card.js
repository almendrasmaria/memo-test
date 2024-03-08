// Array of objects with the name and image of the cards
const items = [
  { name: "candy-cane", image: "candy-cane.webp" },
  { name: "christmas-tree", image: "christmas-tree.webp" },
  { name: "gingerbread-man", image: "gingerbread-man.webp" },
  { name: "snow-globe", image: "snow-globe.webp" },
  { name: "snowman-head", image: "snowman-head.webp" },
  { name: "snowman", image: "snowman.webp" },
  { name: "winter-hat", image: "winter-hat.webp" },
  { name: "wreath", image: "wreath.webp" },
];

// Function to generate random cards
export const generateRandom = (size = 4) => {
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
