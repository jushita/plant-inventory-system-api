import { PlantService } from "../services/plant.service";
import { Plant } from "../models/plant";
import { Response, Request, Router } from 'express';
import { Logger } from "../services/logger";

const uuid = require('uuid');

const LOGGER = Logger.getLogger();

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
        });

        this.router.post('/plants', async (req: Request, res: Response) => {
            const name = req.body.name;
            const description = req.body.description;
            const resource = req.body.resource;
            const status = req.body.status;
            const id = uuid.v4();
            let newPlant = new Plant(id, name, description, resource, status);
            try {
                await this.plantService.create(newPlant);
            } catch (e) {
                return res.status(500).json(e);
            }
            return res.status(200).json(newPlant);

        });

        this.router.put('/plants/:id', async (req: Request, res: Response) => {
            let id = req.params.id;
            const name = req.body.name;
            const description = req.body.description;
            const resource = req.body.resource;
            const status = req.body.status;
            let updatedPlant = new Plant(id, name, description, resource, status);
            try {
                await this.plantService.update(updatedPlant);
            } catch (e) {
                return res.status(500).json(e);
            }

            return res.status(200).json(updatedPlant);

        });

        this.router.delete('/plants/:id', async (req: Request, res: Response) => {
            let id = req.params.id;
            try {
                await this.plantService.delete(id);
            } catch (e) {
                LOGGER.error(e);
                return res.status(500).json(e);
            }
            return res.status(200).json('Plant deleted successfully')
        })

    }
}    
