'use strict';

const express = require('express');
const body_parser = require('body-parser');
const expressGraphQL = require('express-graphql');
const GraphQLSchema = require('./graphql/schema');

const app = express();
app.use( body_parser.json({ limit: '50mb' }) );

app.use('/graphql',(req,res,next)=>{

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Allow', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}, expressGraphQL({
    schema: GraphQLSchema,
    graphiql: true
}));

module.exports = app;
