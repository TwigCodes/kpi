import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';

import * as fundebug from 'fundebug-javascript';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { environment } from '@env/environment';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

fundebug.apikey = environment.fundbugApiKey;

// 定义FundebugErrorHandler
export class FundebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
  }
}

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // universal
    BrowserModule.withServerTransition({ appId: 'nwcdkpi' }),
    TransferHttpCacheModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: ErrorHandler, useClass: FundebugErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}
