//TODO:Validar cuando solo se dibuja un punto
let canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;
let rect: DOMRect = canvas.getBoundingClientRect();

class Punto {
  public X: number;
  public Y: number;
  constructor(X1: number, Y1: number) {
    this.X = Math.round(X1);
    this.Y = Math.round(Y1);
  }
}
let CoordInicial: Punto = new Punto(0, 0);
let CoordFinal: Punto = new Punto(0, 0);
// let inicialX: number, inicialY: number;
// let finalX: number, finalY: number;

let Seleccion: string = "Directo";
//-----------------------Botonoes--------------------------
canvas.addEventListener("mousedown", function (e) {
  context = canvas.getContext("2d") as CanvasRenderingContext2D;
  rect = canvas.getBoundingClientRect();
  CoordInicial.X = Math.round(e.clientX - rect.left);
  CoordInicial.Y = Math.round(e.clientY - rect.top);
  console.log(`Coordenada 1: ${CoordInicial}`);
});
canvas.addEventListener("mouseup", function (e) {
  context = canvas.getContext("2d") as CanvasRenderingContext2D;
  rect = canvas.getBoundingClientRect();
  CoordFinal.X = Math.round(e.clientX - rect.left);
  CoordFinal.Y = Math.round(e.clientY - rect.top);

  console.log(`Coordenada 2: ${CoordFinal}`);
  Selector(Seleccion, CoordInicial, CoordInicial);
});
function handleTool(X: any) {
  console.log(X.value);
  Seleccion = X.value;
}
//ALgoritmos
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts
function Selector(Metodo: string, Coordnada0: Punto, Coordnada1: Punto) {
  let X0: number = Coordnada0.X,
    Y0: number = Coordnada0.Y;
  let X1: number = Coordnada1.X,
    Y1: number = Coordnada1.Y;
=======
function Selector(
  Metodo: string,
  X0: number,
  Y0: number,
  X1: number,
  Y1: number
) {
  let Xi: number = X0,
    Xf: number = X1;
  let Yi: number = Y0,
    Yf: number = Y1;

<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
=======
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
  switch (Metodo) {
    case "DDA":
      console.log("Entro DDA");
      //Las validaciones sobre las coordenas ocurren dentro la funcion
      DibujarLineaDDA(
        Math.round(X0),
        Math.round(Y0),
        Math.round(X1),
        Math.round(Y1)
      );
      break;
    case "Bresenhan":
      console.log("Entro Bresenhan");
      DibujarLineaBresenhan(Coordnada0, Coordnada1);
      break;
    default:
      console.log("Entro Directo");
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts

=======
=======
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
      if (X0 > X1) {
        console.log("Se invertierosn las cords");
        Xi = X1;
        Xf = X0;

        Yi = Y1;
        Yf = Y0;
      }
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
=======
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
      DibujarLineaDirecta(
        Math.round(Xi),
        Math.round(Yi),
        Math.round(Xf),
        Math.round(Yf)
      );
      break;
  }
}
//----------------------------Metodos-----------------------------
function MetodoDirecto(X0: number, Y0: number, X1: number, Y1: number) {
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
function MetodoDDA(X0: number, Y0: number, X1: number, Y1: number) {
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
function MetodoBresenhan(CoordenadaInicial: Punto, CoordenadaFinal: Punto) {
  let X0: number = CoordenadaInicial.X;
  let Y0: number = CoordenadaInicial.Y;

  let X1: number = CoordenadaFinal.X;
  let Y1: number = CoordenadaFinal.Y;
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

//Funcion para dibujar un solo pixel
function DibujarPixel(X: number, Y: number) {
  context.fillStyle = "#197BBD";
  context.fillRect(X, Y, 3, 3);
  context.stroke();
}

function DibujarLineaDDA(X0: number, Y0: number, X1: number, Y1: number) {
  console.log(X0 + " + " + Y0);
  console.log(X1 + " + " + Y1);

  DibujarPixel(X0, Y0);
  MetodoDDA(X0, Y0, X1, Y1);
  DibujarPixel(X1, Y1);
}

function DibujarLineaDirecta(X0: number, Y0: number, X1: number, Y1: number) {
  console.log(X0 + " + " + Y0);
  console.log(X1 + " + " + Y1);
  DibujarPixel(X0, Y0);
  MetodoDirecto(X0, Y0, X1, Y1);

  DibujarPixel(X1, Y1);
}
function DibujarLineaBresenhan(Coordnada0: Punto, Coordnada1: Punto) {
  console.log(Coordnada0.X + " + " + Coordnada0.Y);
  console.log(Coordnada1.X + " + " + Coordnada1.Y);
  DibujarPixel(Coordnada0.X, Coordnada0.Y);
  MetodoBresenhan(CoordInicial, CoordFinal);

  DibujarPixel(Coordnada1.X, Coordnada1.Y);
}
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts
<<<<<<< HEAD:AlgoritmosDeLinea/Funciones.ts

function Limpiar() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
=======
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
=======
>>>>>>> parent of e9a546f (Revisado y liberado):Funciones.ts
