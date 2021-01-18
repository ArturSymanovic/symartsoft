import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-test',
  templateUrl: './layout-test.component.html',
  styleUrls: ['./layout-test.component.css'],
})
export class LayoutTestComponent implements OnInit {
  layout$: Observable<BreakpointState>;

  constructor(private breakPointObserver: BreakpointObserver) {
    this.layout$ = this.breakPointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]);
  }

  ngOnInit(): void {
    this.layout$.subscribe({
      next: (state)=>{
        console.log(state);
      }
    })
  }
}
