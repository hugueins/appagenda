import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  isAuthenticated = false;
  contacts: any[] = [];
  currentPage = 1;
  totalPages = 0;
  searchTerm = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
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
  async loadContacts(event?: InfiniteScrollCustomEvent) {
    if (!event) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Cargando contactos...'
      });
      await loading.present();
    }

    const user = this.authService.currentUserValue;
    
    // Añadimos esta verificación
    if (!user?.codigo) {
      console.error('No hay usuario autenticado o falta el código');
      this.finishLoading(event);
      return;
    }
    
    if (this.searchTerm) {
      this.contactService.searchContacts(user.codigo, this.searchTerm)
        .subscribe({
          next: (response) => {
            if (response.estado) {
              this.contacts = response.datos;
            }
            this.finishLoading(event);
          },
          error: (error) => {
            console.error('Error buscando contactos:', error);
            this.finishLoading(event);
          }
        });
    } else {
      this.contactService.getContacts(user.codigo, this.currentPage)
        .subscribe({
          next: (response) => {
            if (response.estado) {
              if (event) {
                this.contacts.push(...response.datos);
              } else {
                this.contacts = response.datos;
              }
              this.totalPages = response.totalPages || 1;
            }
            this.finishLoading(event);
          },
          error: (error) => {
            console.error('Error cargando contactos:', error);
            this.finishLoading(event);
          }
        });
    }
  }

  async finishLoading(event?: InfiniteScrollCustomEvent) {
    if (event) {
      event.target.complete();
      if (this.currentPage >= this.totalPages) {
        event.target.disabled = true;
      }
    } else {
      this.isLoading = false;
      const loading = await this.loadingController.getTop();
      if (loading) {
        await loading.dismiss();
      }
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.currentPage = 1;
    this.loadContacts();
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadContacts(event);
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