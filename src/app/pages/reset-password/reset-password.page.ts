import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.resetForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      fraseSecreta: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Obtener la cédula de los parámetros de la URL si existe
    this.route.queryParams.subscribe(params => {
      if (params['cedula']) {
        this.resetForm.patchValue({
          cedula: params['cedula']
        });
      }
    });
  }

  async resetPassword() {
    if (this.resetForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Restableciendo contraseña...',
      });
      await loading.present();

      try {
        const response = await this.authService.resetPassword(this.resetForm.value).toPromise();
        
        if (response.estado) {
          const toast = await this.toastController.create({
            message: 'Contraseña restablecida exitosamente',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          });
          await toast.present();
          this.router.navigate(['/login']);
        } else {
          this.showError(response.mensaje);
        }
      } catch (error) {
        this.showError('Error al restablecer la contraseña. Por favor intente nuevamente.');
      } finally {
        await loading.dismiss();
      }
    } else {
      this.showError('Por favor complete todos los campos correctamente.');
    }
  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}