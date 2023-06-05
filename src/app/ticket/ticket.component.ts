import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ApiService } from "../services/httpClientService.service";
import { map } from "rxjs/internal/operators/map";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import * as M from 'materialize-css';
import 'jquery';
import * as $ from 'jquery';
import { Ticket } from "../models/ticket.model";
import { Notes } from "../models/notes.model";

interface UserList {
    id: number;
    name: string;
    surname: string;
  }
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})


export class TicketComponent implements OnInit{

    listaCategorias:any;

    //Injecting services
    constructor(
        public apiService: ApiService, 
        private route:ActivatedRoute,
        private router:Router){}

        apellidoControl = new FormControl();
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
        selectedGroup="-1";
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
        surname: string;
        selectedUser="-1";
        users: UserList [];

        results: UserList[];
       // user:UserList;
    listUsersGroup:any= {
        group_name: "/api/groups/"+this.selectedGroup,
        users: []
    };
        selectedUserGroup="-1";
        enableUserGroupInput=true;

        phone_number="";
        email="";

        ticketId:string|null; //valor que se pasa en la ruta;
        ticketSelected='0';

        newUpdateTicket: any = {};
        updateTicket=false;

        summary:string="";
        description:string="";
        resolution:string="";
        modificationDate:string="";
        resolutionDate:string="";
        closeDate:string="";
        creatorUserId:string="9";// TODO: cambiar cuando se conecten por usuario
        creatorUser:string="";
        externalTicket:string="";   
        creationDate:string="";
        affectedUser:string="";
        id:number;

        hideNote=true;
        newNote:string="";



