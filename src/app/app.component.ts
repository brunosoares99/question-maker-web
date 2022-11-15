import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';


  constructor(
    private router: Router, 
    private readonly activatedRoute: ActivatedRoute
    ) {
    this.subscribeRouterEvents();
  }

  ngOnInit(): void {
    // this.title = this.activatedRoute.snapshot.data['title'];
  }

  subscribeRouterEvents() {
    this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        this.title = data.snapshot.data['title'];
      }
    });
  }
}
