import {Injectable} from '@angular/core';

import {isLayout, Layout} from '../layout.enum';
import {AppTheme, isAppTheme} from '../app-theme.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly keys = {
    host: 'host',
    theme: 'theme',
    layout: 'layout'
  };

  init(): Promise<any> {
    return new Promise(resolve => {
      if (this.getTheme() == null) {
        this.setTheme(AppTheme.Dark);
      }
      if (this.getLayout() == null) {
        this.setLayout(Layout.Stretch);
      }
      resolve();
    });
  }

  getHost(): string {
    return localStorage.getItem(this.keys.host);
  }

  setHost(newHost: string) {
    localStorage.setItem(this.keys.host, newHost);
  }

  getTheme(): AppTheme | undefined {
    const localStorageValue = localStorage.getItem(this.keys.theme);
    if (isAppTheme(localStorageValue)) {
      return localStorageValue;
    }
  }

  setTheme(newTheme: AppTheme) {
    localStorage.setItem(this.keys.theme, newTheme);
  }

  getLayout(): Layout | undefined {
    const localStorageValue = localStorage.getItem(this.keys.layout);
    if (isLayout(localStorageValue)) {
      return localStorageValue;
    }
  }

  setLayout(newLayout: Layout) {
    localStorage.setItem(this.keys.layout, newLayout);
  }

}
