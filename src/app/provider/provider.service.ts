import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Provider } from "../models/provider.model";

@Injectable({
  providedIn: "root",
})
export class ProviderService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getProviders(){
    console.log('Solicitando proveedores...');
    return this.http.get(`${this.serverApi}/providers.json`);
  }

  getProviderId(id:number){
    console.log("solicitando proveedor con id:",id);
    return this.http.get(`${this.serverApi}/providers/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postProvider(provider: Provider) {
    console.log('Guardando proveedor...',provider);
    return this.http.post(`${this.serverApi}/providers.json`, provider);
  }
  // PUT ---------------------------------------------------------------------------
  putProvider(id:number, provider: Provider) {
    console.log('Actualizando proveedor...',provider);
    return this.http.put(`${this.serverApi}/providers/${id}`, provider);
  }
  // DELETE-------------------------------------------------------------------------
  deleteProvider(id: string | number) {
    console.log('Borrando proveedor...',id);
    return this.http.delete(`${this.serverApi}/providers/${id}`);
  }
}