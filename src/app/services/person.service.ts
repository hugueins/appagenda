import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPerson(codPersona: number) {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      params: { codPersona: codPersona.toString() }
    });
  }

  updatePerson(person: Person) {
    return this.http.put<any>(`${this.apiUrl}/update-profile`, person);
  }

  deletePerson(codPersona: number) {
    return this.http.delete<any>(`${this.apiUrl}/delete-profile`, {
      params: { codPersona: codPersona.toString() }
    });
  }
}