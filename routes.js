const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const PLANTS_TABLE = process.env.TABLE;

const dynaboDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'us-east-2',
        endpoint: 'http://127.0.0.1:8080',
    }) :
    new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.get('/plants', (req, res) => {
    const params = {
        TableName: PLANTS_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if(error) {
            res.status(400).json({
                error: 'Error fetching plants'
            })
            res.json(result.Items);
        }
    });
});

router.get('/plants/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: PLANTS_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({
                error: `Error while retrieving Employee` 
            })
        }
        if (result.Item) {
            res.json(result.Item);
        } else {
            res.status(400).json({
                error: `Plant with id: ${id} not found`
            });
        }
    });
});