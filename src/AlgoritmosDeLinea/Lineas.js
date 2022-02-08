"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metodos_1 = require("../Funciones/Metodos");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
var CoordInicial = new Metodos_1.Punto(0, 0);
var CoordFinal = new Metodos_1.Punto(0, 0);
// let inicialX: number, inicialY: number;
// let finalX: number, finalY: number;
var Seleccion = "Directo";
//-----------------------Botonoes--------------------------
canvas.addEventListener("mousedown", function (e) {
    context = canvas.getContext("2d");
    rect = canvas.getBoundingClientRect();
    CoordInicial.X = Math.round(e.clientX - rect.left);
    CoordInicial.Y = Math.round(e.clientY - rect.top);
    console.log("Coordenada 1: " + CoordInicial);
});
canvas.addEventListener("mouseup", function (e) {
    context = canvas.getContext("2d");
    rect = canvas.getBoundingClientRect();
    CoordFinal.X = Math.round(e.clientX - rect.left);
    CoordFinal.Y = Math.round(e.clientY - rect.top);
    console.log("Coordenada 2: " + CoordFinal);
    Selector(Seleccion, CoordInicial, CoordInicial);
});
function handleTool(X) {
    console.log(X.value);
    Seleccion = X.value;
}
//ALgoritmos
function Selector(Metodo, Coordnada0, Coordnada1) {
    var X0 = Coordnada0.X, Y0 = Coordnada0.Y;
    var X1 = Coordnada1.X, Y1 = Coordnada1.Y;
    switch (Metodo) {
        case "DDA":
            console.log("Entro DDA");
            //Las validaciones sobre las coordenas ocurren dentro la funcion
            DibujarLineaDDA(Math.round(X0), Math.round(Y0), Math.round(X1), Math.round(Y1));
            break;
        case "Bresenhan":
            console.log("Entro Bresenhan");
            (0, Metodos_1.DibujarLineaBresenhan)(context, Coordnada0, Coordnada1);
            break;
        default:
            console.log("Entro Directo");
            if (X0 > X1) {
                console.log("Se invertierosn las cords");
                Xi = X1;
                Xf = X0;
                Yi = Y1;
                Yf = Y0;
            }
            DibujarLineaDirecta(Math.round(Xi), Math.round(Yi), Math.round(Xf), Math.round(Yf));
            break;
    }
}
//----------------------------Metodos-----------------------------
function MetodoDirecto(X0, Y0, X1, Y1) {
    var Pendiente, B, DeltaX, DeltaY;
    DeltaX = X1 - X0;
    DeltaY = Y1 - Y0;
    if (Math.abs(DeltaX) > Math.abs(DeltaY)) {
        // Pendiente < 1
        Pendiente = DeltaY / DeltaX;
        B = Y0 - Pendiente * X0;
        if (DeltaX < 0) {
            DeltaX = -1;
        }
        else {
            DeltaX = 1;
        }
        while (X0 != X1) {
            X0 += DeltaX;
            Y0 = Math.round(Pendiente * X0 + B);
            (0, Metodos_1.DibujarPixel)(context, X0, Y0);
        }
    }
    else if (DeltaY != 0) {
        // Pendiente >= 1
        Pendiente = DeltaX / DeltaY;
        B = X0 - Pendiente * Y0;
        if (DeltaY < 0) {
            DeltaY = -1;
        }
        else {
            DeltaY = 1;
        }
        while (Y0 != Y1) {
            Y0 += DeltaY;
            X0 = Math.round(Pendiente * Y0 + B);
            (0, Metodos_1.DibujarPixel)(context, X0, Y0);
        }
    }
}
function MetodoDDA(X0, Y0, X1, Y1) {
    //Se calculan las deltas
    var DeltaX = Math.abs(X1 - X0);
    var DeltaY = Math.abs(Y1 - Y0);
    var Pendiente;
    // Se determina si se aplica la formula normal o su forma derivada
    if (DeltaY > DeltaX) {
        //Se calcula la pendioente Inversa
        Pendiente = (X1 - X0) / (Y1 - Y0);
        //se invierte las  cordenadas decuerdo a la condicion
        if (!(Y0 <= Y1)) {
            var AuxiliarX_1 = X0;
            var AuxiliarY = Y0;
            // En caso de que pase sus valores se intercambian
            Y0 = Y1;
            Y1 = AuxiliarY;
            X0 = X1;
            X1 = AuxiliarX_1;
        }
        var ValorX = X0;
        for (ValorY = Y0; ValorY <= Y1; ValorY++) {
            (0, Metodos_1.DibujarPixel)(context, Math.round(ValorX), ValorY);
            ValorX += Pendiente;
        }
    }
    else {
        //Calcula de la pendiente de manera normal
        Pendiente = (Y1 - Y0) / (X1 - X0);
        // Se calculan las Y
        //se invierte las  cordenadas decuerdo a la condicion
        if (!(X0 <= X1)) {
            var AuxioliarY = Y0;
            var AuxiliarX = X0;
            X0 = X1;
            X1 = AuxiliarX;
            Y0 = Y1;
            Y1 = AuxioliarY;
        }
        var ValorY = Y0;
        for (ValorX = X0; ValorX <= X1; ValorX++) {
            (0, Metodos_1.DibujarPixel)(context, ValorX, Math.round(ValorY));
            ValorY += Pendiente;
        }
    }
}
function MetodoBresenhan(X0, Y0, x1, y1) {
    var DeltaX = Math.abs(x1 - X0);
    var DeltaY = Math.abs(y1 - Y0);
    var sx = X0 < x1 ? 1 : -1;
    var sy = Y0 < y1 ? 1 : -1;
    var err = DeltaX - DeltaY;
    while (true) {
        DibujarPixel(X0, Y0);
        if (X0 === x1 && Y0 === y1)
            break;
        var e2 = 2 * err;
        if (e2 > -DeltaY) {
            err -= DeltaY;
            X0 += sx;
        }
        if (e2 < DeltaX) {
            err += DeltaX;
            Y0 += sy;
        }
    }
}
//Algoritmo Bresenham
//Funcion para dibujar un solo pixel
function DibujarLineaDDA(X0, Y0, X1, Y1) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
    (0, Metodos_1.DibujarPixel)(context, X0, Y0);
    MetodoDDA(X0, Y0, X1, Y1);
    (0, Metodos_1.DibujarPixel)(context, X1, Y1);
}
function DibujarLineaDirecta(X0, Y0, X1, Y1) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
    (0, Metodos_1.DibujarPixel)(context, X0, Y0);
    MetodoDirecto(X0, Y0, X1, Y1);
    (0, Metodos_1.DibujarPixel)(context, X1, Y1);
}
function Limpiar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//# sourceMappingURL=Lineas.js.map
