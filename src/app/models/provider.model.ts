export class Provider{
    providerName:string="";
    providerEmail:string="";
    providerPhone:string="";

    constructor(providerName:string, providerEmail:string, providerPhone:string) {
        this.providerName = providerName;
        this.providerEmail = providerEmail;
        this.providerPhone = providerPhone;
    }
}