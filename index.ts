//Elemtos HTNL
let canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;
let rect: DOMRect = canvas.getBoundingClientRect();
//-------------------------Clases-------------------
class Punto {
  X: number = 0;
  Y: number = 0;
  constructor(A: number, B: number) {
    this.X = A;
    this.Y = B;
  }
  Redondear() {
    this.X = Math.round(this.X);
    this.Y = Math.round(this.Y);
  }
}

//Variables Gobales
let Seleccion: string = "Directo";
let inicialX: number, inicialY: number;
let finalX: number, finalY: number;
let NLados: number = 3;
let PuntoInicial: Punto = new Punto(0, 0),
  PuntoFinal: Punto = new Punto(0, 0);

function RefreshPosition() {
  context = canvas.getContext("2d") as CanvasRenderingContext2D;
  rect = canvas.getBoundingClientRect();
}

//-----------------------Botonoes--------------------------
canvas.addEventListener("mousedown", function (e) {
  RefreshPosition();
  inicialX = e.clientX - rect.left;
  inicialY = e.clientY - rect.top;

  PuntoInicial = new Punto(Math.round(inicialX), Math.round(inicialY));
  console.log(`Coordenada 1: ${PuntoInicial.X}, ${PuntoInicial.Y}`);
});
canvas.addEventListener("mouseup", function (e) {
  RefreshPosition();
  finalX = e.clientX - rect.left;
  finalY = e.clientY - rect.top;
  PuntoFinal = new Punto(Math.round(finalX), Math.round(finalY));
  console.log(`Coordenada 2: ${PuntoFinal.X}, ${PuntoFinal.Y}`);
  Selector(Seleccion, PuntoInicial, PuntoFinal);
});
function handleTool(X: any) {
  console.log(X.value);
  Seleccion = X.value;
}
function handleNumberTool(X: any) {
  NLados = parseInt(X.value);
  console.log(NLados);
}
//ALgoritmos
function Selector(Metodo: string, Punto0: Punto, Punto1: Punto) {
  switch (Metodo) {
    case "DDA":
      console.log("Entro DDA");

      DibujarLineaDDA(Punto0, Punto1);
      break;
    case "Bresenhan":
      console.log("Entro Bresenhan");
      DibujarLineaBresenhan(Punto0, Punto1);

      break;
    case "Circulo":
      console.log("Entro Circulo");
      let AuxCentro: Punto = midpoint(Punto0, Punto1);
      console.log(`Punto Medio: ${AuxCentro.X} , ${AuxCentro.Y} `);

      let AuxRadio: number = Distancia(AuxCentro, Punto1);
      console.log(`Radio: ${AuxRadio}`);
      DrawCirle(AuxCentro, AuxRadio);
      break;
    case "Poligono":
      console.log("Entro Poligono");
      drawPoligon(Punto0, Punto1, Distancia(Punto0, Punto1) / 2, NLados);

      break;
    default:
      console.log("Entro Directo");
      DibujarLineaDirecta(Punto0, Punto1);

      break;
  }
}
//Funcioens Auxiliares
/*Devuelve la coordenada del punto de enmedio de 2 puntos*/
function midpoint(Punto0: Punto, Punto1: Punto): Punto {
  let X1: number = Punto0.X,
    y1: number = Punto0.Y;
  let X2: number = Punto1.X,
    y2: number = Punto1.Y;

  let Resultado: Punto = new Punto((X1 + X2) / 2, (y1 + y2) / 2);
  //(X1 + X2) / 2 +" , " + (y1 + y2) / 2

  return Resultado;
}
function Distancia(Punto0: Punto, Punto1: Punto): number {
  let X1: number = Punto0.X,
    Y1: number = Punto0.Y;
  let X2: number = Punto1.X,
    Y2: number = Punto1.Y;
  // Calculating distance
  return Math.sqrt(Math.pow(X2 - X1, 2) + Math.pow(Y2 - Y1, 2) * 1.0);
}
//----------------------------Pruebas-----------------------
function Prueba() {
  var VerticalesA = new Array();
  var VerticalesB = new Array();
  var HorizontalesA = new Array();
  var HorizontalesB = new Array();

  var EsquinaDerechaA = new Array();
  var EsquinaDerechaB = new Array();

  var EsquinaIzquierdaA = new Array();
  var EsquinaIzquierdaB = new Array();
  for (let i: number = 0; i <= 1000; i += 2) {
    VerticalesA.push([i, 0]);
    VerticalesB.push([i, 1000]);
  }
  for (let i: number = 0; i <= 1000; i += 2) {
    HorizontalesA.push([0, i]);
    HorizontalesB.push([1000, i]);
  }

  for (let i: number = 0; i <= 1000; i += 2) {
    EsquinaIzquierdaA.push([0, 1000 - i]);
    EsquinaIzquierdaB.push([i, 1000]);
  }
  for (let i: number = 0; i <= 1000; i += 2) {
    EsquinaDerechaA.push([1000, 1000 - i]);
    EsquinaDerechaB.push([1000 - i, 1000]);
  }

  function PruebaDirecta() {
    var startDate = new Date();
    // //Dibujar verticales
    let Punto0: Punto = new Punto(0, 0);
    let Punto1: Punto = new Punto(0, 0);
    for (let index = 0; index < VerticalesA.length; index++) {
      Punto0.X = VerticalesA[index][0];
      Punto0.Y = VerticalesA[index][1];

      Punto1.X = VerticalesB[index][0];
      Punto1.Y = VerticalesB[index][1];

      DibujarLineaDirecta(Punto0, Punto1);
    }
    // //Dibujar Horizaontales
    for (let index = 0; index < HorizontalesA.length; index++) {
      Punto0.X = HorizontalesA[index][0];
      Punto0.Y = HorizontalesA[index][1];

      Punto1.X = HorizontalesB[index][0];
      Punto1.Y = HorizontalesB[index][1];

      DibujarLineaDirecta(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaDerechaA.length; index++) {
      Punto0.X = EsquinaDerechaA[index][0];
      Punto0.Y = EsquinaDerechaA[index][1];

      Punto1.X = EsquinaDerechaB[index][0];
      Punto1.Y = EsquinaDerechaB[index][1];

      DibujarLineaDirecta(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaIzquierdaA.length; index++) {
      Punto0.X = EsquinaIzquierdaA[index][0];
      Punto0.Y = EsquinaIzquierdaA[index][1];

      Punto1.X = EsquinaIzquierdaB[index][0];
      Punto1.Y = EsquinaIzquierdaB[index][1];

      DibujarLineaDirecta(Punto0, Punto1);
    }
    var endDate = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(`Directo: ${seconds}`);
  }
  function PruebaDDA() {
    var startDate = new Date();
    // //Dibujar verticales
    let Punto0: Punto = new Punto(0, 0);
    let Punto1: Punto = new Punto(0, 0);
    for (let index = 0; index < VerticalesA.length; index++) {
      Punto0.X = VerticalesA[index][0];
      Punto0.Y = VerticalesA[index][1];

      Punto1.X = VerticalesB[index][0];
      Punto1.Y = VerticalesB[index][1];

      DibujarLineaDDA(Punto0, Punto1);
    }
    // //Dibujar Horizaontales
    for (let index = 0; index < HorizontalesA.length; index++) {
      Punto0.X = HorizontalesA[index][0];
      Punto0.Y = HorizontalesA[index][1];

      Punto1.X = HorizontalesB[index][0];
      Punto1.Y = HorizontalesB[index][1];

      DibujarLineaDDA(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaDerechaA.length; index++) {
      Punto0.X = EsquinaDerechaA[index][0];
      Punto0.Y = EsquinaDerechaA[index][1];

      Punto1.X = EsquinaDerechaB[index][0];
      Punto1.Y = EsquinaDerechaB[index][1];

      DibujarLineaDDA(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaIzquierdaA.length; index++) {
      Punto0.X = EsquinaIzquierdaA[index][0];
      Punto0.Y = EsquinaIzquierdaA[index][1];

      Punto1.X = EsquinaIzquierdaB[index][0];
      Punto1.Y = EsquinaIzquierdaB[index][1];

      DibujarLineaDDA(Punto0, Punto1);
    }
    var endDate = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(`DDA: ${seconds}`);
  }
  function PruebaBresenhan() {
    var startDate = new Date();
    // //Dibujar verticales
    let Punto0: Punto = new Punto(0, 0);
    let Punto1: Punto = new Punto(0, 0);
    for (let index = 0; index < VerticalesA.length; index++) {
      Punto0.X = VerticalesA[index][0];
      Punto0.Y = VerticalesA[index][1];

      Punto1.X = VerticalesB[index][0];
      Punto1.Y = VerticalesB[index][1];

      DibujarLineaBresenhan(Punto0, Punto1);
    }
    // //Dibujar Horizaontales
    for (let index = 0; index < HorizontalesA.length; index++) {
      Punto0.X = HorizontalesA[index][0];
      Punto0.Y = HorizontalesA[index][1];

      Punto1.X = HorizontalesB[index][0];
      Punto1.Y = HorizontalesB[index][1];

      DibujarLineaBresenhan(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaDerechaA.length; index++) {
      Punto0.X = EsquinaDerechaA[index][0];
      Punto0.Y = EsquinaDerechaA[index][1];

      Punto1.X = EsquinaDerechaB[index][0];
      Punto1.Y = EsquinaDerechaB[index][1];

      DibujarLineaBresenhan(Punto0, Punto1);
    }

    for (let index = 0; index < EsquinaIzquierdaA.length; index++) {
      Punto0.X = EsquinaIzquierdaA[index][0];
      Punto0.Y = EsquinaIzquierdaA[index][1];

      Punto1.X = EsquinaIzquierdaB[index][0];
      Punto1.Y = EsquinaIzquierdaB[index][1];

      DibujarLineaBresenhan(Punto0, Punto1);
    }
    var endDate = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(`Bresenhan: ${seconds}`);
  }
  PruebaDirecta();
  Limpiar();
  PruebaDDA();
  Limpiar();
  PruebaBresenhan();
  //Dibujar Esquina Derecha
}

//----------------------------Metodos-----------------------------
function MetodoDirecto(Punto0: Punto, Punto1: Punto) {
  let X0: number = Punto0.X,
    Y0: number = Punto0.Y;
  let X1: number = Punto1.X,
    Y1: number = Punto1.Y;

  let Xi: number = X0,
    Xf: number = X1;
  let Yi: number = Y0,
    Yf: number = Y1;

  if (X0 > X1) {
    //console.log("Se invertierosn las cords");
    Xi = X1;
    Xf = X0;

    Yi = Y1;
    Yf = Y0;
  }
  let Pendiente, B, DeltaX, DeltaY;
  DeltaX = X1 - X0;
  DeltaY = Y1 - Y0;

  if (Math.abs(DeltaX) > Math.abs(DeltaY)) {
    // Pendiente < 1
    Pendiente = DeltaY / DeltaX;
    B = Y0 - Pendiente * X0;
    if (DeltaX < 0) {
      DeltaX = -1;
    } else {
      DeltaX = 1;
    }
    while (X0 != X1) {
      X0 += DeltaX;
      Y0 = Math.round(Pendiente * X0 + B);
      DibujarPixel(X0, Y0);
    }
  } else if (DeltaY != 0) {
    // Pendiente >= 1
    Pendiente = DeltaX / DeltaY;
    B = X0 - Pendiente * Y0;
    if (DeltaY < 0) {
      DeltaY = -1;
    } else {
      DeltaY = 1;
    }
    while (Y0 != Y1) {
      Y0 += DeltaY;
      X0 = Math.round(Pendiente * Y0 + B);
      DibujarPixel(X0, Y0);
    }
  }
}
function MetodoDDA(Punto0: Punto, Punto1: Punto) {
  let X0: number = Punto0.X,
    Y0: number = Punto0.Y;
  let X1: number = Punto1.X,
    Y1: number = Punto1.Y;
  //Se calculan las deltas
  let DeltaX = Math.abs(X1 - X0);
  let DeltaY = Math.abs(Y1 - Y0);

  var Pendiente;

  // Se determina si se aplica la formula normal o su forma derivada

  if (DeltaY > DeltaX) {
    //Se calcula la pendioente Inversa
    Pendiente = (X1 - X0) / (Y1 - Y0);
    //se invierte las  cordenadas decuerdo a la condicion
    if (!(Y0 <= Y1)) {
      let AuxiliarX: number = X0;
      let AuxiliarY: number = Y0;
      // En caso de que pase sus valores se intercambian
      Y0 = Y1;
      Y1 = AuxiliarY;

      X0 = X1;
      X1 = AuxiliarX;
    }
    var ValorX: number = X0;

    for (ValorY = Y0; ValorY <= Y1; ValorY++) {
      DibujarPixel(Math.round(ValorX), ValorY);

      ValorX += Pendiente;
    }
  } else {
    //Calcula de la pendiente de manera normal
    Pendiente = (Y1 - Y0) / (X1 - X0);

    // Se calculan las Y
    //se invierte las  cordenadas decuerdo a la condicion
    if (!(X0 <= X1)) {
      var AuxioliarY: number = Y0;
      var AuxiliarX: number = X0;

      X0 = X1;
      X1 = AuxiliarX;

      Y0 = Y1;
      Y1 = AuxioliarY;
    }

    var ValorY: number = Y0;

    for (ValorX = X0; ValorX <= X1; ValorX++) {
      DibujarPixel(ValorX, Math.round(ValorY));

      ValorY += Pendiente;
    }
  }
}

//Algoritmo Bresenham
function MetodoBresenhanA(Punto0: Punto, Punto1: Punto) {
  
  Punto
  let x0:number = Punto0.X,
  y0 = Punto0.Y;
  let x1:number = Punto1.X,
  y1:number = Punto1.Y

  var dx = Math.abs(x1 - x0);
  //console.log("dx = " + dx);
  var dy = Math.abs(y1 - y0);
  //console.log("dy = " + dy);


  // Se saca la diferencia de las x y y
  var sx = (x0 < x1) ? 1 : -1;
  var sy = (y0 < y1) ? 1 : -1;

  // dx -dy
  var err = dx - dy;

  // Mientras los puntos no sean iguales
  while(x0 != x1 || y0 != y1) {

      DibujarPixel(x0, y0);

      // 2(dx - dy)
      var e2 = 2 * err;

      // Dependiendo del valor de e2 se aumentan/reducen las x o y
      if (e2 > -dy){ 
      
          err -= dy; 
          x0 += sx;
      
      }
      
      if (e2 < dx){
          
          err += dx; 
          y0 += sy; 
      
      }

  }
}

//Funcion para dibujar
function DibujarPixel(X: number, Y: number) {
  context.fillStyle = "#197BBD";
  context.fillRect(X, Y, 1, 1);
  context.stroke();
}

function DibujarLineaDDA(Punto0: Punto, Punto1: Punto) {
  // console.log(X0 + " + " + Y0);
  // console.log(X1 + " + " + Y1);

  DibujarPixel(Punto0.X, Punto0.Y);
  MetodoDDA(Punto0, Punto1);
  DibujarPixel(Punto1.X, Punto1.Y);
}

function DibujarLineaDirecta(Punto0: Punto, Punto1: Punto) {
  // console.log(X0 + " + " + Y0);
  // console.log(X1 + " + " + Y1);
  DibujarPixel(Punto0.X, Punto0.Y);
  MetodoDirecto(Punto0, Punto1);

  DibujarPixel(Punto1.X, Punto1.Y);
}
function DibujarLineaBresenhan(Punto0: Punto, Punto1: Punto) {
  console.log(`(${Punto0.X} ${Punto0.Y})---------(${Punto1.X} ${Punto1.Y})`);
  DibujarPixel(Punto0.X, Punto0.Y);

  MetodoBresenhanA(Punto0, Punto1);

  DibujarPixel(Punto1.X, Punto1.Y);
}
function DrawCirle(PuntoMedio: Punto, Radio: number) {
  let X0: number = PuntoMedio.X,
    Y0: number = PuntoMedio.Y;

  let X: number = Radio;
  let Y = 0;
  let radiusError = 1 - X;

  while (X >= Y) {
    DibujarPixel(X + X0, Y + Y0);
    DibujarPixel(Y + X0, X + Y0);
    DibujarPixel(-X + X0, Y + Y0);
    DibujarPixel(-Y + X0, X + Y0);
    DibujarPixel(-X + X0, -Y + Y0);
    DibujarPixel(-Y + X0, -X + Y0);
    DibujarPixel(X + X0, -Y + Y0);
    DibujarPixel(Y + X0, -X + Y0);
    Y++;

    if (radiusError < 0) {
      radiusError += 2 * Y + 1;
    } else {
      X--;
      radiusError += 2 * (Y - X + 1);
    }
  }
}

function drawPoligon(
  Punto0: Punto,
  Punto1: Punto,
  Radio: number,
  lados: number
) {
  let x0: number = Punto0.X,
      y0: number = Punto0.Y;
  let y1: number = Punto1.Y;

  let PuntoAnterior: Punto = new Punto(0, 0);
  let PuntoAux: Punto = new Punto(0, 0);
  console.log(NLados);
  console.log("Paso 1");

  // var radio = x1 - x0;
  let DeltaY: number = y1 - y0;

  let x:number = Radio * Math.cos((Math.PI / 180) * 0) + x0;
  let y:number = DeltaY * Math.sin((Math.PI / 180) * 0) + y0;
  console.log("Paso 2");
  
  PuntoAnterior = new Punto(x, y);
  PuntoAnterior.Redondear();
  
  let PrimerPunto:Punto = PuntoAnterior;
  PrimerPunto.Redondear(); 

  for (let index: number = 0; index <= 360; index +=( 360 / lados)) {
    x = Radio * Math.cos((Math.PI / 180) * index) + x0;
    y = DeltaY * Math.sin((Math.PI / 180) * index) + y0;
    PuntoAux = new Punto(x, y);
    PuntoAux.Redondear();
   
    DibujarLineaBresenhan(PuntoAnterior, PuntoAux);
   
    PuntoAnterior =PuntoAux;
    
  }

  DibujarLineaBresenhan(PuntoAux, PrimerPunto);
}
// var PuntoAux=new Punto(0,0);
// var PuntoAux2=new Punto(500,500);
// DibujarPixel(midpoint(PuntoAux,PuntoAux2).X,midpoint(PuntoAux,PuntoAux2).Y);

// DibujarLineaBresenhan(midpoint(PuntoAux,PuntoAux2),PuntoAux2);
//   DrawCirle(midpoint(PuntoAux,PuntoAux2),Distancia(midpoint(PuntoAux,PuntoAux2),PuntoAux2));
function Limpiar() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
