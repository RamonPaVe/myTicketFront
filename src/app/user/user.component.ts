import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../services/httpClientService.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

    titulo="Gestión de usuarios";
    nombre_centro="";
    username:string="";
    surname:string="";
    user_email:string="";
    password:string="";
    user_phone:string="";
    dni:string="";
    active:boolean=true;
    id="";
    passwordVerify="";
    pass=false;
    selectedCenter="-1";
    listCenters:any;
    listUsers:any;
   // user=new User(this.username, this.surname, this.user_email, this.password, this.user_phone, this.dni, this.selectedCenter, this.active);
   /* {
        "username": "Yulema",
        "surname": "Benito Masia",
        "password": "yul",
        "dni": "20555444Y",
        "active": true,
        "userEmail": "yulema@hr.com",
        "userPhone": "666555222",
        "idCenter": "/api/centers/1"
      }*/
    //Injecting service
    constructor(
        public apiService: ApiService, 
        private changeDetector:ChangeDetectorRef,
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        
        this.getListUsers();
        this.getListCenters();
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
    
    // Add a new user (post)
    newUser(){
        let user=new User(this.username, this.surname, this.password, this.dni, this.active, this.user_email, this.user_phone, '/api/centers/'+this.selectedCenter);
        if(this.password==this.passwordVerify){
            this.pass=true;
        } else {
            this.pass=false;
            alert("Los password no coinciden.")}
        if(this.username != "" && this.surname != "" && this.password != "" && this.dni != "" && this.selectedCenter &&this.pass == true){
            console.log(user);
            this.apiService.postInTable('users',user).pipe(map(data => {
                    this.listUsers.push(data);
                    this.username="";
                    this.surname="";
                    this.user_email="";
                    this.password="";
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
        }
    }

    // Update a user  (PUT) 
    updateUser(id:number) {
        if(this.password==this.passwordVerify){
            this.pass=true;
        } else {
            this.pass=false;
            alert("Los password no coinciden.")}
        if(this.username != "" && this.surname != "" && this.password != "" && this.dni != "" && this.selectedCenter &&this.pass == true){
            let user=new User(this.username, this.surname, this.password, this.dni, this.active, this.user_email, this.user_phone, this.selectedCenter);
            this.apiService
                .putInTable('user',id, user).pipe(map(data => {
                    this.username="";
                    this.surname="";
                    this.user_email="";
                    this.password="";
                    this.user_phone="";
                    this.dni="";
                    this.selectedCenter="-1";
                    this.active=true;}))
                .subscribe({
                    next: function(){console.log('Usuario actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
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

    // send the ID of User to Center
    routeToUser(id:string|null) {
        this.router.navigate(['/center', id]);
      }

      activeCheck(){
        this.active=!this.active;
      }

}
