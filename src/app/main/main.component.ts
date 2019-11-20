import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

import {Command} from '../command.enum';
import {ControlService} from '../services/control.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Layout} from '../layout.enum';
import {AppTheme} from '../app-theme.type';
import {ThemeApplierService} from '../services/theme-applier.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  command = Command;
  layout = Layout;

  appTheme: AppTheme;
  currentLayout: Layout;

  constructor(private controlService: ControlService,
              private localStorageService: LocalStorageService,
              private themeApplierService: ThemeApplierService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    if (this.localStorageService.getHost() == null) {
      this.router.navigateByUrl('/settings');
      return;
    }

    this.currentLayout = this.localStorageService.getLayout();
    this.appTheme = this.localStorageService.getTheme();
  }

  do(command: Command): void {
    this.controlService.do(command).subscribe();
  }

  switchLayout() {
    this.currentLayout = this.currentLayout === Layout.Classic ? Layout.Stretch : Layout.Classic;
    this.localStorageService.setLayout(this.currentLayout);
  }

  switchTheme() {
    this.appTheme = this.appTheme === 'default-theme' ? 'dark-theme' : 'default-theme';
    this.localStorageService.setTheme(this.appTheme);
    this.themeApplierService.apply();
  }

}
