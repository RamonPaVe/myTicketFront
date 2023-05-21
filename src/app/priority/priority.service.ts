import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Priority } from "../models/priority.model";

@Injectable({
  providedIn: "root",
})
export class PriorityService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getPriorities(){
    console.log('Solicitando prioridades...');
    return this.http.get(`${this.serverApi}/priorities.json`);
  }

  getPriorityId(id:number){
    console.log("solicitando prioridad con id:",id);
    return this.http.get(`${this.serverApi}/priorities/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postPriority(priority: Priority) {
    console.log('Guardando prioridad...',priority);
    return this.http.post(`${this.serverApi}/priorities.json`, priority);
  }
  // PUT ---------------------------------------------------------------------------
  putPriority(id:number, priority: Priority) {
    console.log('Actualizando prioridad...',priority);
    return this.http.put(`${this.serverApi}/priorities/${id}`, priority);
  }
  // DELETE-------------------------------------------------------------------------
  deletePriority(id: string | number) {
    console.log('Borrando prioridad...',id);
    return this.http.delete(`${this.serverApi}/priorities/${id}`);
  }
}