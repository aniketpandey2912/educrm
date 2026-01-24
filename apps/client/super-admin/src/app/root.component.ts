import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'educrm-root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class AppComponent {
  title = 'super-admin';
}
