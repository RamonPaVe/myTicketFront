import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Priority } from "../models/priority.model";
import { PriorityService } from "../priority/priority.service";
import { LevelService } from "../level/level.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit{   
    levelID:string|null; //valor que se pasa en la ruta

    constructor(
        public levelService: LevelService, 
        public priorityService:PriorityService,
        private changeDetector:ChangeDetectorRef,
        private route:ActivatedRoute){}

    enablePriorityInput=true;
    listLevels:any;
    listPriorities:any;
    titulo="Gestión de prioridades";
    selectedLevel="-1";
    IRI_route="/api/levels/"; //IRI de levels para las prioridades
    
    niveles: any[];

    nuevoNivel: any = {
        level_name: this.IRI_route+this.selectedLevel,
        id_priority: []
    };

    nuevaPrioridad="";
    
    ngOnInit() {
        this.levelID=this.route.snapshot.paramMap.get("id");
        console.log("Nivel del route:",this.levelID);
        this.selectedLevel= this.levelID !== null ? this.levelID : '-1'; //obtenemos el valor de la variable que viene de Nivel
        this.getListLevels();
        if(this.selectedLevel>'0'){
            this.getLevel(this.selectedLevel);
        }        
    }
    
    //--------------------------------------------------------------------------------------------

    


    
        addPriority() {
        if (this.nuevaPrioridad!=""){
            this.nuevoNivel.levelName = this.IRI_route+this.selectedLevel;
            let priority=new Priority(this.nuevoNivel.levelName, this.nuevaPrioridad);
            this.newPriority(priority);
        }
        }
        
    //----------------------------------------------------------------------------------------------

        // Get the list of all priorities
        getListPriorities(){    
        this.priorityService
            .getPriorities()
            .pipe(map(data => {
                this.listPriorities=data;
                console.log("Prioridades: ",this.listPriorities);
                
            }))
            .subscribe({
                next: function(){console.log('Prioridades obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
            
    }

    // Get the list of all levels
    getListLevels(){    
        this.levelService
            .getLevels()
            .pipe(map(data => {
                this.listLevels=data;
                console.log("Niveles: ",this.listLevels);
                this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Niveles obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    //obtener un nivel por ID
    getLevel(level:string){
        console.log(level);
        this.nuevoNivel = {
            levelName: this.IRI_route+this.selectedLevel,
            idPriority: []
            };
        this.levelService
            .getLevelId(parseInt(level))
            .pipe(map(data => {
                this.nuevoNivel=data;
                this.enablePriorityInput=false;
                console.log("Level: ",level,' ',this.nuevoNivel);
            }))
            .subscribe({
                next: function(){console.log('Nivel obtenido.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    // Add a new priority (post)
    newPriority(priority:any){
        this.priorityService
            .postPriority(priority).pipe(map(data => {this.getLevel(this.selectedLevel);}))
            .subscribe({
                next: function(){console.log('Prioridad guardada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Update a priority (PUT) 
    updatePriority(id:number, priorityName:string) {
        if (priorityName!=""){
            let priority=new Priority(this.IRI_route+this.selectedLevel, priorityName);
            this.priorityService
                .putPriority(id, priority).pipe(map(data => {}))
                .subscribe({
                    next: function(){console.log('Prioridad actualizada.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a priority   
    deletePriority(id:number) {
        this.priorityService
            .deletePriority(id).pipe(map(data => {this.getLevel(this.selectedLevel);}))
            .subscribe({
                next: function(){console.log('Prioridad eliminada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}



