import {Component} from '@angular/core';
import {Command} from '../command.enum';
import {ControlService} from '../control.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  command = Command;

  constructor(private controlService: ControlService) {
  }

  do(command: Command): void {
    this.controlService.do(command).subscribe();
  }

}
