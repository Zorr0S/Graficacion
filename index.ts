function MetodoBasico(
  X0: number,
  Y0: number,
  X1: number,
  Y1: number
): number[][] {
  let m = Pendiente(X0, Y0, X1, Y1);
  //console.log(`${Y0} - (${m} * ${X0})`)
  let B = Y0 - (m * X0);
  let Dx = Math.abs(X0 - X1);

  let Dy = Math.abs(Y0 - Y1);

  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas.push([X0, Y0]);
  function Normal(Valor: number) {

    //console.log(`(${m}(${Valor}) )+ ${B} = ${((m*(Valor))+B)}`);
    return (m * Valor )+ B;
  }
  function ANormal(Valor: number) {
      //console.log(`${Valor} ${B} / ${m}`)
    return (Valor - B) / m;
  }

  if (Dy > Dx) {
    //Funcion Despejada
    for (let index = 1; index < Dy; index++) {
        let Aux = TablaCoordenadas[0][1] + index;
        let ValorX = Math.round(ANormal(Aux));
        TablaCoordenadas.push([ValorX, Aux]);
     
    }
  } else {
    //Se inicializa el array
    for (let index = 1; index <Dx; index++) {
        let Aux = TablaCoordenadas[0][0] + index;
        let ValorY = Math.round(Normal(Aux));
      TablaCoordenadas.push([Aux, ValorY]);
    }
    
  }
  return TablaCoordenadas;
}

function Pendiente(X0: number, Y0: number, X1: number, Y1: number) {
  let m: number = (Y1 - Y0) / (X1 - X0);

  return m;
}

var Prueba = MetodoBasico(1, 2, 3, 6);
console.log(Prueba);
