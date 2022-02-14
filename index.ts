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
}

//Variables Gobales
let Seleccion: string = "Directo";
let inicialX: number, inicialY: number;
let finalX: number, finalY: number;

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
//ALgoritmos
function Selector(Metodo: string, Punto0: Punto, Punto1: Punto) {
  let FuncionMetodo;
  switch (Metodo) {
    case "DDA":
      console.log("Entro DDA");
      //Las validaciones sobre las coordenas ocurren dentro la funcion
      FuncionMetodo = DibujarLineaDDA;
      break;
    case "Bresenhan":
      console.log("Entro Bresenhan");
      FuncionMetodo = DibujarLineaBresenhan;
      // DibujarLineaBresenhan(
      //   Math.round(X0),
      //   Math.round(Y0),
      //   Math.round(X1),
      //   Math.round(Y1)
      // );
      break;
    default:
      console.log("Entro Directo");
      FuncionMetodo = DibujarLineaDirecta;
      // DibujarLineaDirecta(
      //   Math.round(X0),
      //   Math.round(Y0),
      //   Math.round(X1),
      //   Math.round(Y1)
      // );
      break;
  }
  FuncionMetodo(Punto0, Punto1);
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
  let X0: number = Punto0.X,
    Y0: number = Punto0.Y;
  let X1: number = Punto1.X,
    Y1: number = Punto1.Y;

  let DeltaX: number = X1 - X0,
    DeltaY: number = Y1 - Y0;
  let Pk: number = 0,
    Pk1: number = 0,
    Pk2: number = 0;
  let stepX: number = 0,
    stepY: number = 0;
  // Se definen comom se daran los saltos de coordenas
  if (DeltaY < 0) {
    DeltaY = -DeltaY;
    stepY = -1;
  } else {
    stepY = 1;
  }

  if (DeltaX < 0) {
    DeltaX = -DeltaX;
    stepX = -1;
  } else {
    stepX = 1;
  }

  let Punto: number = 0;

  if (DeltaX > DeltaY) {
    Pk = 2 * DeltaY - DeltaX;
    Pk1 = 2 * DeltaY;
    Pk2 = 2 * (DeltaY - DeltaX);
    while (X0 != X1) {
      Punto++;
      X0 = X0 + stepX;
      if (Pk < 0) {
        Pk = Pk + Pk1;
      } else {
        Y0 = Y0 + stepY;
        Pk = Pk + Pk2;
      }
      DibujarPixel(X0, Y0);
    }
  } else {
    Pk = 2 * DeltaX - DeltaY;
    Pk1 = 2 * DeltaX;
    Pk2 = 2 * (DeltaX - DeltaY);
    while (Y0 != Y1) {
      Punto++;
      Y0 = Y0 + stepY;
      if (Pk < 0) {
        Pk = Pk + Pk1;
      } else {
        X0 = X0 + stepX;
        Pk = Pk + Pk2;
      }
      DibujarPixel(X0, Y0);
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
  // console.log(X0 + " + " + Y0);
  // console.log(X1 + " + " + Y1);
  DibujarPixel(Punto0.X, Punto0.Y);

  MetodoBresenhanA(Punto0, Punto1);

  DibujarPixel(Punto1.X, Punto1.Y);
}
 function DrawCirle (PuntoMedio:Punto, Radio:number) {
  let X0:number=PuntoMedio.X, Y0:number=PuntoMedio.X;

  let X:number = Radio;
  let Y = 0;
  let radiusError = 1 - X;
  
  while (X >= Y) {
    DibujarPixel((X + X0), (Y + Y0));
    DibujarPixel((Y + X0), (X + Y0));
    DibujarPixel((-X + X0), (Y + Y0));
    DibujarPixel((-Y + X0), (X + Y0));
    DibujarPixel((-X + X0), (-Y + Y0));
    DibujarPixel((-Y + X0), (-X + Y0));
    DibujarPixel((X + X0), (-Y + Y0));
    DibujarPixel((Y + X0), (-X + Y0));
    Y++;
    
    if (radiusError < 0) {
        radiusError += 2 * Y + 1;
    }
    else {
        X--;
        radiusError+= 2 * (Y - X + 1);
    }
  }
};

var PuntoAux=new Punto(500,500);
DrawCirle(PuntoAux,50);
function Limpiar() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
