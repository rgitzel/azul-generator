
import {renderToPdfFile} from "./game/renderer";
import {randomTileWall} from "./game/wall";

renderToPdfFile(randomTileWall(), "./local.pdf");
