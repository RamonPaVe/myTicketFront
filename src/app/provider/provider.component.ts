import { Component, OnInit } from "@angular/core";
import { Provider } from "../models/provider.model";
import { map } from "rxjs/internal/operators/map";
import { ApiService } from "../services/httpClientService.service";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit{

    titulo="Gestión de proveedores";
    nombre_proveedor="";
    email_proveedor="";
    telefono_proveedor="";
    listProviders:any;

    //Injecting service
    constructor(
        public apiService: ApiService){}

    ngOnInit() {
        this.getListProviders();
    }

    // Get the list of all the providers
    getListProviders(){    
        this.apiService
            .getAll('providers')
            .pipe(map(data => {
                this.listProviders=data;
                console.log("Proveedores: ",this.listProviders);
            }))
            .subscribe({
                next: function(){console.log('Proveedores obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new provider (post)
    newTicketType(){
        if(this.nombre_proveedor!=""){
            let provider=new Provider(this.nombre_proveedor, this.email_proveedor, this.telefono_proveedor);
            this.apiService
                .postInTable('providers',provider).pipe(map(data => {
                    this.listProviders.push(data);
                    this.nombre_proveedor="";
                    this.email_proveedor="";
                    this.telefono_proveedor="";}))
                .subscribe({
                    next: function(){console.log('Proveedor guardado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a provider  (PUT) 
    updateProvider(id:number, provider_name:string, provider_email:string, provider_phone:string) {
        if (provider_name!=""){
            let provider=new Provider(provider_name, provider_email, provider_phone);
            this.apiService
                .putInTable('providers',id, provider).pipe(map(data => {
                    this.nombre_proveedor="";
                    this.email_proveedor="";
                    this.telefono_proveedor="";}))
                .subscribe({
                    next: function(){console.log('Proveedor actualizado.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a provider   
    deleteProvider(id:number) {
        this.apiService
            .deleteFromTable('providers',id).pipe(map(data => {this.listProviders = this.listProviders.filter( (provider: { id: number; }) => provider.id != id);}))
            .subscribe({
                next: function(){console.log('Proveedor eliminado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}