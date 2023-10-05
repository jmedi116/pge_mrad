// utils.js
const { parse } = require('json2csv');
const _ = require('lodash');
const fs = require('fs');

function transform(data) {
    return data.data.stations
    .filter(station => station.capacity < 12)
    .map(station => {
        const omittedStation = _.omit(station, ['rental_methods', 'rental_uris', 'external_id', 'station_id', 'legacy_id']);
        return {
            ...omittedStation,
            externalId: station.external_id,
            stationId: station.station_id,
            legacyId: station.legacy_id
        };
    });
}

function outputCsv(data) {
    return parse(data);
}

async function uploadToS3(s3, path) {
    const fileContent = fs.readFileSync(path);
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'data.csv',
        Body: fileContent
    };
    
    await s3.upload(params).promise();
}

module.exports = { transform, outputCsv, uploadToS3 };
