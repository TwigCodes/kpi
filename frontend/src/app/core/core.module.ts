import {
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler,
  Injector,
  PLATFORM_ID,
  LOCALE_ID
} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatIconRegistry, MatPaginatorIntl } from '@angular/material';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '@env/environment';

import { httpInterceptorProviders } from './http-interceptors';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import { reducers, getMetaReducers } from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { NotificationService } from './notifications/notification.service';
import { loadIconResources } from './util/icon.util';
import { MatPaginatorIntlCn } from './mat-helpers/mat-paginator-intl-cn';
import localeZhHans from '@angular/common/locales/zh-Hans';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter'
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [
    NotificationService,
    {
      provide: LocalStorageService,
      useClass: LocalStorageService,
      deps: [Injector, PLATFORM_ID]
    },
    {
      provide: META_REDUCERS,
      deps: [LocalStorageService],
      useFactory: getMetaReducers
    },
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCn },
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    AuthGuardService,
    AnimationsService,
    httpInterceptorProviders,
    TitleService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    loadIconResources(ir, ds);
    registerLocaleData(localeZhHans);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
