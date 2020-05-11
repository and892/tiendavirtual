import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.TiendavirtualProductoModule)
      },
      {
        path: 'producto-categoria',
        loadChildren: () => import('./producto-categoria/producto-categoria.module').then(m => m.TiendavirtualProductoCategoriaModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.TiendavirtualStockModule)
      },
      {
        path: 'sucursal',
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.TiendavirtualSucursalModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.TiendavirtualClienteModule)
      },
      {
        path: 'pedido',
        loadChildren: () => import('./pedido/pedido.module').then(m => m.TiendavirtualPedidoModule)
      },
      {
        path: 'producto-pedido',
        loadChildren: () => import('./producto-pedido/producto-pedido.module').then(m => m.TiendavirtualProductoPedidoModule)
      },
      {
        path: 'factura',
        loadChildren: () => import('./factura/factura.module').then(m => m.TiendavirtualFacturaModule)
      },
      {
        path: 'envio',
        loadChildren: () => import('./envio/envio.module').then(m => m.TiendavirtualEnvioModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TiendavirtualEntityModule {}
