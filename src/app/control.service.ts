import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Command} from './command.enum';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private origin = 'http://192.168.0.48:13579';
  private controlRoute = '/command.html';
  private controlUrl = this.origin + this.controlRoute;

  constructor(private http: HttpClient) {
  }

  private getRequestBody(command: Command): HttpParams {
    return new HttpParams().set('wm_command', command);
  }

  do(command: Command): Observable<any> {
    return this.http.post<any>(this.controlUrl, this.getRequestBody(command));
  }

}
