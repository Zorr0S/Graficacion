//TODO:Validar cuando solo se dibuja un punto
let canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
let context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;
let rect: DOMRect = canvas.getBoundingClientRect();

let inicialX: number, inicialY: number;
let finalX: number, finalY: number;

let Seleccion: string = "Directo";
//-----------------------Botonoes--------------------------
canvas.addEventListener("mousedown", function (e) {
  inicialX = e.clientX - rect.left;
  inicialY = e.clientY - rect.top;
  console.log(`Coordenada 1: ${inicialX}, ${inicialY}`);
});
canvas.addEventListener("mouseup", function (e) {
  finalX = e.clientX - rect.left;
  finalY = e.clientY - rect.top;

  console.log(`Coordenada 2: ${finalX}, ${finalY}`);
  Selector(Seleccion, inicialX, inicialY, finalX, finalY);
});
function handleTool(X: any) {
  console.log(X.value);
  Seleccion = X.value;
}
//ALgoritmos
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
  

  switch (Metodo) {
    case "DDA":
      console.log("Entro DDA");
      if (!(Y0 <= Y1)) {
          let AuxiliarX: number = X0;
          let AuxiliarY: number = Y0;
          // En caso de que pase sus valores se intercambian
          Y0 = Y1;
          Y1 = AuxiliarY;
    
          X0 = X1;
          X1 = AuxiliarX;
        }
      DibujarLineaDDA(
        Math.round(X0),
        Math.round(Y0),
        Math.round(X1),
        Math.round(Y1)
      );
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
      DibujarLineaDirecta(
        Math.round(Xi),
        Math.round(Yi),
        Math.round(Xf),
        Math.round(Yf)
      );
      break;
  }
}
//----------------------------Metodos
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
  let DeltaX = Math.abs(X1 - X0);
  let DeltaY = Math.abs(Y1 - Y0);

  var Pendiente;

  // Cambiar puntos aqui, no antes

  if (DeltaY > DeltaX) {
    Pendiente = (X1 - X0) / (Y1 - Y0);

    // Se calculan las X
    // Se debe saber si y0 es mayor a y1, porque si esto pasa nunca entrara al ciclo for
    // if (!(Y0 <= Y1)) {
    //   let AuxiliarX: number = X0;
    //   let AuxiliarY: number = Y0;
    //   // En caso de que pase sus valores se intercambian
    //   Y0 = Y1;
    //   Y1 = AuxiliarY;

    //   X0 = X1;
    //   X1 = AuxiliarX;
    // }

    var ValorX = X0;

    for (ValorY = Y0; ValorY <= Y1; ValorY++) {
      DibujarPixel(Math.round(ValorX), ValorY);

      ValorX += Pendiente;
    }
  } else {
    Pendiente = (Y1 - Y0) / (X1 - X0);

    // Se calculan las Y
    // Se debe saber si x0 es mayor a x1, porque si esto pasa nunca entrara al ciclo for
    if (!(X0 <= X1)) {
      var AuxioliarY: number = Y0;
      var AuxiliarX: number = X0;
      // En caso de que pase sus valores se intercambian
      X0 = X1;
      X1 = AuxiliarX;

      Y0 = Y1;
      Y1 = AuxioliarY;
    }

    var ValorY = Y0;

    for (ValorX = X0; ValorX <= X1; ValorX++) {
      DibujarPixel(ValorX, Math.round(ValorY));

      ValorY += Pendiente;
    }
  }
}
function MetodoBresenHan(X0: number, Y0: number, x1: number, y1: number) {
  let DeltaX = Math.abs(x1 - X0);
  let DeltaY = Math.abs(y1 - Y0);
  let sx = X0 < x1 ? 1 : -1;
  let sy = Y0 < y1 ? 1 : -1;
  let err = DeltaX - DeltaY;

  while (true) {
    DibujarPixel(X0, Y0);

    if (X0 === x1 && Y0 === y1) break;
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
