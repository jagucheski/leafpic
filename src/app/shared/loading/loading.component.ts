import {Component, OnInit} from '@angular/core';
import {LoadingService} from './loading.service';
import {Observable} from 'rxjs';
import {LoadingType} from './loading.type';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ap-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    /* O 'loadingService.getLoading' irá trazer o enum loadingType,
       utilizamos o 'map' para extrair o valor do enum, assim trara somente: 'loading' ou 'stopped'*/
    this.loading$ = this.loadingService
      .getLoading()
      .pipe(map(loadingType => loadingType.valueOf()));
  }

}
