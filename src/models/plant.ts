export class Plant {
    public id: string;
    public pname: string;
    public description: string;
    public resource: string;
    public pstatus: string;
    constructor(id: string, pname: string, description: string, resource: string, pstatus: string) {
        this.id = id;
        this.pname = pname;
        this.description = description;
        this.resource = resource;
        this.pstatus = pstatus;

    }
}