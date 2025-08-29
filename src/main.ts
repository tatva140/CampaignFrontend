import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/shared/interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(TranslateModule.forRoot())
  ],
}).catch((err) => console.error(err));

