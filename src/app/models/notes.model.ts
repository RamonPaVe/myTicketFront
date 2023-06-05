export class Notes{

    note:string="";
    modificationDate:Date;
    creationDate:Date;
    idUser:string="";
    idTicket="";

    constructor(note:string, modificationDate:Date, creationDate:Date, idUser:string, idTicket:string) {
        this.note = note;
        this.modificationDate = modificationDate;
        this.creationDate = creationDate;
        this.idUser = idUser;
        this.idTicket = idTicket;
    }
        
}