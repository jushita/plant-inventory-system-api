import { PlantService } from "../services/plant.service";
import { Plant } from "../models/plant";
import { Response, Request, Router } from 'express';

export class PlantRoutes {
    public static routes(): Router {
        let routes: PlantRoutes = new this(Router());
        routes.bootstrap();
        return routes.getRouter();
    }

    private readonly plantService: PlantService;
    private readonly router: Router

    constructor(router: Router) {
        this.router = router;
        this.plantService = PlantService.instance;

    }

    public getRouter(): Router {
        return this.router;
    }

    public bootstrap(): void {
        this.router.get('/plants', async (req: Request, res: Response) => {
            let listOfPlants: Plant[];
            try {
                listOfPlants = await this.plantService.getAll();
            } catch (e) {
                console.log(e);
                return res.status(500).json(e);
            }
            return res.status(200).json(listOfPlants);
        });

        this.router.get('/plants/:id', async (req: Request, res: Response) => {
            let id = req.params.id
            let plant: Plant;
            try {
                plant = await this.plantService.getbyId(id)
            } catch (e) {
                return res.status(500).json(e);
            }

            return res.status(200).json(plant);
        })
    }
}    
