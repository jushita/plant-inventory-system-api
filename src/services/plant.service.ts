import { Plant } from "../models/plant";
import * as AWS from 'aws-sdk';
import { DynamoDB } from "aws-sdk";
import { Types } from "aws-sdk/clients/acm";
import { json } from "express";


export class PlantService {
    private static _instance: PlantService;
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public IS_OFFLINE = process.env.NODE_ENV !== 'production';
    public PLANTS_TABLE = process.env.TABLE;

    public dynamoDb: DynamoDB.DocumentClient;

    private constructor() {
        this.dynamoDb = this.IS_OFFLINE === true ?
            new AWS.DynamoDB.DocumentClient({
                region: 'us-east-2',
                endpoint: 'http://127.0.0.1:8080',
            }) :
            new AWS.DynamoDB.DocumentClient();
    }

    public async getAll(): Promise<Plant[]> {
        let result;
        const params = {
            TableName: this.PLANTS_TABLE
        };
        try {
            result = await this.dynamoDb.scan(params).promise();
        } catch (e) {
            console.log(e);
            throw e;
        }
        return result.Items as Plant[]

    }

    public async getbyId(id: string): Promise<Plant> {
        let result: DynamoDB.DocumentClient.QueryOutput;
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: this.PLANTS_TABLE,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        try {
            result = await this.dynamoDb.query(params).promise();

        } catch (e) {
            console.log(e);
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
        try {
            await this.dynamoDb.put(params).promise();
        } catch (e) {
            console.log(e);
            throw e;
        }
        return plant;
    }

    public async update(plant: Plant): Promise<Plant> {
        const params = {
            TableName: this.PLANTS_TABLE,
            Key: {
                "id": plant.id
            },
            UpdateExpression: "set pname = :n, description=:d, presource=:r, pstatus=:s",
            ExpressionAttributeValues: {
                ":n": plant.plantName,
                ":d": plant.plantDescription,
                ":r": plant.plantResource,
                ":s": plant.plantStatus
            },
        };

        try {
            await this.dynamoDb.update(params).promise();
        } catch (e) {
            console.log(e);
            throw e;
        }
        return plant;

    }

    public delete(id: string): Promise<Plant> {
        return
    }
}


// primitive Types
// structural Types 4 Types
// what is encapsulation
// how to do it in js
// getter and setter
// event loop in Node
// == ===
// component, diff module service component, pipe, directives, types of directives, lifescycle of ,
// glossary stuff
// type data input decorator
// injectable,  
