import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subcategory } from "../models/subcategory.model";

@Injectable({
  providedIn: "root",
})
export class SubcategoryService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getSubcategories(){
    console.log("Solicitando subcategorias...");
    return this.http.get(`${this.serverApi}/subcategories.json`);
  }

  getSubcategoryId(id:number){
    console.log("solicitando subcategoria con id:",id);
    return this.http.get(`${this.serverApi}/subcategories/${id}.json`);
  }

  // POST --------------------------------------------------------------------------
  postSubcategories(subcategory: Subcategory) {
    console.log('Guardando subcategoria...');
    return this.http.post(`${this.serverApi}/subcategories.json`, subcategory);
  }
  // PUT ---------------------------------------------------------------------------
  putCategories(id:number, subcategory: Subcategory) {
    console.log('Actualizando subcategoria con id: ',id);
    return this.http.put(`${this.serverApi}/subcategories/${id}`, subcategory);
  }  
  // DELETE-------------------------------------------------------------------------
  deleteSubcategories(id: string | number) {
    console.log('Eliminando categoria con id: ',id);
    return this.http.delete(`${this.serverApi}/subcategories/${id}`);
  }
}