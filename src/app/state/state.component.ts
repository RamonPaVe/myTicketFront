import { Component, OnInit } from "@angular/core";
import { State } from "../models/state.model";
import { StateService } from "../state/state.service";
import { map } from "rxjs/internal/operators/map";

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
        public stateService: StateService){}

    ngOnInit() {
        this.getListStates();
    }

    // Get the list of all the centers
    getListStates(){    
        this.stateService
            .getStates()
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
            this.stateService
                .postState(state).pipe(map(data => {
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
            this.stateService
                .putState(id, state).pipe(map(data => {this.nombre_estado=""}))
                .subscribe({
                    next: function(){console.log('Estado actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a center   
    deleteState(id:number) {
        this.stateService
            .deleteState(id).pipe(map(data => {this.listStates = this.listStates.filter( (state: { id: number; }) => state.id != id);}))
            .subscribe({
                next: function(){console.log('Estado eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}