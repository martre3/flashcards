import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CoreStoreModule } from './store/store.module';
import { CanActivateRouteGuard } from './guards/CanActivateRouteGuard';
import { getAuthServiceConfigs } from './config/get-auth-service-configs';
import { CanActivateUnauthorizedRouteGuard } from './guards/CanActivateUnauthorizedRouteGuard';
import {APIInterceptor} from "./interceptors/api.interceptor";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    CoreStoreModule,
    SocialLoginModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CanActivateRouteGuard,
    CanActivateUnauthorizedRouteGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: getAuthServiceConfigs(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
