
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './authmodule/services/auth.service';
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "Emergency security incident manager";

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));

    //   this.router
    //   .events.forEach(event => event instanceof NavigationEnd)
    //   .map(() => {
    //     let child = this.activatedRoute.firstChild;
    //     while (child) {
    //       if (child.firstChild) {
    //         child = child.firstChild;
    //       } else if (child.snapshot.data && child.snapshot.data['title']) {
    //         return child.snapshot.data['title'];
    //       } else {
    //         return null;
    //       }
    //     }
    //     return null;
    //   }).subscribe( (title: any) => {
    //      this.titleService.setTitle(title);
    //  });
    // }
  }
}
