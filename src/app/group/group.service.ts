import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Group } from "../models/group.model";

@Injectable({
  providedIn: "root",
})
export class GroupService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getGroups(){
    console.log('Solicitando grupos...');
    return this.http.get(`${this.serverApi}/groups.json`);
  }

  getGroupId(id:number){
    console.log("solicitando grupo con id:",id);
    return this.http.get(`${this.serverApi}/groups/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postGroup(group: Group) {
    console.log('Guardando grupo...',group);
    return this.http.post(`${this.serverApi}/groups.json`, group);
  }
  // PUT ---------------------------------------------------------------------------
  putGroup(id:number, group: Group) {
    console.log('Actualizando grupo...',group);
    return this.http.put(`${this.serverApi}/groups/${id}`, group);
  }
  // DELETE-------------------------------------------------------------------------
  deleteGroup(id: string | number) {
    console.log('Borrando grupo...',id);
    return this.http.delete(`${this.serverApi}/groups/${id}`);
  }
}