import {  Punto,DibujarPixel,DibujarLineaBresenhan} from "../Funciones/Metodos";

  let canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  let context: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  let rect: DOMRect = canvas.getBoundingClientRect();
  
  
  let CoordInicial: Punto = new Punto(0, 0);
  let CoordFinal: Punto = new Punto(0, 0);
 
  
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
  function Selector(Metodo: string, Coordnada0: Punto, Coordnada1: Punto) {
    let X0: number = Coordnada0.X,
      Y0: number = Coordnada0.Y;
    let X1: number = Coordnada1.X,
      Y1: number = Coordnada1.Y;
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
        DibujarLineaBresenhan(context,Coordnada0, Coordnada1);
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
        DibujarPixel(context,X0, Y0);
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
        DibujarPixel(context,X0, Y0);
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
        DibujarPixel(context,Math.round(ValorX), ValorY);
  
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
        DibujarPixel(context,ValorX, Math.round(ValorY));
  
        ValorY += Pendiente;
      }
    }
  }
  
  //Algoritmo Bresenham
  
  
  //Funcion para dibujar un solo pixel
  
  
  function DibujarLineaDDA(X0: number, Y0: number, X1: number, Y1: number) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
  
    DibujarPixel(context,X0, Y0);
    MetodoDDA(X0, Y0, X1, Y1);
    DibujarPixel(context,X1, Y1);
  }
  
  function DibujarLineaDirecta(X0: number, Y0: number, X1: number, Y1: number) {
    console.log(X0 + " + " + Y0);
    console.log(X1 + " + " + Y1);
    DibujarPixel(context,X0, Y0);
    MetodoDirecto(X0, Y0, X1, Y1);
  
    DibujarPixel(context,X1, Y1);
  }
  
  function Limpiar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  

