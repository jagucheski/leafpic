import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoadingComponent} from './loading.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from '../../core/auth/request.interceptor';

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }]
})
export class LoadingModule {
}
