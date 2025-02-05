import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
      });
      await loading.present();

      try {
        const { cedula, password } = this.loginForm.value;
        
        this.authService.login(cedula, password).subscribe({
          next: (response) => {
            loading.dismiss();
            
            if (response.estado) {
              this.router.navigate(['/home']);
            } else {
              // Verificar el mensaje específico de cuenta bloqueada
              if (response.mensaje.includes('bloqueada')) {
                this.showBlockedAccountAlert(cedula);
              } else {
                this.showError(response.mensaje);
              }
            }
          },
          error: (error) => {
            loading.dismiss();
            console.error('Error en login:', error);
            this.showError(error.error?.mensaje || 'Error al iniciar sesión. Por favor intente nuevamente.');
          }
        });

      } catch (error) {
        await loading.dismiss();
        console.error('Error en try/catch:', error);
        this.showError('Error inesperado. Por favor intente nuevamente.');
      }
    } else {
      this.showError('Por favor complete todos los campos correctamente.');
    }
  }

  async showBlockedAccountAlert(cedula: string) {
    const alert = await this.alertController.create({
      header: '¡Cuenta Bloqueada!',
      subHeader: 'Acceso Restringido',
      message: 'Su cuenta ha sido bloqueada por múltiples intentos fallidos de inicio de sesión. Por favor, use la opción de recuperar contraseña para desbloquearla.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Recuperar Contraseña',
          cssClass: 'primary',
          handler: () => {
            this.router.navigate(['/reset-password'], {
              queryParams: { cedula: cedula }
            });
          }
        }
      ],
      cssClass: 'custom-alert',
      backdropDismiss: false
    });

    await alert.present();
  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}