//TODO:Validar cuando solo se dibuja un punto
function MetodoBasico(
  X0: number,
  Y0: number,
  X1: number,
  Y1: number
): number[][] {
  console.log("Entro Metodo Basico")
  let m = Pendiente(X0, Y0, X1, Y1);
  //console.log(`${Y0} - (${m} * ${X0})`)
  let B = Y0 - m * X0;
  let Dx = Math.abs(X0 - X1);

  let Dy = Math.abs(Y0 - Y1);

  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas.push([0, 0]);
  TablaCoordenadas[0][0] = X0;
  TablaCoordenadas[0][1] = Y0;
  function Normal(Valor: number) {
    //console.log(`(${m}(${Valor}) )+ ${B} = ${((m*(Valor))+B)}`);
    return m * Valor + B;
  }
  function ANormal(Valor: number) {
    //console.log(`${Valor} ${B} / ${m}`)
    return (Valor - B) / m;
  }

  if (Dy > Dx) {
    //Funcion Despejada
    
    for (let index: number = 1; index < Dy; index++) {
      let Aux = TablaCoordenadas[0][1] + index;
      let ValorX = Math.round(ANormal(Aux));
      TablaCoordenadas.push([ValorX, Aux]);
    }
  } else {
    //Se inicializa el array
    console.log(Dx);
    for (let index: number = 1; index < Dx; index++) {
      let Aux: number = TablaCoordenadas[0][0] + index;
      // console.log(`${TablaCoordenadas[0][0]} + ${index} = ${Aux}`);
      //console.log(index);
      let ValorY: number = Math.round(Normal(Aux));
      TablaCoordenadas.push([Aux, ValorY]);
    }
  }
  return TablaCoordenadas;
}

function Pendiente(X0: number, Y0: number, X1: number, Y1: number) {
  let m: number = (Y1 - Y0) / (X1 - X0);
  console.log(`Pendiente: (${Y1} - ${Y0}})/(${X1} - ${X0}) =  ${m}`);
  return m;
}
function PendienteInversa(X0: number, Y0: number, X1: number, Y1: number) {
  let m: number = (X1 - X0) / (Y1 - Y0);
  console.log(`Pendiente: (${X1} - ${X0}) /(${Y1} - ${Y0}})=  ${m}`);
  return m;
}

//Funcion para dibujar un solo pixel
function DibujarPixel(X: number, Y: number) {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let context: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  context.fillStyle = "#197BBD";
  context.fillRect(X + 100, 100 - Y, 3, 3);
  context.stroke();
}

