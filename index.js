const { transform, outputCsv, uploadToS3 } = require('./utils');
const axios = require('axios');
const fs = require('fs');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const { API_TOKEN } = process.env;


module.exports.handler = async (event) => {
    try {
        const token = event.headers['x-api-token'];
        if (!token || token !== API_TOKEN) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Unauthorized" })
            };
        }
        const EXTERNAL_URL = process.env.EXTERNAL_URL;
        const { data } = await axios.get(EXTERNAL_URL);
        const transformedData = transform(data);
        const csv = outputCsv(transformedData);
        
        fs.writeFileSync('/tmp/data.csv', csv);
        await uploadToS3(s3, '/tmp/data.csv');
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data processed successfully!' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
