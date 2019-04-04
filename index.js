const { of, throwError } = require("rxjs");
const { map, mergeMap, catchError, finalize } = require("rxjs/operators");

let source$ = of(1, 2, 3);

source$ = source$.pipe(
  map(x => {
    if (x == 2) {
      return throwError("Soy un error lanzado concientemente");
    } else {
      return of(x);
    }
  }),
  mergeMap(x => x),
  catchError(err => {
    throw "Me ejecuto cuando hay error";
  }),
  finalize(_ => {
    console.log("Me ejecuto siempre");
  })
);

source$.subscribe(
  x => console.log(x),
  err => console.log(err),
  () => console.log("completo")
);
