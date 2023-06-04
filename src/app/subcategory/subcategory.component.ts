import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { Subcategory } from '../models/subcategory.model';
import { ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

    categoryID:string|null; //valor que se pasa en la ruta

    constructor(
        public apiService: ApiService, 
        private changeDetector:ChangeDetectorRef,
        private route:ActivatedRoute){}

    enableSubcategoryInput=true;
    listCategories:any;
    listSubcategories:any;
    titulo="Gestión de subcategorias";
    selectedCategory="-1";
    IRI_route="/api/categories/"; //IRI de categorias para las subcategorias
    
    ngOnInit() {
        this.categoryID=this.route.snapshot.paramMap.get("id");
        console.log("categoria del route:",this.categoryID);
        this.selectedCategory= this.categoryID !== null ? this.categoryID : '-1'; //obtenemos el valor de la variable que viene de categoria
      //  this.getListSubcategories();
        this.getListCategories();
        if(this.selectedCategory>'0'){
            this.getCategory(this.selectedCategory);
        }        
    }
    
    //--------------------------------------------------------------------------------------------

    

    nuevaCategoria: any = {
      category_name: this.IRI_route+this.selectedCategory,
      subcategory: []
    };

    nuevaSubcategoria: any = {
      subcategory_name: ''
    };
    
      addSubcategory() {
        if (this.nuevaSubcategoria.subcategory_name!=""){
            this.nuevaCategoria.category_name = "/api/categories/"+this.selectedCategory;
            let subcategory=new Subcategory(this.nuevaCategoria.category_name, this.nuevaSubcategoria.subcategory_name);
            this.newSubcategory(subcategory);
        }
      }
      
    //----------------------------------------------------------------------------------------------

     // Get the list of all subcategories
     getListSubcategories(){    
        this.apiService
            .getAll('subcategories')
            .pipe(map(data => {
                this.listSubcategories=data;
                console.log("Subcategorias ",this.listSubcategories);
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Subcategorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
            
    }

    // Get the list of all categories
    getListCategories(){    
        this.apiService
            .getAll('categories')
            .pipe(map(data => {
                this.listCategories=data;
                console.log("Categorias ",this.listCategories);
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Categorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    //obtener una categoria por ID
    getCategory(category:string){
        console.log(category);
        this.nuevaCategoria = {
            category_name: '/api/categories/'+this.selectedCategory,
            subcategory: []
          };
        this.apiService
            .getId('categories',parseInt(category))
            .pipe(map(data => {
                this.nuevaCategoria=data;
                this.enableSubcategoryInput=false;
                console.log("Categoria ",category,' ',this.nuevaCategoria);
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Categoria obtenida.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    // Add a new subcategory (post)
    newSubcategory(subcategory:any){
        this.apiService
            .postInTable('subcategories',subcategory).pipe(map(data => {this.getCategory(this.selectedCategory);/* this.listSubcategories.push(data); */}))
            .subscribe({
                next: function(){console.log('Subcategoria guardada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Update a subcategory (PUT) 
    updateSubcategory(id:number, subcategoryName:string) {
        //let subcategory=new Subcategory(subcategoryName, this.listSubcategories);//****************************************************************** */
        if (subcategoryName!=""){
            let subcategory=new Subcategory(this.IRI_route+this.selectedCategory, subcategoryName);
            this.apiService
                .putInTable('subcategories',id, subcategory).pipe(map(data => {/* this.getListSubcategories() */}))
                .subscribe({
                    next: function(){console.log('Subcategoria actualizada.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a subcategory   
    deleteSubcategory(id:number) {
        this.apiService
            .deleteFromTable('subcategories',id).pipe(map(data => {this.getCategory(this.selectedCategory);}))
            .subscribe({
                next: function(){console.log('Subategoria eliminada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}


