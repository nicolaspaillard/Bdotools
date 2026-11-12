import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import Aura from '@openng/optimus-ui-themes/aura';
import { provideOptimus } from '@openng/optimus-ui/config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideOptimus({
      theme: { preset: Aura },
      ripple: true,
      overlayAppendTo: 'body',
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    // provideAppCheck(() =>
    // initializeAppCheck(getApp(), {
    // provider: new ReCaptchaEnterpriseProvider("6Lcwe_kqAAAAAA9b5kizgsjvlZNp1_stQSEc5iSs"),
    // isTokenAutoRefreshEnabled: true,
    // }),
    // ),
  ],
}).catch(err => console.error(err));
