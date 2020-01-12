import { Plant } from "../model/plant";
import * as AWS from 'aws-sdk';
import * as express from 'express';
import * as uuid from 'uuid';
import { DynamoDB } from "aws-sdk";

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
        const params = {
            TableName: this.PLANTS_TABLE
        };
        return new Promise((resolve, reject) => {
            this.dynamoDb.scan(params, (error, result) => {
                if(error) {
                    return reject(error);
                }
                // const plants = result.Items.map(plant => plant as Plant);
                resolve(result.Items as Plant[]);
            }) 
        })
        
    }

    public async getbyId(id: string): Promise<Plant> {
        return        
    }

    public async create(): Promise<Plant> {
        return
    }

    public update(id: string): Promise<Plant> {
        return
    }

    public delete(id: string): Promise<Plant> {
        return
    }
}