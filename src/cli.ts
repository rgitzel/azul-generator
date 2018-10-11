

import {renderToPdfFile} from "./renderer";
import {randomAzulBoard} from "./game/board";


renderToPdfFile(randomAzulBoard(), "./local.pdf");

