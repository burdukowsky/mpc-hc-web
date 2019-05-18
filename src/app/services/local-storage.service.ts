import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly keys = {
    host: 'host'
  };

  constructor() {
  }

  getHost(): string {
    return localStorage.getItem(this.keys.host);
  }

  setHost(newHost: string) {
    localStorage.setItem(this.keys.host, newHost);
  }

}
