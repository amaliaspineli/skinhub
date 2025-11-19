import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CosmeticsService {
  private baseUrl = 'https://skinhub-api-489189521314.southamerica-east1.run.app/api/cosmetics';

  constructor(private http: HttpClient) { }

  // Todos os cosméticos
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCosmeticById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Novos cosméticos
  getNew(): Observable<any> {
    return this.http.get(`${this.baseUrl}/new`);
  }

  // Loja atual
  getShop(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shop`);
  }
}
