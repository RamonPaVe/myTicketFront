import { ApiService } from './../services/httpClientService.service';
import { Component, OnInit } from "@angular/core";
import { Level } from "../models/level.model";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit{
    titulo="Gestión de niveles";
    nombre_nivel="";
    nombre_prioridad="";
    id="";

    listaNiveles:any;
   // listaSubcategories:any;

    //Injecting service
    constructor(
        public apiService: ApiService, 
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListLevels();
    }

    // Get the list of all levels
    getListLevels(){    
        this.apiService
            .getLevels()
            .pipe(map(data => {
                this.listaNiveles=data;
                console.log("Niveles: ",this.listaNiveles);
            }))
            .subscribe({
                next: function(){console.log('Niveles obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new level (post)
    newLevel(){
        if (this.nombre_nivel!=''){
            let level=new Level(this.nombre_nivel);
            this.apiService
                .postInTable('levels',level).pipe(map(data => {
                    this.listaNiveles.push(data);
                    this.nombre_nivel="";}))
                .subscribe({
                    next: function(){console.log('Nivel guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a level  (PUT) 
    updateLevel(id:number, levelName:string) {
        if (levelName!=""){
            let level=new Level(levelName);
            this.apiService
                .putInTable('levels',id, level).pipe(map(data => {this.nombre_nivel=""}))
                .subscribe({
                    next: function(){console.log('Nivel actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }


    // Delete a level   
    deleteLevel(id:number) {
        this.apiService
            .deleteFromTable('levels',id).pipe(map(data => {this.listaNiveles = this.listaNiveles.filter( (level: { id: number; }) => level.id != id);}))
            .subscribe({
                next: function(){console.log('Nivel eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // send the ID of level to priority
    routeToPriority(id:string|null) {
        this.router.navigate(['/priority', id]);
      }

}