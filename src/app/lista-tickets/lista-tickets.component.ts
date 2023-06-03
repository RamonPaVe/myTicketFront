import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Ticket } from "../models/ticket.model";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../services/httpClientService.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-lista-tickets',
  templateUrl: './lista-tickets.component.html',
  styleUrls: ['./lista-tickets.component.css']
})
export class ListaTicketsComponent implements OnInit {
    
    listTickets:any;

    //Injecting service
    constructor(
        public apiService: ApiService, 
        private changeDetector:ChangeDetectorRef,
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListTickets();
    }

    getListTickets() {
        this.apiService
        .getAll('tickets')
        .pipe(map(data => {
            this.listTickets=data;
            console.log("Tickets: ",this.listTickets);
        }))
        .subscribe({
            next: function(){console.log('Tickets obtenidos.');},
            error: function(err){console.log('Ocurrio un error: ', err);},
            complete: function(){}
        });
    }

    rowSelected(id:number){
        this.router.navigate(['/ticket', id]);
    }



}
