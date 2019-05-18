import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Command} from '../command.enum';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private readonly protocol = 'http://';
  private readonly controlRoute = '/command.html';

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  private getRequestBody(command: Command): HttpParams {
    return new HttpParams().set('wm_command', command);
  }

  do(command: Command): Observable<any> {
    const url = this.protocol + this.localStorageService.getHost() + this.controlRoute;
    return this.http.post<any>(url, this.getRequestBody(command));
  }

}
