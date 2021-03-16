import { Plant } from "../models/plant";
import * as AWS from 'aws-sdk';
import { DynamoDB } from "aws-sdk";
import { Logger } from "./logger";

const LOGGER = Logger.getLogger();

export class PlantService {
    private static _instance: PlantService;
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public IS_OFFLINE = process.env.NODE_ENV !== 'production';
    public PLANTS_TABLE = process.env.TABLE;

    public dynamoDb: DynamoDB.DocumentClient;

    private constructor() {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });
    }

    public async getAll(): Promise<Plant[]> {
        let result;
        const params = {
            TableName: this.PLANTS_TABLE
        };
        try {
            result = await this.dynamoDb.scan(params).promise();
        } catch (e) {
            LOGGER.error(e);
            throw e;
        }
        return result.Items as Plant[]

    }

    public async getbyId(PlantId: string): Promise<Plant> {
        let result: DynamoDB.DocumentClient.QueryOutput;
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: this.PLANTS_TABLE,
            KeyConditionExpression: "PlantId = :PlantId",
            ExpressionAttributeValues: {
                ":PlantId": PlantId
            }
        };
        try {
            result = await this.dynamoDb.query(params).promise();

        } catch (e) {
            LOGGER.error(e);
            throw e;
        }
        if (result.Count === 0) return null;
        return result.Items[0] as Plant;

    }

    public async create(plant: Plant): Promise<Plant> {
        const params = {
            TableName: this.PLANTS_TABLE,
            Item: plant
        }
        let image = plant.PlantResource;
        try {
            await this.dynamoDb.put(params).promise();
        } catch (e) {
            LOGGER.error(e);
            throw e;
        }
        return plant;
    }

    public async update(plant: Plant): Promise<Plant> {
        const params = {
            TableName: this.PLANTS_TABLE,
            Key: {
                "PlantId": plant.PlantId
            },
            UpdateExpression: "set PlantName = :n, PlantDescription=:d, PlantResource=:r, PlantStatus=:s",
            ExpressionAttributeValues: {
                ":n": plant.PlantName,
                ":d": plant.PlantDescription,
                ":r": plant.PlantResource,
                ":s": plant.PlantStatus
            },
        };

        try {
            await this.dynamoDb.update(params).promise();
        } catch (e) {
            LOGGER.error(e);
            throw e;
        }
        return plant;

    }

    public async delete(PlantId: string) {
        const params = {
            TableName: this.PLANTS_TABLE,
            Key: {
                "PlantId": PlantId,
            },
        };

        try {
            await this.dynamoDb.delete(params).promise();
        } catch (e) {
            LOGGER.error(e);
            throw (e);
        }

    }
}