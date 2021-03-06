import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {isNumeric} from 'rxjs/internal-compatibility';

import {LocalStorageService} from '../services/local-storage.service';
import {AppTheme} from '../app-theme.enum';
import {Layout} from '../layout.enum';
import {ThemeApplierService} from '../services/theme-applier.service';

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

  appTheme = AppTheme;
  layout = Layout;

  constructor(private localStorageService: LocalStorageService,
              private themeApplierService: ThemeApplierService,
              private router: Router) {
  }

  ngOnInit() {
    const host = this.localStorageService.getHost();
    const layout = this.localStorageService.getLayout();
    const theme = this.localStorageService.getTheme();

    this.hostExists = host != null;

    this.settingsForm = new FormGroup({
      host: new FormControl(host, [hostValidator]),
      layout: new FormControl(layout),
      theme: new FormControl(theme)
    });
  }

  save() {
    this.localStorageService.setHost(this.settingsForm.get('host').value);
    this.localStorageService.setLayout(this.settingsForm.get('layout').value);
    this.localStorageService.setTheme(this.settingsForm.get('theme').value);
    this.themeApplierService.apply();
    this.router.navigateByUrl('/');
  }

}
