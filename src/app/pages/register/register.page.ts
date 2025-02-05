import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fraseSecreta: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async register() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Creando cuenta...',
      });
      await loading.present();

      try {
        const response = await this.authService.register(this.registerForm.value).toPromise();
        
        if (response.estado) {
          const toast = await this.toastController.create({
            message: 'Cuenta creada exitosamente',
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
        this.showError('Error al crear la cuenta. Por favor intente nuevamente.');
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