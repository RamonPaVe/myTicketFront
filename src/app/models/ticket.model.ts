export class Ticket{

    private _ticketId:string;
    
    // Detalles del solicitante:
    affectedUser:string="";
    affectedUserPhone:string | null=null;
    affectedUserEmail:String | null=null;
    idCenter:string="";

    // Detalles del servicio:
    idTicketType:string="";
    idState:string="";
    idCategory:string="";
    idSubcategory:string | null=null;
    idLevel:string="";
    idPriority:string | null=null;
    assignedGroup:string="";
    assignedUserId:string | null=null;
    idProvider:string | null=null;
    summary:string="";
    externalTicket:string | null=null;
    description:string="";
    resolution:string | null=null;
    creatorUserId:string="";
    creationDate:Date;
    modificationDate:Date | null;
    resolutionDate:Date | null;
    closeDate:Date | null;
    notes:string[]=[];
    // $this->notes = new ArrayCollection();

    constructor(
        affectedUser:string, affectedUserPhone:string | null, affectedUserEmail:string | null, idCenter:string, idTicketType:string,
        idState:string, idCategory:string, idSubcategory:string | null, idLevel:string, idPriority:string | null, assignedGroup:string,
        assignedUserId:string | null, idProvider:string | null, summary:string, externalTicket:string | null, description:string,
        resolution:string | null, creatorUserId:string, creationDate:Date, modificationDate:Date | null, resolutionDate:Date | null,
        closeDate:Date | null, notes:string[]
    ){
        this.affectedUser = affectedUser;
        this.affectedUserPhone=affectedUserPhone;
        this.affectedUserEmail=affectedUserEmail;
        this.idCenter=idCenter;
        this.idTicketType=idTicketType;
        this.idState=idState;
        this.idCategory=idCategory;
        this.idSubcategory=idSubcategory;
        this.idLevel=idLevel;
        this.idPriority=idPriority;
        this.assignedGroup=assignedGroup;
        this.assignedUserId=assignedUserId;
        this.idProvider=idProvider;
        this.summary=summary;
        this.externalTicket=externalTicket;
        this.description=description;
        this.resolution=resolution;
        this.creatorUserId=creatorUserId;
        this.creationDate=creationDate;
        this.modificationDate=modificationDate;
        this.resolutionDate=resolutionDate;
        this.closeDate=closeDate;
        this.notes=notes;        
    }
}