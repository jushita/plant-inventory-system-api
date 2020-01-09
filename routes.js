const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const PLANTS_TABLE = process.env.TABLE;

const dynamoDb = IS_OFFLINE === true ?
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
        }
        res.json(result.Items);
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
                error: `Error while retrieving plants` 
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

router.post('/plants', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const resource = req.body.resource;
    const status = req.body.resource;
    const id = uuid.v4();

    const params = {
        TableName: PLANTS_TABLE,
        Item: {
            id,
            name,
            description,
            resource,
            status
        },
    };
    dynamoDb.put(params, (error) => {
        if(error) {
            res.status(400).json({
                error: 'Could not add plant'
            });
        }
        res.json({
            id,
            name,
            description,
            resource,
            status
        });
    });
});

router.delete('/plants/:id', (req, res) => {
    const id = req.params.id;

    const params = {
        TableName: PLANTS_TABLE,
        Key: {
            id
        }
    };

    dynamoDb.delete(params, (error) => {
        if (error) {
            res.status(400).json({
                error: 'Could not delete plant'
            });
        }
        res.json({
            success: true
        });
    });
});

router.put('/plants', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const resource = req.body.resource;
    const status = req.body.status;

    const params = {
        TableName: PLANTS_TABLE,
        Key: {
            id
        },
        UpdateExpression: 'set #name = :name, #description = :description, #resource = :resource, #status = :status',
        ExpressionAttributeValues: {
            ':name': name,
            ':description': description,
            ':resource': resource,
            'status': status
        },
        ReturnValues: 'ALL_NEW'
    }

    dynamoDb.update(params, (error, result) => {
        if (error) {
            res.status(400).json({
                error: 'Could not update plant'
            });
        }
        res.json(result.Attributes);
    });
});

module.exports = router;