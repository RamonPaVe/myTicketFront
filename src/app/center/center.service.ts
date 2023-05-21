import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Center } from "../models/center.model";

@Injectable({
  providedIn: "root",
})
export class CenterService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getCenters(){
    console.log('Solicitando centros...');
    return this.http.get(`${this.serverApi}/centers.json`);
  }

  getCenterId(id:number){
    console.log("solicitando centro con id:",id);
    return this.http.get(`${this.serverApi}/centers/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postCenter(center: Center) {
    console.log('Guardando centro...',center);
    return this.http.post(`${this.serverApi}/centers.json`, center);
  }
  // PUT ---------------------------------------------------------------------------
  putCenter(id:number, center: Center) {
    console.log('Actualizando centro...',center);
    return this.http.put(`${this.serverApi}/centers/${id}`, center);
  }
  // DELETE-------------------------------------------------------------------------
  deleteCenter(id: string | number) {
    console.log('Borrando centro...',id);
    return this.http.delete(`${this.serverApi}/centers/${id}`);
  }
}