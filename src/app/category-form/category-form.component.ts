import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  categoriaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      categorias: this.formBuilder.array([
        this.crearCategoria()
      ])
    });
  }

  crearCategoria(): FormGroup {
    return this.formBuilder.group({
      nombre: '',
      subcategorias: this.formBuilder.array([])
    });
    
  }

  get categorias() {
    return this.categoriaForm.get('categorias') as FormArray;
  }

  agregarCategoria() {
    this.categorias.push(this.crearCategoria());
    console.log(this.categorias);
  }

  agregarSubcategoria(i: number) {
    const categoria = this.categorias.at(i);
    const subcategorias = categoria.get('subcategorias') as FormArray;
    subcategorias.push(this.formBuilder.control(''));
  }

  getSubcategorias(categoria: AbstractControl): FormArray | null {
    if (categoria instanceof FormGroup) {
      return categoria.get('subcategorias') as FormArray;
    }
    return null;
  
}
}
