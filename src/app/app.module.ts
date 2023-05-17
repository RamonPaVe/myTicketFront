import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TicketComponent } from './ticket/ticket.component';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaFormComponent } from './category-form/category-form.component';

const appRoutes: Routes = [
  {path:"", component: AppComponent},
  {path:"category", component: CategoryComponent,},
  {path:"subcategory", component:SubcategoryComponent},
  {path:"ticket", component:TicketComponent}
];

@NgModule({
  declarations: [
    AppComponent, 
    CategoryComponent, 
    SubcategoryComponent, 
    TicketComponent, 
    CategoriaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
