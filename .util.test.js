// utils.test.js
const { transform, outputCsv, uploadToS3 } = require('./utils');
const fs = require('fs');
jest.mock('fs');

describe('transform', () => {
  it('should correctly transform station data', () => {
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

    
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });
});

describe('outputCsv', () => {
    it('should convert data to CSV format', () => {
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
  
      expect(typeof csv).toBe('string');
    });
  });

  describe('uploadToS3', () => {
    it('should upload data to S3', async () => {
      fs.readFileSync.mockReturnValue('file-content');
  
      const s3Mock = {
        upload: jest.fn().mockReturnValue({
          promise: jest.fn()
        })
      };
  
      await uploadToS3(s3Mock, 'path-to-file');
  
      expect(s3Mock.upload).toHaveBeenCalledWith(
        expect.objectContaining({
          Key: 'data.csv',
          Body: 'file-content'
        })
      );
    });
  });