    ngOnInit() {
        M.updateTextFields(); 
        this.apellidoControl.valueChanges.subscribe(value => {
            if (value && value.length >= 3) {
            this.results = this.filterUsuarios(value);
            } else {
            this.results = [];
            }
        });
        this.getListUsers();
        this.getListCenters();
        this.getListTicketTypes();
        this.getListStates();
        this.getListCategories();
        this.getListLevels();
        this.getListGroups();
        this.getListProviders();

        this.ticketId=this.route.snapshot.paramMap.get("id");
        this.ticketSelected=this.ticketId !== null ? this.ticketId : '0';

        if(this.ticketSelected>'0'){
                this.searchTicket(this.ticketSelected);
        } 
               
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
                if (this.selectedCategory!="-1"){
                    this.getSubcategoryByCategoryId(this.selectedCategory);
                    this.enableSubcategoryInput=false;
                }
                setTimeout(() => M.AutoInit(), 10);
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
                    setTimeout(() => M.AutoInit(), 10);
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
                setTimeout(() => M.AutoInit(), 10);
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
                if (this.selectedGroup!="-1"){
                    this.getListUsersByGroup(this.selectedGroup);
                    this.enableUserGroupInput=false;
                }
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Grupos obtenidos.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    getListUsersByGroup(group:string){
        console.log(group);
        this.listUsersGroup = {
            group_name: '/api/groups/'+this.selectedGroup,
            users: []
          };
        this.apiService
            .getId('groups',parseInt(group))
            .pipe(map(data => {
                this.listUsersGroup=data;
                console.log("Usuarios del grupo ",group,': ',this.listUsersGroup);
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Usuarios del grupo obtenidos.');},
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
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Niveles obtenidos.');},
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
                setTimeout(() => M.AutoInit(), 10);
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
                setTimeout(() => M.AutoInit(), 10);
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
                setTimeout(() => M.AutoInit(), 10);
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
                setTimeout(() => M.AutoInit(), 10);
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
                setTimeout(() => M.AutoInit(), 10);
            }))
            .subscribe({
                next: function(){console.log('Nivel obtenido.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
    }

    filterUsuarios(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.listUsers.filter((user: { surname: string; }) =>
        user.surname.toLowerCase().includes(filterValue)
    );
  }

  displayUsuario(usuario: any): string {
        return usuario ? `${usuario.surname}, ${usuario.username}` : '';
  }

  seleccionarUsuario(usuario: any) {
        // Realiza alguna acción con el usuario seleccionado, por ejemplo:
        console.log('usuario seleccionado:',usuario);
        //this.user=usuario;
       // console.log('user seleccionado:',this.user);
        this.surname=usuario.surname + ', ' + usuario.username;
        this.phone_number=usuario.user_phone;
        this.email=usuario.user_email;
        this.selectedCenter=usuario.id_center.id;
        this.affectedUser=usuario.id;
        console.log(this.affectedUser);
  }

  comprobarValorIngresado(valor: string): boolean {
        const valorIngresado = valor.toLowerCase();
        const usuarioEncontrado = this.users.find(usuario =>
        usuario.surname.toLowerCase() === valorIngresado
        );
        console.log(this.results);
        return usuarioEncontrado !== undefined;
        
  }

  searchTicket(id: string){
        console.log('ticket seleccionado:',id);
        this.apiService
            .getId('tickets',parseInt(id))
            .pipe(map(data => {
                this.newUpdateTicket=data;
                console.log("ticket ",id,':',this.newUpdateTicket);
                this.updateTicket=true;
                this.id=parseInt(id);
                this.affectedUser=this.newUpdateTicket.affected_user.id;
                this.surname=this.newUpdateTicket.affected_user.surname+', '+this.newUpdateTicket.affected_user.username;
                this.phone_number=this.newUpdateTicket.affected_user_phone;
                this.email=this.newUpdateTicket.affected_user_email;
                this.selectedCenter=this.newUpdateTicket.id_center.id;
                this.selectedTycketType=this.newUpdateTicket.id_ticketType.id;
                this.selectedState=this.newUpdateTicket.id_state.id;
                this.selectedCategory=this.newUpdateTicket.id_category.id;
                this.getSubcategoryByCategoryId(this.selectedCategory);
                this.enableSubcategoryInput=false;
                try {
                    this.selectedSubcategory=this.newUpdateTicket.id_subcategory.id;
                } catch (error) {
                    this.selectedSubcategory='-1';
                }
                this.selectedLevel=this.newUpdateTicket.id_level.id;
                this.getPriorityByLevelId(this.selectedLevel);
                this.enablePriorityInput=false;
                try {
                    this.selectedPriority=this.newUpdateTicket.id_priority.id;
                } catch (error) {
                    this.selectedPriority='-1';
                }
                this.selectedGroup=this.newUpdateTicket.assigned_group.id;
                this.getListUsersByGroup(this.selectedGroup);
                this.enableUserGroupInput=false;
                try {
                    this.selectedUserGroup=this.newUpdateTicket.assigned_user_id.id;
                } catch (error) {
                    this.selectedUserGroup='-1';
                }
                try {
                    this.selectedProvider=this.newUpdateTicket.id_provider.id;
                } catch (error) {
                    this.selectedProvider='-1';
                }
                this.summary=this.newUpdateTicket.summary;
                this.description=this.newUpdateTicket.description;
                this.resolution=this.newUpdateTicket.resolution;
                this.modificationDate=this.newUpdateTicket.modificationDate;
                this.resolutionDate=this.newUpdateTicket.resolutionDate;
                this.closeDate=this.newUpdateTicket.close_date;
                this.creatorUser=this.newUpdateTicket.creator_user_id.surname+', '+this.newUpdateTicket.creator_user_id.username;
                this.externalTicket=this.newUpdateTicket.external_ticket;
                this.creationDate=this.newUpdateTicket.creation_date;

                // This make the materialize.css fields to refresh
                setTimeout(() => M.AutoInit(), 10);
                setTimeout(() => M.updateTextFields(), 10);
                setTimeout(() => M.textareaAutoResize($('#description')), 10);
                setTimeout(() => M.textareaAutoResize($('#resolution')), 10);

                /* aqui van las notas */

            }))
            .subscribe({
                next: function(){console.log('ticket obtenido.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
  }

  selecciona(){
       
    
  }

  returnCorrectValueField(field:string,selection:string){
        let iri_field='/api/'+field+'/';
        let valueField: string |null = null;
        if (selection=='-1'){
            valueField=null;
        } else {
            valueField=iri_field+selection;
        }
        return valueField;
  }


  save(id:number){
        if(!this.updateTicket){  //new ticket
            let ticket=new Ticket('/api/users/'+this.affectedUser, this.phone_number, this.email, '/api/centers/'+this.selectedCenter,
                '/api/ticket_types/'+this.selectedTycketType, '/api/states/'+this.selectedState, '/api/categories/'+this.selectedCategory, 
                this.returnCorrectValueField('subcategories',this.selectedSubcategory), '/api/levels/'+this.selectedLevel,
                this.returnCorrectValueField('priorities',this.selectedPriority), '/api/groups/'+this.selectedGroup,
                this.returnCorrectValueField('users',this.selectedUserGroup), this.returnCorrectValueField('providers',this.selectedProvider),
                this.summary, this.externalTicket, this.description, this.resolution,'/api/users/'+this.creatorUserId,
                new Date()/*creation date */, null, null, null, []);

            this.apiService.postInTable('tickets',ticket).pipe(map(data => {
                
            }))
            .subscribe({
                next: function(){console.log('Ticket guardado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        } else{ //update ticket
            let resDate:Date;
            if (this.resolution.length>0 && this.resolutionDate==undefined){
                resDate=new Date();
            }else {
                resDate=new Date(this.resolutionDate);
            }
            let ticket=new Ticket('/api/users/'+this.affectedUser, this.phone_number, this.email, '/api/centers/'+this.selectedCenter,
                '/api/ticket_types/'+this.selectedTycketType, '/api/states/'+this.selectedState, '/api/categories/'+this.selectedCategory, 
                this.returnCorrectValueField('subcategories',this.selectedSubcategory), '/api/levels/'+this.selectedLevel,
                this.returnCorrectValueField('priorities',this.selectedPriority), '/api/groups/'+this.selectedGroup,
                this.returnCorrectValueField('users',this.selectedUserGroup), this.returnCorrectValueField('providers',this.selectedProvider),
                this.summary, this.externalTicket, this.description, this.resolution,'/api/users/'+this.creatorUserId,
                new Date(this.creationDate), new Date()/*Modification Date is now*/,resDate /*Resolution date */, null, []);
            this.apiService.putInTable('tickets',id,ticket).pipe(map(data => {
                              
            }))
            .subscribe({
                next: function(){console.log('Ticket actualizado.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });
        }
  }

  deleteTicket(id:number){
    if (this.id>0){
        this.apiService.deleteFromTable('tickets',id).pipe(map(data => {
            this.routeToTicket();
        }))
        .subscribe({
            next: function(){console.log('Ticket eliminado.');},
            error: function(err){console.log('Ocurrio un error: ', err);},
            complete: function(){}
        });
    }
  }

    changeStateNote(){
        if (this.id>0){
            this.hideNote=!this.hideNote;
        }
    }

    saveNewNote(){
        if (this.newNote!=""){
            let note= new Notes(this.newNote,new Date(), new Date(),'/api/users/'+this.creatorUserId,'/api/tickets/'+this.id.toString())
            console.log("",note);
            this.apiService.postInTable('notes',note).pipe(map(data => {
                this.newNote="";
                this.changeStateNote();
                this.searchTicket(this.id.toString())
            }))
            .subscribe({
                next: function(){console.log('Nueva nota guardada.');},
                error: function(err){console.log('Ocurrio un error: ', err);},
                complete: function(){}
            });







        }
    }





  


    routeToTicket() {
    this.router.navigate(['/']);
}
}
