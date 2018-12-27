import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./authmodule/landing-page/landing-page.component";
import { NotFoundComponent } from "./common_module/body/not-found/not-found.component";
import { AuthGuard } from "./guards/auth-guard.service";
import { AdminAuthGuard } from "./guards/admin-auth-guard.service";
import { DashboardComponent } from "./common_module/body/dashboard/dashboard.component";
import { AppHomeComponent } from "./common_module/body/home/app-home.component";
import { ForgotPwdComponent } from "./authmodule/forgot-pwd/forgot-pwd.component";
import { AppProfileComponent } from "./common_module/body/profile/app-profile.component";
import { AppIncidentComponent } from "./common_module/body/incident/app-incident.component";
import { IncidentDetailComponent } from "./common_module/body/incident/incident-detail/incident-detail.component";
import { AppReportComponent } from "./common_module/body/report/app-report.component";
import { AdminSosComponent } from "./adminmodule/admin-sos/admin-sos.component";
import { ControlRoomGuard } from "./guards/control-room-guard";
import { NotificationComponent } from "./common_module/body/notification/notification.component";
import { UserComponent } from "./adminmodule/user/user.component";

const routes: Routes = [
  {
    path: "resetPassword",
    component: ForgotPwdComponent,
    data: { title: "EISM-Reset Password" }
  },
  { path: "", component: LandingPageComponent, pathMatch: "full" },
  { path: "login", redirectTo: "", pathMatch: "full" },
  { path: "logout", component: LandingPageComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "EISM-Dashboard" },
    canActivate: [AuthGuard],
    children: [
      // { path: '', component:  AppHomeComponent, pathMatch: 'full'},
      {
        path: "home",
        component: AppHomeComponent,
        data: { title: "EISM-Home" }
      },
      {
        path: "services",
        component: AdminSosComponent,
        canActivate: [AdminAuthGuard],
        data: { title: "EISM-Services" }
      },

      {
        path: "users",
        component: UserComponent,
        canActivate: [AdminAuthGuard],
        data: { title: "EISM-Users" }
      },

      {
        path: "notify",
        component: NotificationComponent,
        data: { title: "EISM-Notification" }
      },

      {
        path: "profile",
        component: AppProfileComponent,
        data: { title: "EISM-Profile" }
      },
      {
        path: "incident",
        component: AppIncidentComponent,
        data: { title: "EISM-Incidents" }
      },
      {
        path: "incident/:id",
        component: IncidentDetailComponent
        // ,
        // canActivate: [ControlRoomGuard]
      },
      {
        path: "report",
        component: AppReportComponent,
        data: { title: "EISM-Report" }
      }
    ]

    // children: [
    //   { path: '', loadChildren:  () => AppHomeComponent, pathMatch: 'full'},
    //   { path: 'home', redirectTo: '', pathMatch: 'full' },
    //   {
    //     path: 'services',
    //     loadChildren: './adminmodule/admin-sos/admin-sos.component#AdminSosComponent',
    //     canActivate: [AdminAuthGuard]
    //   },
    //   { path: 'profile', loadChildren: './common_module/body/profile/app-profile.component#AppProfileComponent' },
    //   { path: 'incident', loadChildren: './common_module/body/incident/app-incident.component#AppIncidentComponent' },
    //   { path: 'incident/:id', loadChildren: './common_module/body/incident/incident-detail/incident-detail.component#IncidentDetailComponent'},
    //   { path: 'report', loadChildren:'./common_module/body/report/app-report.component#AppReportComponent' },
    //   { path: 'aboutus', loadChildren:'./common_module/body/aboutus/app-aboutus.component#AppAboutusComponent' }
    // ]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true })],
  exports: [RouterModule]
})
export class RouteModule {}