function MetodoDDA(X0: number, Y0: number, X1: number, Y1: number): number[][] {
  console.log("Entro Metodo DD");
  let m: number = Pendiente(X0, Y0, X1, Y1);
  let mInv: number = PendienteInversa(X0, Y0, X1, Y1);
  //console.log(`${Y0} - (${m} * ${X0})`)

  let Dx = Math.abs(X0 - X1);

  let Dy = Math.abs(Y0 - Y1);

  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas.push([0, 0]);
  TablaCoordenadas[0][0] = X0;
  TablaCoordenadas[0][1] = Y0;
  function Normal(Valor: number) {
    return Valor + m;
  }
  function ANormal(Valor: number) {
    return Valor + mInv;
  }

  if (Dy > Dx) {
    //Funcion Despejada
    //Indice Aux mantien el indice anterior durante el ciclo
    let indiceAux: number = 0;
    for (let index: number = 1; index < Dy; index++) {
      let Aux: number = TablaCoordenadas[0][1] + index;
      let ValorX: number = Math.round(ANormal(TablaCoordenadas[indiceAux][1]));
      TablaCoordenadas.push([ValorX, Aux]);
      indiceAux++;
    }
  } else {
    //Se inicializa el array
    
    let indiceAux: number = 0;
    for (let index: number = 1; index < Dx; index++) {
      let Aux: number = TablaCoordenadas[0][0] + index;
      // console.log(`${TablaCoordenadas[0][0]} + ${index} = ${Aux}`);
      //console.log(index);
      let ValorY: number = Math.round(Normal(TablaCoordenadas[indiceAux][1]));
      TablaCoordenadas.push([Aux, ValorY]);
      indiceAux++;
    }
  }
  return TablaCoordenadas;
}
function MetodoBresenHan(X0: number, Y0: number, X1: number, Y1: number){
  // Funcion LineaBresenham( X1, Y1, X2, Y2)
  //     // 0 - Distancias que se desplazan en cada eje
  //     dY = (Y2 - Y1)
  //     dX = (X2 - X1)
   
  //     // 1 - Incrementos para las secciones con avance inclinado
  //     Si (dY >= 0) luego
  //         IncYi = 1
  //     Sino
  //         dY = -dY
  //         IncYi = -1
  //     Fin si
   
  //     Si (dX >= 0) luego
  //         IncXi = 1
  //     Sino
  //         dX = -dX
  //         IncXi = -1
  //     Fin si

  let Dy:number = (Y1-Y0);
  let Dx:number =(X1-X0);
  let IncYi:number,IncXi:number;
  if(Dy>=0){
    IncYi=1
  }else{
    Dy= -Dy;
    IncYi = -1
  }
  if(Dx>=0){
    IncXi=1;
  }else{
    Dx= -Dx;
    IncXi=-1;
  }
  //     // 2 - Incrementos para las secciones con avance recto:
  //     Si (dX >= dY) luego
  //         IncYr = 0
  //         IncXr = IncXi
  //     Sino
  //         IncXr = 0
  //         IncYr = IncYi
   
  //         // Cuando dy es mayor que dx, se intercambian, para reutilizar el mismo bucle.
  //         // ver octantes blancos en la imagen encima del código
  //         k = dX: dX = dY: dY = k
  //     Fin si
  let IncXr:number=0,IncYr:number=0;
   if(Dx>=Dy){
     IncYr=0
     IncXr=IncXi
   }else{
     
   }
  //     // 3  - Inicializar valores (y de error).
  //     X = X1: Y = Y1
  //     avR = (2 * dY)
  //     av = (avR - dX)
  //     avI = (av - dX)
   
  //     // 4  - Bucle para el trazado de las línea.
  //     Hacer
  //         DibujarPixel(X, Y, Color) // Como mínimo se dibujará siempre 1 píxel (punto).
  //         Mensaje(av + " ") // (debug) para ver los valores de error global que van apareciendo.
  //         Si (av >= 0) luego
  //             X = (X + IncXi)     // X aumenta en inclinado.
  //             Y = (Y + IncYi)     // Y aumenta en inclinado.
  //             av = (av + avI)     // Avance Inclinado
  //         Sino
  //             X = (X + IncXr)     // X aumenta en recto.
  //             Y = (Y + IncYr)     // Y aumenta en recto.
  //             av = (av + avR)     // Avance Recto
  //         Fin si
  //     Repetir hasta que (X = X2) // NOTA: La condición de 'Repetir Hasta', se debe cambiar si se elige 'Repetir Mientras'
  //  Fin funcion



}

function DibujarLineaDDA(X0: number, Y0: number, X1: number, Y1: number) {
  console.log(X0 + " + " + Y0);
  console.log(X1 + " + " + Y1);

  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas = MetodoDDA(X0, Y0, X1, Y1);
  console.log(TablaCoordenadas);
  DibujarPixel(X0,Y0);
  DibujarPixel(X1, Y1);
  console.log(TablaCoordenadas.length);
  for (let i = 0; i < TablaCoordenadas.length; i++) {
    let X: number = TablaCoordenadas[i][0];
    let Y: number = TablaCoordenadas[i][1];
    DibujarPixel(X, Y);
  }
}

function DibujarLineaDirecta(X0: number, Y0: number, X1: number, Y1: number) {
  console.log(X0 + " + " + Y0);
  console.log(X1 + " + " + Y1);

  let TablaCoordenadas: number[][] = new Array();
  TablaCoordenadas = MetodoBasico(X0, Y0, X1, Y1);
  console.log(TablaCoordenadas);
  DibujarPixel(X0, Y0);
  DibujarPixel(X1, Y1);
  console.log(TablaCoordenadas.length);
  for (let i = 0; i < TablaCoordenadas.length; i++) {
    let X: number = TablaCoordenadas[i][0];
    let Y: number = TablaCoordenadas[i][1];
    DibujarPixel(X, Y);
  }
}
