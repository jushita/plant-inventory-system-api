export class Plant {
    public id: string;
    public name: string;
    public description: string;
    public resource: string;
    public status: string;
    constructor(id: string, name: string, description: string, resource: string, status: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.resource = resource;
        this.status = status;

    }
}