import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

    listaCategorias:any;

    //Injecting services
    constructor(
        private changeDetector:ChangeDetectorRef,
        public apiService: ApiService, 
        private route:ActivatedRoute,
        private router:Router){}

    listCategories:any;
        selectedCategory="-1";
        enableSubcategoryInput=true;
        listSubcategory: any = {
            category_name: "/api/categories/"+this.selectedCategory,
            subcategory: []
          };
        selectedSubcategory="-1"
    listCenters:any;
        selectedCenter="-1";
    listaGrupos:any;
        selectedGoup="-1";
    listaNiveles:any;
        selectedLevel="-1";
        enablePriorityInput=true;
        listPriorities: any = {
            level_name: "/api/levels/"+this.selectedLevel,
            id_priority: []
        };
    //listPriorities:any;
        selectedPriority="-1";
    listProviders:any;
        selectedProvider="-1";
    listStates:any;
        selectedState="-1";
    listTicketTypes:any;
        selectedTycketType="-1";
    listUsers:any;



    
    

    ngOnInit() {
       this.getListCenters();
       this.getListCategories();
       this.getListGroups();
       this.getListLevels();
       this.getListPriorities();
       this.getListProviders();
       this.getListStates();
       this.getListTicketTypes();       
    }

    // Get the list of all categories
    getListCategories(){  
        this.enableSubcategoryInput=true; 
        this.selectedSubcategory="-1"; 
        this.apiService
            .getAll('categories')
            .pipe(map(data => {
                this.listCategories=data;
                console.log("Categorias ",this.listCategories);
                // this.changeDetector.detectChanges();
                if (this.selectedCategory!="-1"){
                    this.getSubcategoryByCategoryId(this.selectedCategory);
                    this.enableSubcategoryInput=false;
                }
            }))
            .subscribe({
                next: function(){console.log('Categorias obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all subcategories depending of selected category
    getSubcategoryByCategoryId(category:string){   
            console.log(category);
            this.listSubcategory = {
                category_name: '/api/categories/'+this.selectedCategory,
                subcategory: []
              };
            this.apiService
                .getId('categories',parseInt(category))
                .pipe(map(data => {
                    this.listSubcategory=data;
                    
                    console.log("Categoria ",category,' ',this.listSubcategory);
                    
                }))
                .subscribe({
                    next: function(){console.log('Categoria obtenida.');},
                    error: function(err){console.log('Ocurrio un error: ', err);},
                    complete: function(){}
                });
        
    }

    // Get the list of all the centers
    getListCenters(){    
        this.apiService
            .getAll('centers')
            .pipe(map(data => {
                this.listCenters=data;
                console.log("Centers: ",this.listCenters);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Centros obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all groups
    getListGroups(){    
        this.apiService
            .getAll('groups')
            .pipe(map(data => {
                this.listaGrupos=data;
                console.log("Grupos: ",this.listaGrupos);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Grupos obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all levels
    getListLevels(){  
        this.enablePriorityInput=true; 
        this.selectedPriority="-1";  
        this.apiService
            .getLevels()
            .pipe(map(data => {
                this.listaNiveles=data;
                console.log("Niveles: ",this.listaNiveles);
                // this.changeDetector.detectChanges();
                if (this.selectedLevel!="-1"){
                    this.getPriorityByLevelId(this.selectedLevel);
                    this.enablePriorityInput=false;
                }
            }))
            .subscribe({
                next: function(){console.log('Niveles obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all priorities
    getListPriorities(){    
        this.apiService
            .getPriorities()
            .pipe(map(data => {
                this.listPriorities=data;
                console.log("Prioridades: ",this.listPriorities);
                // this.changeDetector.detectChanges();
                
            }))
            .subscribe({
                next: function(){console.log('Prioridades obtenidas.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });  
    }

    // Get the list of all the providers
    getListProviders(){    
        this.apiService
            .getAll('providers')
            .pipe(map(data => {
                this.listProviders=data;
                console.log("Proveedores: ",this.listProviders);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Proveedores obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all the centers
    getListStates(){    
        this.apiService
            .getAll('states')
            .pipe(map(data => {
                this.listStates=data;
                console.log("Estados: ",this.listStates);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Estados obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    // Get the list of all the ticketTypes
    getListTicketTypes(){    
        this.apiService
            .getAll('ticket_types')
            .pipe(map(data => {
                this.listTicketTypes=data;
                console.log("Tipos de servicio: ",this.listTicketTypes);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Tipos de servicio obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

     // Get the list of all the users
     getListUsers(){    
        this.apiService
            .getAll('users')
            .pipe(map(data => {
                this.listUsers=data;
                console.log("Usuarios: ",this.listUsers);
                // this.changeDetector.detectChanges();
            }))
            .subscribe({
                next: function(){console.log('Usuarios obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }


    //---------------------------------------
    getPriorityByLevelId(level:string){
        console.log(level);
        this.listPriorities = {
            levelName: "/api/levels/"+this.selectedLevel,
            idPriority: []
            };
        this.apiService
            .getId('levels',parseInt(level))
            .pipe(map(data => {
                this.listPriorities=data;
                this.enablePriorityInput=false;
                console.log("Level: ",level,' ',this.listPriorities);
            }))
            .subscribe({
                next: function(){console.log('Nivel obtenido.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        





    }




}
