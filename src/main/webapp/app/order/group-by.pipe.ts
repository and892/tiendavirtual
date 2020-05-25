/* eslint-disable @typescript-eslint/tslint/config */
import { Pipe, PipeTransform } from '@angular/core';
// import {IProducto} from './../shared/model/producto.model'
@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {


  transform (products:any){
    const mapProduct = products.map( (product:any ) => product.id );

    const uniqueProducts = products.filter( (item: any,index: any,array: any) =>{

      const trueIndex = mapProduct.indexOf(item.id);

      if(trueIndex === index){
        item.quantity=1;
        return true;

      }else{

        array[trueIndex].quantity!++;
        return false;
      }

    });

    return uniqueProducts;
  }
  // transform(objectos: any[], id: string): any {

    //   const countedObjects: object[] = [];

    //   for(const objeto of objectos){
    //     const contador: any = countedObjects.find(obj => obj[id] === objeto[id]);

    //     if (contador) {
    //       contador.count++;
    //       Object.defineProperty(objeto, "contador", {value: contador})
    //       console.warn(objectos)
    //     }else{
    //       countedObjects.push({...objeto, count: 1});
    //     }

    //   }

    //   return countedObjects;
    // }
}
