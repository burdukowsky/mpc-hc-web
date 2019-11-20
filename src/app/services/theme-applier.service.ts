import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeApplierService {

  constructor(@Inject(DOCUMENT) private document: Document,
              private localStorageService: LocalStorageService) {
  }

  apply() {
    const theme = this.localStorageService.getTheme();
    if (theme) {
      this.document.body.className = theme;
      return;
    }
    console.warn('Theme not defined in localStorage!');
  }

}
