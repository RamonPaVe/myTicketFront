import { Component } from "@angular/core";
import { Category } from "../models/category.model";
import { HttpClient } from "@angular/common/http";


@Component({
    selector: "app-categorias",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.css"]
})

export class CategoryComponent{
    titulo="Gestión de categorias";
    nombre_categoria="";

    listaCategorias:Array<{category_name:string}>;

    constructor(private http: HttpClient){
        this.listaCategorias=[
            new Category("impresoras"),
            new Category("Ordenadores"),
            new Category("Programas"),
            new Category("Gestión de usuarios")
        ];
    }

    ngOnInit() {
    }

    guardarCategoria(){
        /* let nuevaCategoria=new Category(this.nombre_categoria);
        this.listaCategorias.push(nuevaCategoria); */
        this.getCategories();

       
    }

    getCategories(){
        this.http.get('http://127.0.0.1:8000/api/categories').subscribe(data => {
          console.log(data);
        });
    }

}