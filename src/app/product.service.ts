import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get<any>(`${environment.baseURL}/api/products`)
  }

  addProduct(product){
    return this.http.post<any>(`${environment.baseURL}/api/products`,product)
  }

  deleteProduct(id){
    return this.http.delete<any>(`${environment.baseURL}/api/products/${id}`)
  }

  updateProduct(id,product) {
    return this.http.put<any>(`${environment.baseURL}/api/products/${id}`,product)
  }
}
