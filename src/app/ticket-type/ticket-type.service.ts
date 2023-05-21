import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TicketType } from "../models/ticket-type.model";

@Injectable({
  providedIn: "root",
})
export class TicketTypeService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getTicketTypes(){
    console.log('Solicitando tipos de servicio...');
    return this.http.get(`${this.serverApi}/ticket_types.json`);
  }

  getTicketTypeId(id:number){
    console.log("solicitando tipos de servicio con id:",id);
    return this.http.get(`${this.serverApi}/ticket_types/${id}.json`);
  }
  // POST --------------------------------------------------------------------------
  postTicketType(ticketType: TicketType) {
    console.log('Guardando tipos de servicio...', ticketType);
    return this.http.post(`${this.serverApi}/ticket_types.json`, ticketType);
  }
  // PUT ---------------------------------------------------------------------------
  putTicketType(id:number, ticketType: TicketType) {
    console.log('Actualizando tipos de servicio...',ticketType);
    return this.http.put(`${this.serverApi}/ticket_types/${id}`, ticketType);
  }
  // DELETE-------------------------------------------------------------------------
  deleteTicketType(id: string | number) {
    console.log('Borrando tipos de servicio...',id);
    return this.http.delete(`${this.serverApi}/ticket_types/${id}`);
  }
}