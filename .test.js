// test.js
const { transform } = require('./utils');
const assert = require('assert');

describe('API Call', function() {
    it('should transform the data correctly', function() {
        const mockData = {
            data: {
                stations: [
                    {
                        external_id: '1',
                        station_id: '10',
                        legacy_id: '100',
                        capacity: 10
                        // ... other properties
                    },
                    {
                        external_id: '2',
                        station_id: '20',
                        legacy_id: '200',
                        capacity: 15
                        // ... other properties
                    }
                ]
            }
        };

        const result = transform(mockData);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].externalId, '1');
    });
});
