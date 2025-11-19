import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class Menu {

  constructor(private router: Router) { }

  goToMain() {
    this.router.navigate(['/']);
  }
}
