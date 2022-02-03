
//TODO:Validar cuando solo se dibuja un punto
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
  TablaCoordenadas.push([0,0]);
  TablaCoordenadas[0][0]= X0;
  TablaCoordenadas[0][1]= Y1;
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
    for (let index:number = 1; index < Dy; index++) {
        let Aux = TablaCoordenadas[0][1] + index;
        let ValorX = Math.round(ANormal(Aux));
        TablaCoordenadas.push([ValorX, Aux]);
     
    }
  } else {
    //Se inicializa el array
    console.log(Dx);
    for (let index:number = 1; index <Dx; index++) {
        let Aux:number = (TablaCoordenadas[0][0]) + (index);
        console.log(`${TablaCoordenadas[0][0]} + ${index} = ${Aux}`);
        console.log(index);
        let ValorY:number = Math.round(Normal(Aux));
      TablaCoordenadas.push([Aux, ValorY]);
    }
    
  }
  return TablaCoordenadas;
}

function Pendiente(X0: number, Y0: number, X1: number, Y1: number) {
  let m: number = (Y1 - Y0) / (X1 - X0);

  return m;
}

function DibujarLinea( X0: number,Y0: number,X1: number,Y1: number){
  console.log("hola");
  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas=MetodoBasico(X0,Y0,X1,Y1);
  console.log(TablaCoordenadas);
  DibujarPixel(X0,Y0);
  DibujarPixel(X1,Y1);
  
  for (let i = 0; i < TablaCoordenadas.length; i++) {
    let X:number = TablaCoordenadas[i][0];
    let Y:number = TablaCoordenadas[i][1];
    DibujarPixel(X,Y);
    
  }

}
//Funcion para dibujar un solo pixel
function DibujarPixel(X:number, Y:number) {
  let canvas = document.getElementById("canvas") as  HTMLCanvasElement;
  let context:CanvasRenderingContext2D  =canvas.getContext("2d") as CanvasRenderingContext2D;
   context.fillStyle = "#197BBD";
   context.fillRect((X) + 100, 100 - (Y), 3, 3);
  context.stroke();
}
