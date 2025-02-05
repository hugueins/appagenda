import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Contactos', url: '/contacts', icon: 'people' },
    { title: 'Categorías', url: '/categories', icon: 'bookmark' },
    { title: 'Mi Perfil', url: '/profile', icon: 'person' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get currentUser() {
    return this.authService.currentUserValue;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}