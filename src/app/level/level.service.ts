import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Level } from "../models/level.model";

@Injectable({
  providedIn: "root",
})
export class LevelService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getLevels(){
    console.log('Solicitando niveles...');
    return this.http.get(`${this.serverApi}/levels.json`);
  }

  getLevelId(id:number){
    console.log("solicitando nivel con id:",id);
    return this.http.get(`${this.serverApi}/levels/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postLevel(level: Level) {
    console.log('Guardando nivel...');
    return this.http.post(`${this.serverApi}/levels.json`, level);
  }
  // PUT ---------------------------------------------------------------------------
  putLevel(id:number, level: Level) {
    console.log('Actualizando nivel...');
    return this.http.put(`${this.serverApi}/levels/${id}`, level);
  }
  // DELETE-------------------------------------------------------------------------
  deleteLevel(id: string | number) {
    console.log('Borrando nivel...',id);
    return this.http.delete(`${this.serverApi}/levels/${id}`);
  }
}