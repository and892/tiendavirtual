import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import {LayoutUserService  } from './../layout-user/layout-user.service';

import {IProducto } from './../shared/model/producto.model';
import {ProductoCategoria  } from './../shared/model/producto-categoria.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  productos: IProducto[] = [];
  categorias: ProductoCategoria[] = [];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private layoutUserService: LayoutUserService
    ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.fetchData();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  fetchData(): void{
    this.layoutUserService.getAllProductos()
    .subscribe((data: any) => {
      this.productos = data;
    })
    this.layoutUserService.getAllCategorias()
    .subscribe((data:any) => {
      this.categorias = data;
      // console.warn(this.categorias)
    })
  }
}
