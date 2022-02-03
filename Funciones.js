function MetodoBasico(X0, Y0, X1, Y1) {
    var m = Pendiente(X0, Y0, X1, Y1);
    //console.log(`${Y0} - (${m} * ${X0})`)
    var B = Y0 - (m * X0);
    var Dx = Math.abs(X0 - X1);
    var Dy = Math.abs(Y0 - Y1);
    var TablaCoordenadas = new Array();
    TablaCoordenadas.push([X0, Y0]);
    function Normal(Valor) {
        //console.log(`(${m}(${Valor}) )+ ${B} = ${((m*(Valor))+B)}`);
        return (m * Valor) + B;
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
        for (var index = 1; index < Dx; index++) {
            var Aux = TablaCoordenadas[0][0] + index;
            var ValorY = Math.round(Normal(Aux));
            TablaCoordenadas.push([Aux, ValorY]);
        }
    }
    return TablaCoordenadas;
}
function Pendiente(X0, Y0, X1, Y1) {
    var m = (Y1 - Y0) / (X1 - X0);
    return m;
}
function DibujarLinea(X0, Y0, X1, Y1) {
    console.log("hola");
    var TablaCoordenadas = new Array();
    TablaCoordenadas = MetodoBasico(X0, Y0, X1, Y1);
    console.log(TablaCoordenadas);
}

function DibujarPixel(X, Y) {

	var linea= document.getElementById("canvas").getContext("2d");
    linea.fillStyle = "#000000";
		linea.fillRect((x0) + 100, 100 - (y0), 3, 3);
		linea.stroke();
}

