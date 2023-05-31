import { Component, OnInit } from "@angular/core";
import { Center } from "../models/center.model";
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit{

    titulo="Gestión de centros";
    nombre_centro="";
    nombre_usuario="";
    id="";

    listCenters:any;
    listUsers:any;

    //Injecting service
    constructor(
        public apiService: ApiService, 
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListCenters();
    }

    // Get the list of all the centers
    getListCenters(){    
        this.apiService
            .getAll('centers')
            .pipe(map(data => {
                this.listCenters=data;
                console.log("Centers: ",this.listCenters);
            }))
            .subscribe({
                next: function(){console.log('Centros obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new center (post)
    newCenter(){
        if(this.nombre_centro!=""){
            let center=new Center(this.nombre_centro);
            this.apiService
                .postInTable('centers',center).pipe(map(data => {
                    this.listCenters.push(data);
                    this.nombre_centro="";}))
                .subscribe({
                    next: function(){console.log('Centro guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a center  (PUT) 
    updateCenter(id:number, centerName:string) {
        if (centerName!=""){
            let center=new Center(centerName);
            this.apiService
                .putInTable('centers',id, center).pipe(map(data => {this.nombre_centro=""}))
                .subscribe({
                    next: function(){console.log('Centro actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }


    // Delete a center   
    deleteCenter(id:number) {
        this.apiService
            .deleteFromTable('centers',id).pipe(map(data => {this.listCenters = this.listCenters.filter( (center: { id: number; }) => center.id != id);}))
            .subscribe({
                next: function(){console.log('Centro eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // send the ID of Center to User
    routeToUser(id:string|null) {
        this.router.navigate(['/user', id]);
      }

}