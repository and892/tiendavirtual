import { Pipe, PipeTransform } from '@angular/core';
// import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(products: any, arg:any): any {
    if(arg === '' || arg.lenght < 3) return products;

    const resultadoProductos = [];
    for (const product of products) {
      if (product.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoProductos.push(product);
      }
    }
    return resultadoProductos;
  }

}
