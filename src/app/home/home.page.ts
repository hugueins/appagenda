import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false
})
export class HomePage implements OnInit {
  isAuthenticated = false;
  contacts: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loadContacts();
      }
    });
  }

  async loadContacts() {
    const loading = await this.loadingController.create({
      message: 'Cargando contactos...'
    });
    await loading.present();

    // Aquí implementaremos la carga de contactos más adelante
    this.contacts = [];
    
    await loading.dismiss();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}