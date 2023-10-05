const Hapi = require('@hapi/hapi');
const { transform, outputCsv, uploadToS3 } = require('./utils');
const axios = require('axios');
const fs = require('fs');
const aws = require('aws-sdk');
const s3 = new aws.S3();
require('dotenv').config();


const { API_TOKEN } = process.env;

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

server.route({
    method: 'post',
    path: '/processStations',
    handler: async (request, h) => {
        try {
            const token = request.headers['x-api-token'];
            if (!token || token !== API_TOKEN) {
                return h.response({ message: "Unauthorized" }).code(401);
            }

            const EXTERNAL_URL = process.env.EXTERNAL_URL;
            const { data } = await axios.get(EXTERNAL_URL);
            const transformedData = transform(data);
            const csv = outputCsv(transformedData);

            fs.writeFileSync('/tmp/data.csv', csv);
            await uploadToS3(s3, '/tmp/data.csv');

            return h.response(csv).code(200);
        } catch (error) {
            console.error(error);
            return h.response({ message: 'Internal Server Error' }).code(500);
        }
    }
});

//start only in local mode, not lambda
if (require.main === module) {
    const init = async () => {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    };

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    init();
}

module.exports = server;
