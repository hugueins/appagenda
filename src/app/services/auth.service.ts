import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.checkToken();
  }

  private async checkToken() {
    const { value } = await Preferences.get({ key: 'currentUser' });
    if (value) {
      this.currentUserSubject.next(JSON.parse(value));
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(cedula: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { cedula, password })
      .pipe(map(async response => {
        if (response && response.estado) {
          await Preferences.set({
            key: 'currentUser',
            value: JSON.stringify(response.datos)
          });
          this.currentUserSubject.next(response.datos);
        }
        return response;
      }));
  }

  register(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  resetPassword(resetData: any) {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, resetData);
  }

  async logout() {
    await Preferences.remove({ key: 'currentUser' });
    this.currentUserSubject.next(null);
  }
}