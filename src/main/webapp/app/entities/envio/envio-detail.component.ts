import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnvio } from 'app/shared/model/envio.model';

@Component({
  selector: 'jhi-envio-detail',
  templateUrl: './envio-detail.component.html'
})
export class EnvioDetailComponent implements OnInit {
  envio: IEnvio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ envio }) => (this.envio = envio));
  }

  previousState(): void {
    window.history.back();
  }
}
