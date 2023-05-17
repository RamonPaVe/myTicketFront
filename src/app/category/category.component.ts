import { Component, OnInit } from "@angular/core";
import { Category } from "../models/category.model";
import { CategoryService } from "../category/category.service";
import { SubcategoryService } from "../subcategory/subcategory.service";
import { map } from "rxjs/internal/operators/map";



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
    additionalSubcategories: string[] = [];

    //Injecting service
    constructor(public categoryService: CategoryService, public subcategoryService:SubcategoryService){}

    ngOnInit() {
        this.getListCategories();
    }

    // Get the list of all categories
    getListCategories(){    
        this.categoryService
            .getCategories()
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
        let category=new Category(this.nombre_categoria);
        this.categoryService
            .postCategories(category).pipe(map(data => {this.listaCategorias.push(data);}))
            .subscribe({
                next: function(){console.log('Categoria guardada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Update a category  (PUT) 
    updateCategory(id:number, categoryName:string) {
        let category=new Category(categoryName);
        this.categoryService
            .putCategories(id, category).pipe(map(data => {this.getListCategories()}))
            .subscribe({
                next: function(){console.log('Categoria actualizada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }


    // Delete a category   
    deleteCategory(id:number) {
        this.categoryService
            .deleteCategories(id).pipe(map(data => {this.listaCategorias = this.listaCategorias.filter( (category: { id: number; }) => category.id != id);}))
            .subscribe({
                next: function(){console.log('Categoria eliminada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

}