import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getContacts(codPersona: number, page: number = 1, limit: number = 10) {
    return this.http.get<any>(`${this.apiUrl}/contacts`, {
      params: {
        codPersona: codPersona.toString(),
        page: page.toString(),
        limit: limit.toString()
      }
    });
  }

  searchContacts(codPersona: number, busqueda: string) {
    return this.http.get<any>(`${this.apiUrl}/contacts`, {
      params: {
        codPersona: codPersona.toString(),
        busqueda
      }
    });
  }

  createContact(contact: Contact) {
    return this.http.post<any>(`${this.apiUrl}/contacts`, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put<any>(`${this.apiUrl}/contacts`, contact);
  }

  deleteContact(codContacto: number, codPersona: number) {
    return this.http.delete<any>(`${this.apiUrl}/contacts`, {
      params: {
        codContacto: codContacto.toString(),
        codPersona: codPersona.toString()
      }
    });
  }
}