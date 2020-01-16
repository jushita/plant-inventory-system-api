export class Plant {
    public id: string;
    public description: string;
    public resource: string;
    public status: string;
    constructor(id: string, description: string, resource: string, status: string) {
        this.id = id;
        this.description = description;
        this.resource = resource;
        this.status = status;

    }
}