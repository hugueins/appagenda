import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(codPersona: number) {
    return this.http.get<any>(`${this.apiUrl}/categorias`, {
      params: { codPersona: codPersona.toString() }
    });
  }

  createCategory(category: Category) {
    return this.http.post<any>(`${this.apiUrl}/categorias`, category);
  }

  updateCategory(category: Category) {
    return this.http.put<any>(`${this.apiUrl}/categorias`, category);
  }

  deleteCategory(codCategoria: number, codPersona: number) {
    return this.http.delete<any>(`${this.apiUrl}/categorias`, {
      params: {
        codCategoria: codCategoria.toString(),
        codPersona: codPersona.toString()
      }
    });
  }
}