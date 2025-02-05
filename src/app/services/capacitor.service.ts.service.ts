import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Dialog } from '@capacitor/dialog';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CapacitorService {
  constructor() { }

  // Toast
  async showToast(message: string, duration: 'short' | 'long' = 'short') {
    await Toast.show({
      text: message,
      duration: duration
    });
  }

  // Dialog
  async showAlert(title: string, message: string) {
    await Dialog.alert({
      title,
      message,
    });
  }

  async showConfirm(title: string, message: string): Promise<boolean> {
    const { value } = await Dialog.confirm({
      title,
      message,
    });
    return value;
  }

  // Camera
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      return image;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  }
}