import { Component } from '@angular/core';
import { COMMON_MODULES } from '@app/core/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    COMMON_MODULES
  ]
})
export class AppHomeComponent {

}
