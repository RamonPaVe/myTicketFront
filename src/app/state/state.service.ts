import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { State } from "../models/state.model";

@Injectable({
  providedIn: "root",
})
export class StateService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getStates(){
    console.log('Solicitando estados...');
    return this.http.get(`${this.serverApi}/states.json`);
  }

  getStateId(id:number){
    console.log("solicitando estado con id:",id);
    return this.http.get(`${this.serverApi}/states/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postState(state: State) {
    console.log('Guardando estado...', state);
    return this.http.post(`${this.serverApi}/states.json`, state);
  }
  // PUT ---------------------------------------------------------------------------
  putState(id:number, state: State) {
    console.log('Actualizando estado...',state);
    return this.http.put(`${this.serverApi}/states/${id}`, state);
  }
  // DELETE-------------------------------------------------------------------------
  deleteState(id: string | number) {
    console.log('Borrando estado...',id);
    return this.http.delete(`${this.serverApi}/states/${id}`);
  }
}