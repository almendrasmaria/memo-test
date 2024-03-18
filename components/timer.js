import { timeValue } from "../elements.js";

let elapsedTime = 0; // Tiempo transcurrido en segundos
const timeCounter = () => {
  elapsedTime++;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  timeValue.textContent = `Tiempo: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export default timeCounter;
