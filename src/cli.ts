

import {renderToPdfFile} from "./game/renderer";
import {randomAzulBoard} from "./game/board";


renderToPdfFile(randomAzulBoard(), "./local.pdf");

