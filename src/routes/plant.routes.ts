import { PlantService } from "../services/plant.service";
import { Plant } from "../models/plant";
import { Response, Request, Router } from 'express';
import { Logger } from "../services/logger";
import multer = require('multer');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
var s3 = new aws.S3({ /* ... */ })

let storage = multerS3({
    s3: s3,
    bucket: 'plants-jushita',
    metadata: function (req, file, cb) {
        console.log(req);
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(req);
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});
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
                console.log(`here and getting list of plants`)
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
            const PlantName = req.body.PlantName;
            const PlantDescription = req.body.PlantDescription;
            const PlantResource = req.body.PlantResource;
            const PlantStatus = req.body.PlantStatus;
            const id = uuid.v4();
            let newPlant = new Plant(id, PlantName, PlantDescription, PlantResource, PlantStatus);
            try {
                await this.plantService.create(newPlant);
                console.log(`Plant added Successfully`);
            } catch (e) {
                console.log(e)
                return res.status(500).json(e);
            }
            return res.status(200).json(newPlant);
        });

        this.router.post('/plants/upload', upload.single('plantResource'), async (req: Request, res: Response) => {
            try {
                if (!req.file) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    let photo = req.file;
                    res.send({
                        status: true,
                        message: 'File uploaded',
                        data: {
                            name: photo.originalname,
                            size: photo.size
                        }
                    });
                }
            } catch (e) {
                console.log(`Error while uploading image`);
            }
        });

        this.router.put('/plants/:id', async (req: Request, res: Response) => {
            let id = req.params.id;
            const PlantName = req.body.PlantName;
            const PlantDescription = req.body.PlantDescription;
            const PlantResource = req.body.PlantResource;
            const PlantStatus = req.body.PlantStatus;
            let updatedPlant = new Plant(id, PlantName, PlantDescription, PlantResource, PlantStatus);
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


