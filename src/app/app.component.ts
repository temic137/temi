import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SpaceBackgroundComponent } from './components/space-background/space-background.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'temi-website';
}
