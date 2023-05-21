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
import { CenterComponent } from './center/center.component';
import { UserComponent } from './user/user.component';
import { StateComponent } from './state/state.component';
import { GroupComponent } from './group/group.component';
import { PriorityComponent } from './priority/priority.component';
import { LevelComponent } from './level/level.component';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';
import { ProviderComponent } from './provider/provider.component';

const appRoutes: Routes = [
  {path:"", component: AppComponent},
  {path:"category", component: CategoryComponent,},
  {path:"category/:id", component: CategoryComponent,},
  {path:"subcategory", component:SubcategoryComponent},
  {path:"subcategory/:id", component:SubcategoryComponent},
  {path:"ticket", component:TicketComponent},
  {path:"center", component:CenterComponent},
  {path:"center/:id", component:CenterComponent},
  {path:"user", component:UserComponent},
  {path:"user/:id", component:UserComponent},
  {path:"state", component:StateComponent},
  {path:"group", component:GroupComponent},
  {path:"group/:id", component:GroupComponent},
  {path:"priority", component: PriorityComponent,},
  {path:"priority/:id", component: PriorityComponent,},
  {path:"level", component:LevelComponent},
  {path:"level/:id", component:LevelComponent},
  {path:"ticket-type", component:TicketTypeComponent},
  {path:"ticket-type/:id", component:TicketTypeComponent},
  {path:"provider", component:ProviderComponent},
  {path:"provider/:id", component:ProviderComponent},
];

@NgModule({
  declarations: [
    AppComponent, 
    CategoryComponent, 
    SubcategoryComponent, 
    TicketComponent, 
    CenterComponent, 
    UserComponent, 
    StateComponent, 
    GroupComponent, 
    PriorityComponent, 
    LevelComponent, 
    TicketTypeComponent, 
    ProviderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
