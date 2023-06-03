import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../services/httpClientService.service";
import * as M from 'materialize-css';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

    titulo="Gestión de usuarios";
    updatingUser=false;
    nombre_centro="";
    username:string="";
    surname:string="";
    user_email:string="";
    password:string="";
    user_phone:string="";
    dni:string="";
    active:boolean=true;
    id=0;
    passwordVerify="";
    pass=false;
    selectedCenter="-1";
    listCenters:any;
    listUsers:any;
    user:any;

    //Injecting service
    constructor(
        public apiService: ApiService, 
        private changeDetector:ChangeDetectorRef,
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        
        this.getListUsers();
        this.getListCenters();
        M.updateTextFields();
    }

    // Get the list of all the users
    getListUsers(){    
        this.apiService
            .getAll('users')
            .pipe(map(data => {
                this.listUsers=data;
                console.log("Usuarios: ",this.listUsers);
            }))
            .subscribe({
                next: function(){console.log('Usuarios obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all centers
    getListCenters(){    
        this.apiService
            .getAll('centers')
            .pipe(map(data => {
                this.listCenters=data;
                console.log("Centres: ",this.listCenters);
                this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Categorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add or update a user (post/put)
    newUser(id:number){
       
            let user=new User(this.username, this.surname, this.password, this.dni, this.active, this.user_email, this.user_phone, '/api/centers/'+this.selectedCenter);
            if(this.password==this.passwordVerify){
                this.pass=true;
            } else {
                this.pass=false;
                alert("Los password no coinciden.")}
            if(this.username != "" && this.surname != "" && this.password != "" && this.dni != "" && this.selectedCenter &&this.pass == true){
                console.log(user);
                if (!this.updatingUser){
                    this.apiService.postInTable('users',user).pipe(map(data => {
                            this.listUsers.push(data);
                            this.username="";
                            this.surname="";
                            this.user_email="";
                            this.password="";
                            this.passwordVerify="";
                            this.user_phone="";
                            this.selectedCenter="-1";
                            this.dni="";
                            this.active=true;
                        }))
                        .subscribe({
                            next: function(){console.log('Usuario guardado.');},
                            error: function(err){console.log('Ocurrio un error: ', err);},
                            complete: function(){}
                        });
                } else{
                    this.apiService.putInTable('users',id,user).pipe(map(data => {
                        this.listUsers.push(data);
                        this.id=0;
                        this.username="";
                        this.surname="";
                        this.user_email="";
                        this.password="";
                        this.passwordVerify="";
                        this.user_phone="";
                        this.selectedCenter="-1";
                        this.dni="";
                        this.active=true;
                        this.updatingUser=false;
                        this.getListUsers();
                    }))
                    .subscribe({
                        next: function(){console.log('Usuario guardado.');},
                        error: function(err){console.log('Ocurrio un error: ', err);},
                        complete: function(){}
                    });
                }
            }
    }

    // Update a user  (PUT) 
    updateUser(id:number) {

        this.apiService.getId('users',id).pipe(map(data=>{
            this.user=data;
            console.log('Usuario: ',this.user);
            this.username=this.user.username;
            this.surname=this.user.surname;
            this.user_email=this.user.user_email;
            this.password=this.user.password;
            this.passwordVerify=this.user.password;
            this.user_phone=this.user.user_phone;
            this.selectedCenter=this.user.id_center.id;
            this.dni=this.user.dni;
            this.active=this.user.active;
            this.id=this.user.id;

            this.updatingUser=true;
        })).subscribe({
            next: function(){console.log('Usuario cargado.');},
            error: function(err){console.log('Ocurrio un error: ', err);},
            complete: function(){}
        });
    }


    // Delete a user   
    deleteUser(id:number) {
        this.apiService
            .deleteFromTable('users',id).pipe(map(data => {this.listUsers = this.listUsers.filter( (user: { id: number; }) => user.id != id);}))
            .subscribe({
                next: function(){console.log('Usuario eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

      activeCheck(){
        this.active=!this.active;
      }
}
