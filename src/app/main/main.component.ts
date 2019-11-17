import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

import {Command} from '../command.enum';
import {ControlService} from '../services/control.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Layout} from '../layout.enum';

export type AppTheme = 'default-theme' | 'dark-theme';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  command = Command;
  layout = Layout;
  appTheme: AppTheme = 'dark-theme';

  currentLayout = Layout.Stretch;

  constructor(private controlService: ControlService,
              private localStorageService: LocalStorageService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    if (this.localStorageService.getHost() == null) {
      this.router.navigateByUrl('/settings');
    }
  }

  do(command: Command): void {
    this.controlService.do(command).subscribe();
  }

  switchLayout() {
    this.currentLayout = this.currentLayout === Layout.Classic ? Layout.Stretch : Layout.Classic;
  }

  switchTheme() {
    this.appTheme = this.appTheme === 'default-theme' ? 'dark-theme' : 'default-theme';
    this.document.body.className = this.appTheme;
  }

}
