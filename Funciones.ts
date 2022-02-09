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
      DibujarLineaBresenhan(
        Math.round(X0),
        Math.round(Y0),
        Math.round(X1),
        Math.round(Y1)
      );
      break;
    default:
      console.log("Entro Directo");

      DibujarLineaDirecta(
        Math.round(X0),
        Math.round(Y0),
        Math.round(X1),
        Math.round(Y1)
      );
      break;
  }
}
//----------------------------Pruebas-----------------------
function Prueba() {
  var VerticalesA = new Array();
  var VerticalesB = new Array();
  var HorizontalesA = new Array();
  var HorizontalesB = new Array();

  var EsquinaDerechaA = new Array();
  var EsquinaDerechaB = new Array();
  for (let i: number = 0; i <= 1000; i += 2) {
    VerticalesA.push([i, 0]);
    VerticalesB.push([i, 1000]);
  }
  for (let i: number = 0; i <= 1000; i += 2) {
    HorizontalesA.push([0, i]);
    HorizontalesB.push([1000, i]);
  }
  
  
  for (let i: number = 0; i <= VerticalesA.length; i++) {
    
    EsquinaDerechaA.push(VerticalesA);
    EsquinaDerechaB.push([1000,VerticalesB[i][1]]);
  }
  // //Dibujar verticales
  // for (let index = 0; index < VerticalesA.length; index++) {
  //   DibujarLineaBresenhan(
  //     VerticalesA[index][0],
  //     VerticalesA[index][1],
  //     VerticalesB[index][0],
  //     VerticalesB[index][1]
  //   );
  // }
  // //Dibujar Horizaontales
  // for (let index = 0; index < HorizontalesA.length; index++) {
  //   DibujarLineaBresenhan(
  //     HorizontalesA[index][0],
  //     HorizontalesA[index][1],
  //     HorizontalesB[index][0],
  //     HorizontalesB[index][1]
  //   );
  // }

  for (let index = 0; index < VerticalesA.length; index++) {
    DibujarLineaBresenhan(
      VerticalesA[index][0], //X0
      VerticalesA[index][1], //Y0
      HorizontalesB[index][0], //X1
      HorizontalesB[index][1]  //Y1
      
     );
  }
 
  //Dibujar Esquina Derecha
}

//----------------------------Metodos-----------------------------
function MetodoDirecto(X0: number, Y0: number, X1: number, Y1: number) {
  let Xi: number = X0,
    Xf: number = X1;
  let Yi: number = Y0,
    Yf: number = Y1;

  if (X0 > X1) {
    console.log("Se invertierosn las cords");
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
function MetodoBresenhanA(X0: number, Y0: number, X1: number, Y1: number) {
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
  context.fillRect(X, Y, 1, 1);
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
function DibujarLineaBresenhan(X0: number, Y0: number, X1: number, Y1: number) {
   console.log(X0 + " + " + Y0);
   console.log(X1 + " + " + Y1);
  DibujarPixel(X0, Y0);
  MetodoBresenhanA(X0, Y0, X1, Y1);

  DibujarPixel(X1, Y1);
}

function Limpiar() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
