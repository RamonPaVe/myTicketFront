export class User{

    username:string="";
    surname:string="";
    password:string="";
    dni:string="";
    active:boolean=true;
    userEmail:string="";
    userPhone:string="";
    idCenter:string="";
    

    constructor(username:string, surname:string, password:string, dni:string, active:boolean, userEmail:string, userPhone:string, idCenter:string){
        this.username = username;
        this.surname = surname;
        this.userEmail = userEmail;
        this.password = password;
        this.userPhone = userPhone;
        this.dni = dni;
        this.idCenter = idCenter;
        this.active = active;
    }
}