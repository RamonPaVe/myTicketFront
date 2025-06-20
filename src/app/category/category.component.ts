import { Component, OnInit } from "@angular/core";
import { Category } from "../models/category.model";
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-categories",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.css"]
})

export class CategoryComponent implements OnInit{
    titulo="Gestión de categorias";
    nombre_categoria="";
    nombre_subcategoria="";
    id="";

    listaCategorias:any;
    listaSubcategories:any;

    //Injecting service
    constructor( 
        public apiService:ApiService,
        private route:ActivatedRoute,
        private router:Router){}

    ngOnInit() {
        this.getListCategories();
    }

    // Get the list of all categories
    getListCategories(){    
        this.apiService
            .getAll('categories')
            .pipe(map(data => {
                this.listaCategorias=data;
                console.log("Categorias ",this.listaCategorias);
            }))
            .subscribe({
                next: function(){console.log('Categorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    
    // Add a new category (post)
    newCategory(){
        if (this.nombre_categoria!=''){
            let category=new Category(this.nombre_categoria);
            this.apiService
                .postInTable('categories',category).pipe(map(data => {
                    this.listaCategorias.push(data);
                    this.nombre_categoria="";}))
                .subscribe({
                    next: function(){console.log('Categoria guardada.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Update a category  (PUT) 
    updateCategory(id:number, categoryName:string) {
        if (categoryName!=""){
            let category=new Category(categoryName);
            this.apiService
                .putInTable('categories',id, category).pipe(map(data => {this.nombre_categoria=""}))
                .subscribe({
                    next: function(){console.log('Categoria actualizada.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }


    // Delete a category   
    deleteCategory(id:number) {
        this.apiService
            .deleteFromTable('categories',id).pipe(map(data => {this.listaCategorias = this.listaCategorias.filter( (category: { id: number; }) => category.id != id);}))
            .subscribe({
                next: function(){console.log('Categoria eliminada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // send the ID of Category to Subcategory
    routeToSubcategory(id:string|null) {
        this.router.navigate(['/subcategory', id]);
    }

}