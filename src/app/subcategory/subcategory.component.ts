import { Component, ChangeDetectorRef} from '@angular/core';
import { CategoryService } from '../category/category.service';
import { SubcategoryService } from './subcategory.service';
import { map } from "rxjs/internal/operators/map";
import { Subcategory } from '../models/subcategory.model';
import { materialize } from 'rxjs';
//import '../category/category.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {

    constructor(
        public categoryService: CategoryService, 
        public subcategoryService:SubcategoryService,
        private changeDetector:ChangeDetectorRef){}

    enableSubcategoryInput=true;
    listCategories:any;
    listSubcategories:any;
    titulo="Gestión de subcategorias";
    selectedCategory="-1";
    IRI_route="/api/categories/"; //IRI de categorias para las subcategorias
    
    ngOnInit() {
      //  this.getListSubcategories();
        this.getListCategories();
        
    }
    
    //--------------------------------------------------------------------------------------------

    categorias: any[];

    nuevaCategoria: any = {
      category_name: this.IRI_route+this.selectedCategory,
      subcategory: []
    };

    nuevaSubcategoria: any = {
      subcategory_name: ''
    };
    
      addSubcategory() {
        if (this.nuevaSubcategoria.subcategory_name!=""){
            this.nuevaCategoria.category_name = this.IRI_route+this.selectedCategory;
            let subcategory=new Subcategory(this.nuevaCategoria.category_name, this.nuevaSubcategoria.subcategory_name);
            this.newSubcategory(subcategory);
        }
      }
      
    //----------------------------------------------------------------------------------------------

     // Get the list of all subcategories
     getListSubcategories(){    
        this.subcategoryService
            .getSubcategories()
            .pipe(map(data => {
                this.listSubcategories=data;
                console.log("Subcategorias ",this.listSubcategories);
                
            }))
            .subscribe({
                next: function(){console.log('Subcategorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
            
    }

    // Get the list of all categories
    getListCategories(){    
        this.categoryService
            .getCategories()
            .pipe(map(data => {
                this.listCategories=data;
                console.log("Categorias ",this.listCategories);
                this.changeDetector.detectChanges();
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
        this.categoryService
            .getCategoryId(parseInt(category))
            .pipe(map(data => {
                this.nuevaCategoria=data;
                this.enableSubcategoryInput=false;
                console.log("Categoria ",category,' ',this.nuevaCategoria);
            }))
            .subscribe({
                next: function(){console.log('Categoria obtenida.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
    // Add a new subcategory (post)
    newSubcategory(subcategory:any){
        this.subcategoryService
            .postSubcategories(subcategory).pipe(map(data => {this.getCategory(this.selectedCategory);/* this.listSubcategories.push(data); */}))
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
            this.subcategoryService
                .putCategories(id, subcategory).pipe(map(data => {/* this.getListSubcategories() */}))
                .subscribe({
                    next: function(){console.log('Subcategoria actualizada.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        }
    }

    // Delete a subcategory   
    deleteSubcategory(id:number) {
        this.subcategoryService
            .deleteSubcategories(id).pipe(map(data => {this.getCategory(this.selectedCategory);}))
            .subscribe({
                next: function(){console.log('Subategoria eliminada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }
}


