import { Component, OnInit } from "@angular/core";
import { Category } from "../models/category.model";
import { CategoryService } from "../category/category.service";
import { map } from "rxjs/internal/operators/map";



@Component({
    selector: "app-categories",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.css"]
})

export class CategoryComponent implements OnInit{
    titulo="Gestión de categorias";
    nombre_categoria="";

    listaCategorias:any;

    //Injecting service
    constructor(public categoryService: CategoryService){}

    ngOnInit() {
        this.getListCategories();
    }

    // Get the list of all categories
    getListCategories(){
        this.categoryService
            .getCategories()
            .subscribe(data => {
                this.listaCategorias=data;
                console.log(this.listaCategorias);
            });   
    }  

    // Add a new category (post)
    newCategory(){
        let category=new Category(this.nombre_categoria);
        this.categoryService
            .postCategories(category).pipe(map(data => {this.listaCategorias.push(data);}))
            .subscribe({
                next: function(){console.log('Guardando categoria...');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){
                    console.log('Categoria guardada.');
                }
            });
    }

    // Delete a category   
    deleteCategory(id:number) {
        this.categoryService
            .deleteCategories(id).pipe(map(data => {this.listaCategorias = this.listaCategorias.filter( (category: { id: number; }) => category.id != id);}))
            .subscribe({
                next: function(){console.log('Borrando categoria...');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){
                    console.log('Categoria eliminada.');
                }
            });
    }

}