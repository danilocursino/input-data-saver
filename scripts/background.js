import { getDisabled } from "./func.js";

let disableButton = document.querySelector("#disableSite");

disableButton.addEventListener("click", () => getDisabled());