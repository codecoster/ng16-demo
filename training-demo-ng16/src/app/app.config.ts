import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { approutes } from './app.routing';
import { errorNewInterceptor } from './core/error-new.interceptor';
import { ErrorInterceptor } from './core/error.interceptor';

export const appConfig = {
  providers: [
    provideClientHydration(),
    importProvidersFrom(MatDialogModule),
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([
        errorNewInterceptor
      ])
    ),
    provideRouter(approutes, withComponentInputBinding()),
    provideAnimations()
  ]
}
