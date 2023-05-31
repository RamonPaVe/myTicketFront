import { ApiService } from './../services/httpClientService.service';
import { Component, OnInit } from "@angular/core";
import { Group } from "../models/group.model";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{
    titulo="Gestión de grupos";
    nombre_grupo="";
    nombre_usuario="";
    id="";

    listaGrupos:any;
    listaUsuarios:any;

    //Injecting service
    constructor(
        public apiService: ApiService, 
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListGroups();
    }

    // Get the list of all groups
    getListGroups(){    
        this.apiService
            .getAll('groups')
            .pipe(map(data => {
                this.listaGrupos=data;
                console.log("Grupos: ",this.listaGrupos);
            }))
            .subscribe({
                next: function(){console.log('Grupos obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new group (post)
    newGroup(){
        if (this.nombre_grupo!=''){
            let group=new Group(this.nombre_grupo);
            this.apiService
                .postInTable('groups',group).pipe(map(data => {
                    this.listaGrupos.push(data);
                    this.nombre_grupo="";}))
                .subscribe({
                    next: function(){console.log('Grupo guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a group  (PUT) 
    updateGroup(id:number, groupName:string) {
        if (groupName!=""){
            let group=new Group(groupName);
            this.apiService
                .putInTable('group',id, group).pipe(map(data => {this.nombre_grupo=""}))
                .subscribe({
                    next: function(){console.log('Grupo actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }


    // Delete a group   
    deleteGroup(id:number) {
        this.apiService
            .deleteFromTable('group',id).pipe(map(data => {this.listaGrupos = this.listaGrupos.filter( (group: { id: number; }) => group.id != id);}))
            .subscribe({
                next: function(){console.log('Grupo eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // send the ID of group to users
    routeToUser(id:string|null) {
        this.router.navigate(['/user', id]);
      }

}