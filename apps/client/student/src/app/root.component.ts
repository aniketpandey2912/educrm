import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'educrm-root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class AppComponent {
  title = 'student';
}
