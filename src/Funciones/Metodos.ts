export  class Punto {
  public X: number;
  public Y: number;
  constructor(X1: number, Y1: number) {
    this.X = Math.round(X1);
    this.Y = Math.round(Y1);
  }
}

export function DibujarPixel(
  ctxt: CanvasRenderingContext2D,
  X: number,
  Y: number
) {
  ctxt.fillStyle = "#197BBD";
  ctxt.fillRect(X, Y, 3, 3);
  ctxt.stroke();
}

export function MetodoBresenhan(ctxt: CanvasRenderingContext2D,CoordenadaInicial: Punto, CoordenadaFinal: Punto) {
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
        DibujarPixel(ctxt,X0, Y0);
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
        DibujarPixel(ctxt,X0, Y0);
      }
    }
  }

 export function DibujarLineaBresenhan(context: CanvasRenderingContext2D,Coordnada0: Punto, Coordnada1: Punto) {
    console.log(Coordnada0.X + " + " + Coordnada0.Y);
    console.log(Coordnada1.X + " + " + Coordnada1.Y);
    DibujarPixel(context,Coordnada0.X, Coordnada0.Y);
    MetodoBresenhan(context,Coordnada0, Coordnada1);
  
    DibujarPixel(context,Coordnada1.X, Coordnada1.Y);
 }