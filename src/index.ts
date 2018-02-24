
import {renderToPdfInBrowser} from "./renderer";
import {generateRandomBoard} from "./board";

let element = document.createElement("iframe") as HTMLIFrameElement;
element.setAttribute("width", "600");
element.setAttribute("height", "800");

renderToPdfInBrowser(generateRandomBoard(), element);
document.body.appendChild(element);


