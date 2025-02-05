import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
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

  login(cedula: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { cedula, password })
      .pipe(
        tap(response => {
          if (response.estado) {
            Preferences.set({
              key: 'currentUser',
              value: JSON.stringify(response.datos)
            });
            this.currentUserSubject.next(response.datos);
          }
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/persona/register`, userData);
  }

  resetPassword(resetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/persona/reset-password`, resetData);
  }

  async logout() {
    await Preferences.remove({ key: 'currentUser' });
    this.currentUserSubject.next(null);
  }
}