import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getUsers(){
    console.log('Solicitando usuarios...');
    return this.http.get(`${this.serverApi}/users.json`);
  }

  getUserId(id:number){
    console.log("solicitando usuario con id:",id);
    return this.http.get(`${this.serverApi}/users/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postUser(user: User) {
    console.log('Guardando usuario...', user);
    return this.http.post(`${this.serverApi}/users.json`, user);
  }
  // PUT ---------------------------------------------------------------------------
  putUser(id:number, user: User) {
    console.log('Actualizando usuario...', user);
    return this.http.put(`${this.serverApi}/users/${id}`, user);
  }
  // DELETE-------------------------------------------------------------------------
  deleteUser(id: string | number) {
    console.log('Borrando usuario...', id);
    return this.http.delete(`${this.serverApi}/users/${id}`);
  }
}