const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const { expect } = Code;
const { beforeEach, afterEach, describe, it } = exports.lab = Lab.script();

const fs = require('fs');
const Sinon = require('sinon');
const { transform, outputCsv, uploadToS3 } = require('../utils');

describe('Utils', () => {
    let s3Mock;

    beforeEach(() => {
        s3Mock = {
            upload: Sinon.stub().returns({ promise: Sinon.stub().resolves() })
        };
        Sinon.stub(fs, 'readFileSync').returns('file-content');
    });

    afterEach(() => {
        Sinon.restore();
    });

    describe('transform', () => {
        it('should correctly transform station data', async () => {
          const sampleData = {
            data: {
              stations: [
                {
                  eightd_has_key_dispenser: false,
                  capacity: 19,
                  station_id: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                  external_id: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                  eightd_station_services: [],
                  has_kiosk: true,
                  name: 'Michigan Ave & Madison St',
                  lon: -87.625125,
                  rental_methods: ['KEY', 'CREDITCARD', 'TRANSITCARD'],
                  electric_bike_surcharge_waiver: false,
                  lat: 41.882134,
                  short_name: '13036',
                  station_type: 'classic',
                  rental_uris: {
                    ios: 'https://chi.lft.to/lastmile_qr_scan',
                    android: 'https://chi.lft.to/lastmile_qr_scan',
                  }
                },
                {
                  eightd_has_key_dispenser: false,
                  capacity: 10,
                  station_id: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                  external_id: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                  eightd_station_services: [],
                  has_kiosk: true,
                  name: 'Michigan Ave & Madison St',
                  lon: -87.625125,
                  rental_methods: ['KEY', 'CREDITCARD', 'TRANSITCARD'],
                  electric_bike_surcharge_waiver: false,
                  lat: 41.882134,
                  short_name: '13036',
                  station_type: 'classic',
                  rental_uris: {
                    ios: 'https://chi.lft.to/lastmile_qr_scan',
                    android: 'https://chi.lft.to/lastmile_qr_scan',
                  },
                },
              ],
            },
          };

            const result = transform(sampleData);
            expect(result).to.be.an.array().and.to.have.length(1);
        });
    });

    describe('outputCsv', () => {
        it('should convert data to CSV format', async () => {
          const sampleData = [
            {
                eightd_has_key_dispenser: false,
                capacity: 10,
                stationId: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                externalId: 'a3a795d7-a135-11e9-9cda-0a87ae2ba916',
                eightd_station_services: [],
                has_kiosk: true,
                name: 'Michigan Ave & Madison St',
                lon: -87.625125,
                electric_bike_surcharge_waiver: false,
                lat: 41.882134,
                short_name: '13036',
                station_type: 'classic'
              }
          ];

            const csv = outputCsv(sampleData);
            expect(csv).to.be.a.string();
        });
    });

    describe('uploadToS3', () => {
        it('should upload data to S3', async () => {
            await uploadToS3(s3Mock, 'path-to-file');

            expect(s3Mock.upload.calledWith(Sinon.match({
                Key: 'data.csv',
                Body: 'file-content'
            }))).to.be.true();
        });
    });
});
