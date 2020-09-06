export class Plant {
    public id: string;
    public plantName: string;
    public plantDescription: string;
    public plantResource: string;
    public plantStatus: string;
    constructor(id: string, plantName: string, plantDescription: string, plantResource: string, plantStatus: string) {
        this.id = id;
        this.plantName = plantName;
        this.plantDescription = plantDescription;
        this.plantResource = plantResource;
        this.plantStatus = plantStatus;

    }
}
