//TODO:Validar cuando solo se dibuja un punto
function MetodoBasico(X0, Y0, X1, Y1) {
    var m = Pendiente(X0, Y0, X1, Y1);
    //console.log(`${Y0} - (${m} * ${X0})`)
    var B = Y0 - m * X0;
    var Dx = Math.abs(X0 - X1);
    var Dy = Math.abs(Y0 - Y1);
    var TablaCoordenadas = new Array();
    TablaCoordenadas.push([0, 0]);
    TablaCoordenadas[0][0] = X0;
    TablaCoordenadas[0][1] = Y0;
    function Normal(Valor) {
        //console.log(`(${m}(${Valor}) )+ ${B} = ${((m*(Valor))+B)}`);
        return m * Valor + B;
    }
    function ANormal(Valor) {
        //console.log(`${Valor} ${B} / ${m}`)
        return (Valor - B) / m;
    }
    if (Dy > Dx) {
        //Funcion Despejada
        for (var index = 1; index < Dy; index++) {
            var Aux = TablaCoordenadas[0][1] + index;
            var ValorX = Math.round(ANormal(Aux));
            TablaCoordenadas.push([ValorX, Aux]);
        }
    }
    else {
        //Se inicializa el array
        console.log(Dx);
        for (var index = 1; index < Dx; index++) {
            var Aux = TablaCoordenadas[0][0] + index;
            // console.log(`${TablaCoordenadas[0][0]} + ${index} = ${Aux}`);
            //console.log(index);
            var ValorY = Math.round(Normal(Aux));
            TablaCoordenadas.push([Aux, ValorY]);
        }
    }
    return TablaCoordenadas;
}
function Pendiente(X0, Y0, X1, Y1) {
    var m = (Y1 - Y0) / (X1 - X0);
    console.log("Pendiente: (".concat(Y1, " - ").concat(Y0, "})/(").concat(X1, " - ").concat(X0, ") =  ").concat(m));
    return m;
}
function PendienteInversa(X0, Y0, X1, Y1) {
    var m = (X1 - X0) / (Y1 - Y0);
    console.log("Pendiente: (".concat(X1, " - ").concat(X0, ") /(").concat(Y1, " - ").concat(Y0, "})=  ").concat(m));
    return m;
}
//Funcion para dibujar un solo pixel
function DibujarPixel(X, Y) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#197BBD";
    context.fillRect(X + 100, 100 - Y, 3, 3);
    context.stroke();
}
function MetodoDDA(X0, Y0, X1, Y1) {
    console.log("Entro Metodo DD");
    var m = Pendiente(X0, Y0, X1, Y1);
    var mInv = PendienteInversa(X0, Y0, X1, Y1);
    //console.log(`${Y0} - (${m} * ${X0})`)
    var Dx = Math.abs(X0 - X1);
    var Dy = Math.abs(Y0 - Y1);
    var TablaCoordenadas = new Array();
    TablaCoordenadas.push([0, 0]);
    TablaCoordenadas[0][0] = X0;
    TablaCoordenadas[0][1] = Y0;
    function Normal(Valor) {
        return Valor + m;
    }
    function ANormal(Valor) {
        return Valor + mInv;
    }
    if (Dy > Dx) {
        //Funcion Despejada
        //Indice Aux mantien el indice anterior durante el ciclo
        var indiceAux = 0;
        for (var index = 1; index < Dy; index++) {
            var Aux = TablaCoordenadas[0][1] + index;
            var ValorX = Math.round(ANormal(TablaCoordenadas[indiceAux][1]));
            TablaCoordenadas.push([ValorX, Aux]);
            indiceAux++;
        }
    }
    else {
        //Se inicializa el array
        var indiceAux = 0;
        for (var index = 1; index < Dx; index++) {
            var Aux = TablaCoordenadas[0][0] + index;
            // console.log(`${TablaCoordenadas[0][0]} + ${index} = ${Aux}`);
            //console.log(index);
            var ValorY = Math.round(Normal(TablaCoordenadas[indiceAux][1]));
            TablaCoordenadas.push([Aux, ValorY]);
            indiceAux++;
        }
    }
    return TablaCoordenadas;
}
function DibujarLineaDDA(X0, Y0, X1, Y1) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
    var TablaCoordenadas = new Array();
    TablaCoordenadas = MetodoDDA(X0, Y0, X1, Y1);
    console.log(TablaCoordenadas);
    DibujarPixel(X0, Y0);
    DibujarPixel(X1, Y1);
    console.log(TablaCoordenadas.length);
    for (var i = 0; i < TablaCoordenadas.length; i++) {
        var X = TablaCoordenadas[i][0];
        var Y = TablaCoordenadas[i][1];
        DibujarPixel(X, Y);
    }
}
function DibujarLineaDirecta(X0, Y0, X1, Y1) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
    var TablaCoordenadas = new Array();
    TablaCoordenadas = MetodoBasico(X0, Y0, X1, Y1);
    console.log(TablaCoordenadas);
    DibujarPixel(X0, Y0);
    DibujarPixel(X1, Y1);
    console.log(TablaCoordenadas.length);
    for (var i = 0; i < TablaCoordenadas.length; i++) {
        var X = TablaCoordenadas[i][0];
        var Y = TablaCoordenadas[i][1];
        DibujarPixel(X, Y);
    }
}
