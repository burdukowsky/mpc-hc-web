import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Command} from '../command.enum';
import {ControlService} from '../services/control.service';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  command = Command;

  constructor(private controlService: ControlService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.localStorageService.getHost() == null) {
      this.router.navigateByUrl('/settings');
    }
  }

  do(command: Command): void {
    this.controlService.do(command).subscribe();
  }

}
