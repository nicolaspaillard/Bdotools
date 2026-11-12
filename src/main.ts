import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, provideAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';
import { routes } from '@app/app.routes';
import Aura from '@openng/optimus-ui-themes/aura';
import { provideOptimus } from '@openng/optimus-ui/config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          document.documentElement.dataset['direction'] = (to.firstChild ?? to).data['animation'] > (from.firstChild ?? from).data['animation'] ? 'forward' : 'backward';
          document.documentElement.classList.add('vt-active');
          transition.finished
            .finally(() => {
              delete document.documentElement.dataset['direction'];
              document.documentElement.classList.remove('vt-active');
            })
            .catch(err => console.error(err));
        },
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideOptimus({
      theme: { preset: Aura },
      ripple: true,
      overlayAppendTo: 'body',
    }),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBVgoYHyhh6FlTzfT6Q8RSvp605TJKhn0o',
        authDomain: 'bdo-tools-8ee84.firebaseapp.com',
        projectId: 'bdo-tools-8ee84',
        storageBucket: 'bdo-tools-8ee84.firebasestorage.app',
        messagingSenderId: '1080259118563',
        appId: '1:1080259118563:web:78a0c99876678cf7810cd6',
        measurementId: 'G-TSCD1RDJ8F',
      }),
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideAppCheck(() =>
      initializeAppCheck(getApp(), {
        provider: new ReCaptchaEnterpriseProvider('6Le0wxwuAAAAAPg2KEXAlqYub_cr_By8uvDippxo'),
        isTokenAutoRefreshEnabled: true,
      }),
    ),
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      }),
    ),
  ],
}).catch(err => console.error(err));
