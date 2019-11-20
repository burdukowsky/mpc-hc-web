import {Component, OnInit} from '@angular/core';

import {ThemeApplierService} from './services/theme-applier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private themeApplierService: ThemeApplierService) {
  }

  ngOnInit() {
    this.themeApplierService.apply();
  }

}
