import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { PieChartComponent } from './common_module/body/report/charts/pie-chart/pie-chart.component';
import { DoughntChartComponent } from './common_module/body/report/charts/doughnt-chart/doughnt-chart.component';
import { PloarAreaChartComponent } from './common_module/body/report/charts/ploar-area-chart/ploar-area-chart.component';
import { LocationComponent } from './location/location.component';
import { NotFoundComponent } from './common_module/body/not-found/not-found.component';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NonSOSComponent } from './common_module/body/non-sos/non-sos.component';
import { DashboardComponent } from './common_module/body/dashboard/dashboard.component';
import { AdminSosComponent } from './adminmodule/admin-sos/admin-sos.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { ErrorComponent } from './common_module/body/error/error.component';
import { ForgotPwdComponent } from './authmodule/forgot-pwd/forgot-pwd.component';
import { AppHomeComponent } from './common_module/body/home/app-home.component';
import { AppIncidentComponent } from './common_module/body/incident/app-incident.component';
import { AppSearchComponent } from './common_module/body/appsearch/app-search.component';
import { AppProfileComponent } from './common_module/body/profile/app-profile.component';
import { AppReportComponent } from './common_module/body/report/app-report.component';
import { LandingPageComponent } from './authmodule/landing-page/landing-page.component';
import { IncidentDetailComponent } from './common_module/body/incident/incident-detail/incident-detail.component';
import { ReportService } from './common_module/services/report.service';
import { DialogBoxComponent } from './common_module/body/popupbox/dialog-box.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './authmodule/registration/registration.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-login';
import { RouteReuseStrategy } from '@angular/router'

import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AuthInterceptor } from './authmodule/services/auth-interceptor';
import { ErrorInterceptor } from './authmodule/services/error-interceptor';
import { RouteModule } from './route.module';
import { NotificationComponent } from './common_module/body/notification/notification.component';
import { UserComponent } from './adminmodule/user/user.component';
import { GoogleplaceDirective } from './googleplace.directive';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider( # KEY)
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
       # KEY
      )
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleplaceDirective,
    AdminSosComponent,
    DashboardComponent,
    AppHomeComponent,
    DoughntChartComponent,
    PloarAreaChartComponent,
    AppIncidentComponent,
    AppSearchComponent,
    AppProfileComponent,
    NonSOSComponent,
    AppReportComponent,
    NotFoundComponent,
    IncidentDetailComponent,
    LandingPageComponent,
    LocationComponent,
    PieChartComponent,
    DialogBoxComponent,
    RegistrationComponent,
    ErrorComponent,
    UserComponent,
    ForgotPwdComponent,
    NotificationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxSpinnerModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    GooglePlaceModule,
    FormsModule,
    SocialLoginModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    RouteModule
  ],

  entryComponents: [DialogBoxComponent, ErrorComponent],

  providers: [
    AdminAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // AuthService,
    // SosService,
    //IncidentServiceService,
    ReportService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
