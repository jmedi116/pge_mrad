const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const { expect } = Code;
const { describe, it } = exports.lab = Lab.script();

const { transform } = require('../utils');

describe('API Call', () => {
    it('should transform the data correctly', async () => {
        const mockData = {
            data: {
                stations: [
                    {
                        external_id: '1',
                        station_id: '10',
                        legacy_id: '100',
                        capacity: 10
                    },
                    {
                        external_id: '2',
                        station_id: '20',
                        legacy_id: '200',
                        capacity: 15
                    }
                ]
            }
        };

        const result = transform(mockData);
        expect(result).to.be.an.array().and.to.have.length(1);
        expect(result[0].externalId).to.equal('1');
    });
});
