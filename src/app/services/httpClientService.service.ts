import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getCategories(){
    console.log('Solicitando categorias...');
    return this.http.get(`${this.serverApi}/categories.json`);
  }

  getCategoryId(id:number){
    console.log("solicitando categoria con id:",id);
    return this.http.get(`${this.serverApi}/categories/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postCategories(category: Category) {
    console.log('Guardando categoria...');
    return this.http.post(`${this.serverApi}/categories.json`, category);
  }
  // PUT ---------------------------------------------------------------------------
  putCategories(id:number, category: Category) {
    console.log('Actualizando categoria...');
    return this.http.put(`${this.serverApi}/categories/${id}`, category);
  }
  // DELETE-------------------------------------------------------------------------
  deleteCategories(id: string | number) {
    console.log('Borrando categoria...');
    return this.http.delete(`${this.serverApi}/categories/${id}`);
  }
}