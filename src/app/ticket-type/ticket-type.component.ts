import { Component, OnInit } from "@angular/core";
import { TicketType } from "../models/ticket-type.model";
import { map } from "rxjs/internal/operators/map";
import { ApiService } from "../services/httpClientService.service";

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css']
})
export class TicketTypeComponent implements OnInit{

    titulo="Gestión de tipos de servicio";
    nombre_tipo="";
    listTicketTypes:any;

    //Injecting service
    constructor(
        public apiService: ApiService){}

    ngOnInit() {
        this.getListTicketTypes();
    }

    // Get the list of all the ticketTypes
    getListTicketTypes(){    
        this.apiService
            .getAll('ticket_types')
            .pipe(map(data => {
                this.listTicketTypes=data;
                console.log("Tipos de servicio: ",this.listTicketTypes);
            }))
            .subscribe({
                next: function(){console.log('Tipos de servicio obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new ticketType (post)
    newTicketType(){
        if(this.nombre_tipo!=""){
            let ticketType=new TicketType(this.nombre_tipo);
            this.apiService
                .postInTable('ticket_types',ticketType).pipe(map(data => {
                    this.listTicketTypes.push(data);
                    this.nombre_tipo="";}))
                .subscribe({
                    next: function(){console.log('Tipo de servicio guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a centicketTypeter  (PUT) 
    updateTicketType(id:number, tycketType_name:string) {
        if (tycketType_name!=""){
            let ticketType=new TicketType(tycketType_name);
            this.apiService
                .putInTable('ticket_types', id, ticketType).pipe(map(data => {this.nombre_tipo=""}))
                .subscribe({
                    next: function(){console.log('Tipo de servicio actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a center   
    deleteTicketType(id:number) {
        this.apiService
            .deleteFromTable('ticket_types',id).pipe(map(data => {this.listTicketTypes = this.listTicketTypes.filter( (ticketType: { id: number; }) => ticketType.id != id);}))
            .subscribe({
                next: function(){console.log('Tipo de servicio eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}