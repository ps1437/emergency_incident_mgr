import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../authmodule/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  shouldRun: boolean = true;
  userName: string;
  userIsAuthenticated = false;
  userType: string;
  authListenerSubs: Subscription;

  theme:number=1;

  constructor(private authService: AuthService
    ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    const tokenData = this.authService.getTokenData();
    this.userType = tokenData.userType;
    this.userName = tokenData.userName;

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userName = localStorage.getItem('userName');
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
