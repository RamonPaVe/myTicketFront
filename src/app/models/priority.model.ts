export class Priority{
    priorityName:string="";
    level:string="";

    constructor(level:string, priorityName:string) {
        this.priorityName = priorityName;
        this.level = level;
    }
}