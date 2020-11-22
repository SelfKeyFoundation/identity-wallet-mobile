import { ContractAllowanceService } from './contract-allowance-service';

describe('core/services/ContractAllowanceService', () => {
  let service;

  it('expect to create instance', async () => {
    service = new ContractAllowanceService({});
    expect(service).toBeDefined();
  });
});
