import { User } from './../models/user.model';
import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';


@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.css']
})
export class EditGroupsComponent implements OnInit {

    groupID:string|null; //valor que se pasa en la ruta
    titulo:string="Gestión de usuarios en grupos"
    selectedGroup:string="-1";
    selectedUser:string="-1";
    enableUser=true;
    listGroups:any;
    listUsers:any = {
        group_name: '/api/groups/'+this.selectedGroup,
        users: []
      };

    editGroup:any;

    userInGroup: any = {
        users: []
      };


    constructor(
        public apiService: ApiService,
        private route:ActivatedRoute){}

        ngOnInit() {
            this.groupID=this.route.snapshot.paramMap.get("id");
            this.selectedGroup= this.groupID !== null ? this.groupID : '-1'; 
            this.getListGroups();
            this.getListUsers();
            if(this.selectedGroup>'0'){
                this.getUsersGroup(this.selectedGroup);
            }        
        }

        getListGroups(){
            this.apiService
            .getAll('groups')
            .pipe(map(data => {
                this.listGroups=data;
                console.log("Grupos (listGroups) ",this.listGroups);
                setTimeout(() => M.AutoInit(), 10);
                
            }))
            .subscribe({
                next: function(){console.log('Grupos obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        }

        getUsersGroup(id:string){
            this.userInGroup.users=[];
            this.apiService.getId('groups',parseInt(id))
                .pipe(map(data => {
                    this.editGroup=data;
                    console.log("Usuarios en Grupo (editGroup)",this.editGroup);
                    this.enableUser=false;
                    setTimeout(() => M.AutoInit(), 10);
                    for(let i=0;i<this.editGroup.users.length;i++){
                        this.userInGroup.users.push('/api/users/'+this.editGroup.users[i].id);
                    }
                }))
                .subscribe({
                    next: function(){console.log('Usuarios del grupo obtenidos.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }

        getListUsers(){
            this.apiService
            .getUsers()
            .pipe(map(data => {
                this.listUsers=data;
                console.log("users (listUsers)",this.listUsers);
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Usuarios obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        }

        addUser(selectedGroup:string, selectedUser:string){
            this.userInGroup.users.push("/api/users/"+selectedUser);
            this.apiService.putInTable('groups',parseInt(selectedGroup), this.userInGroup)
                .pipe(map(data => {
                this.getUsersGroup(this.selectedGroup);

            }))
            .subscribe({
                next: function(){console.log('Usuario Añadido al grupo');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        }

        deleteUser(id:string){
            let userToDelete='/api/users/'+id;
            const index = this.userInGroup.users.indexOf(userToDelete);

            if (index !== -1) {
                this.userInGroup.users.splice(index, 1);
                }
            this.apiService.putInTable('groups',parseInt(this.selectedGroup), this.userInGroup)
                .pipe(map(data => {
                this.getUsersGroup(this.selectedGroup);
            }))
            .subscribe({
                next: function(){console.log('Usuario eliminado del grupo');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        }

        

}