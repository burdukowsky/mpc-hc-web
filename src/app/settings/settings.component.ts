import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {isNumeric} from 'rxjs/internal-compatibility';

import {LocalStorageService} from '../services/local-storage.service';

function validateNum(input: string, min: number, max: number): boolean {
  const num = Number(input);
  return isNumeric(input) && num >= min && num <= max;
}

function hostValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const invalidObject = {host: true};

  if (control.value == null) {
    return invalidObject;
  }

  const parts = control.value.split(':');
  const ip = parts[0].split('.');
  const port = parts[1];
  const valid = validateNum(port, 1, 65535) &&
    ip.length === 4 &&
    ip.every(segment => validateNum(segment, 0, 255));

  return valid ? null : invalidObject;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hostExists: boolean;
  settingsForm: FormGroup;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    const host = this.localStorageService.getHost();
    this.hostExists = host != null;
    this.settingsForm = new FormGroup({
      host: new FormControl(host, [hostValidator])
    });
  }

  save() {
    this.localStorageService.setHost(this.settingsForm.get('host').value);
    this.router.navigateByUrl('/');
  }

}
