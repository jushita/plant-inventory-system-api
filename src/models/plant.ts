export class Plant {
    public PlantId: string;
    public PlantName: string;
    public PlantDescription: string;
    public PlantResource: string;
    public PlantStatus: string;

    constructor(PlantId: string, PlantName: string, PlantDescription: string, PlantResource: string, PlantStatus: string) {
        this.PlantId = PlantId;
        this.PlantName = PlantName;
        this.PlantDescription = PlantDescription;
        this.PlantResource = PlantResource;
        this.PlantStatus = PlantStatus;

    }
}