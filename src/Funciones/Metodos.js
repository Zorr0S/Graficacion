"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DibujarLineaBresenhan = exports.MetodoBresenhan = exports.DibujarPixel = exports.Punto = void 0;
var Punto = /** @class */ (function () {
    function Punto(X1, Y1) {
        this.X = Math.round(X1);
        this.Y = Math.round(Y1);
    }
    return Punto;
}());
exports.Punto = Punto;
function DibujarPixel(ctxt, X, Y) {
    ctxt.fillStyle = "#197BBD";
    ctxt.fillRect(X, Y, 3, 3);
    ctxt.stroke();
}
exports.DibujarPixel = DibujarPixel;
function MetodoBresenhan(ctxt, CoordenadaInicial, CoordenadaFinal) {
    var X0 = CoordenadaInicial.X;
    var Y0 = CoordenadaInicial.Y;
    var X1 = CoordenadaFinal.X;
    var Y1 = CoordenadaFinal.Y;
    var DeltaX = X1 - X0, DeltaY = Y1 - Y0;
    var Pk = 0, Pk1 = 0, Pk2 = 0;
    var stepX = 0, stepY = 0;
    // Se definen comom se daran los saltos de coordenas
    if (DeltaY < 0) {
        DeltaY = -DeltaY;
        stepY = -1;
    }
    else {
        stepY = 1;
    }
    if (DeltaX < 0) {
        DeltaX = -DeltaX;
        stepX = -1;
    }
    else {
        stepX = 1;
    }
    var Punto = 0;
    if (DeltaX > DeltaY) {
        Pk = 2 * DeltaY - DeltaX;
        Pk1 = 2 * DeltaY;
        Pk2 = 2 * (DeltaY - DeltaX);
        while (X0 != X1) {
            Punto++;
            X0 = X0 + stepX;
            if (Pk < 0) {
                Pk = Pk + Pk1;
            }
            else {
                Y0 = Y0 + stepY;
                Pk = Pk + Pk2;
            }
            DibujarPixel(ctxt, X0, Y0);
        }
    }
    else {
        Pk = 2 * DeltaX - DeltaY;
        Pk1 = 2 * DeltaX;
        Pk2 = 2 * (DeltaX - DeltaY);
        while (Y0 != Y1) {
            Punto++;
            Y0 = Y0 + stepY;
            if (Pk < 0) {
                Pk = Pk + Pk1;
            }
            else {
                X0 = X0 + stepX;
                Pk = Pk + Pk2;
            }
            DibujarPixel(ctxt, X0, Y0);
        }
    }
}
exports.MetodoBresenhan = MetodoBresenhan;
function DibujarLineaBresenhan(context, Coordnada0, Coordnada1) {
    console.log(Coordnada0.X + " + " + Coordnada0.Y);
    console.log(Coordnada1.X + " + " + Coordnada1.Y);
    DibujarPixel(context, Coordnada0.X, Coordnada0.Y);
    MetodoBresenhan(context, Coordnada0, Coordnada1);
    DibujarPixel(context, Coordnada1.X, Coordnada1.Y);
}
exports.DibujarLineaBresenhan = DibujarLineaBresenhan;
//# sourceMappingURL=Metodos.js.map