import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {SettingsComponent} from './settings/settings.component';
import {LocalStorageService} from './services/local-storage.service';

export function LocalStorageServiceFactory(localStorageService: LocalStorageService): () => Promise<any> {
  return () => localStorageService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: LocalStorageServiceFactory,
      deps: [LocalStorageService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
