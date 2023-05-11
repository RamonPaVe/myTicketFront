import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  serverApi = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  // GET ---------------------------------------------------------------------------
  getCategories(){
    console.log("solicitando categorias a ..."+`${this.serverApi}/categories.json`);
    return this.http.get(`${this.serverApi}/categories.json`);
  }
  // POST --------------------------------------------------------------------------
  postCategories(category: Category) {
    return this.http.post(`${this.serverApi}/categories.json`, category);
  }
  // PUT ---------------------------------------------------------------------------
  /* putCategories(category: Category) {
    return this.http.put(`${this.serverApi}/categories/?id=${id}`, category);
  } */
  // DELETE-------------------------------------------------------------------------
  deleteCategories(id: string | number) {
    return this.http.delete(`${this.serverApi}/categories/${id}`);
  }


    /* this.http.get('http://127.0.0.1:8000/api/categories.json').subscribe(data => {this.value=data}
      console.log(data);

      value = JSON.stringify(data);
      //console.log(value);
      obj = JSON.parse(value);
      console.log('id:', obj[0].id);
      console.log('Category name:', obj[0].category_name);
      for (let i = 0; i < obj[0].subcategory.length; i++){
        this.http.get('http://127.0.0.1:8000'+obj[0].subcategory[i]+'.json').subscribe(subcat => {
          let subcate= JSON.stringify(subcat);
          let objSubcat=JSON.parse(subcate);
          console.log('sub-id:',objSubcat.id,' - ',objSubcat.subcategory_name)  ;
        });
      }
    }) ;
       */
}