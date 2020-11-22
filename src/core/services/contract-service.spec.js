import { ContractService, getContractApiEndpoint } from './contract-service';

describe('core/services/ContractService', () => {
  const service = new ContractService({ });

  it('expect to fetch data', async () => {
    const result = await service.fetch();

    console.log(result);
  });

  it('expect getContractApiEndpoint to return airtable url', () => {
    const url = getContractApiEndpoint();
    console.log(url);
    expect(url).toBe('https://airtable.selfkey.org/airtable?tableName=ContractsDev')
  })
});
