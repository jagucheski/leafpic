import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerLog} from './server-log';
import {environment} from '../../../environments/environment';

const API_LOG_URL = environment.API_LOG_URL;

@Injectable({providedIn: 'root'})
export class ServerLogService {

  constructor(private http: HttpClient) {
  }

  log(serverLog: ServerLog) {
    return this.http.post(API_LOG_URL + '/infra/log', serverLog);
  }
}
