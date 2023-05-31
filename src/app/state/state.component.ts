import { Component, OnInit } from "@angular/core";
import { State } from "../models/state.model";
import { map } from "rxjs/internal/operators/map";
import { ApiService } from "../services/httpClientService.service";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit{

    titulo="Gestión de estados";
    nombre_estado="";
    listStates:any;

    //Injecting service
    constructor(
        public apiService: ApiService){}

    ngOnInit() {
        this.getListStates();
    }

    // Get the list of all the centers
    getListStates(){    
        this.apiService
            .getAll('states')
            .pipe(map(data => {
                this.listStates=data;
                console.log("Estados: ",this.listStates);
            }))
            .subscribe({
                next: function(){console.log('Estados obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new center (post)
    newState(){
        if(this.nombre_estado!=""){
            let state=new State(this.nombre_estado);
            this.apiService
                .postInTable('states',state).pipe(map(data => {
                    this.listStates.push(data);
                    this.nombre_estado="";}))
                .subscribe({
                    next: function(){console.log('Estado guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a center  (PUT) 
    updateState(id:number, stateName:string) {
        if (stateName!=""){
            let state=new State(stateName);
            this.apiService
                .putInTable('states',id, state).pipe(map(data => {this.nombre_estado=""}))
                .subscribe({
                    next: function(){console.log('Estado actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a center   
    deleteState(id:number) {
        this.apiService
            .deleteFromTable('states',id).pipe(map(data => {this.listStates = this.listStates.filter( (state: { id: number; }) => state.id != id);}))
            .subscribe({
                next: function(){console.log('Estado eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}