import { Component, OnInit } from "@angular/core";
import { Level } from "../models/level.model";
import { LevelService } from "../level/level.service";
import { PriorityService } from "../priority/priority.service";
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
        public levelService: LevelService, 
        public priorityService:PriorityService,
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListLevels();
    }

    // Get the list of all levels
    getListLevels(){    
        this.levelService
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
            this.levelService
                .postLevel(level).pipe(map(data => {
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
            this.levelService
                .putLevel(id, level).pipe(map(data => {this.nombre_nivel=""}))
                .subscribe({
                    next: function(){console.log('Nivel actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }


    // Delete a level   
    deleteLevel(id:number) {
        this.levelService
            .deleteLevel(id).pipe(map(data => {this.listaNiveles = this.listaNiveles.filter( (level: { id: number; }) => level.id != id);}))
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