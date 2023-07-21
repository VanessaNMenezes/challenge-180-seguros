const { getAllPolicyholders, getPolicyholderById, createPolicyholder } = require('../controller');
const { findAllPolicyholders, findPolicyholderById, insertPolicyholder } = require('../db.js');

jest.mock('../db.js', () => ({
  findAllPolicyholders: jest.fn(),
  findPolicyholderById: jest.fn(),
  insertPolicyholder: jest.fn()
}));
    
test('getAllPolicyholders should return all policyholders', () => {
  const mockRequest = {};
  const mockResponse = {
    json: jest.fn(),
  };
  findAllPolicyholders.mockReturnValue([
    { id: 325, name: 'Vanessa' },
    { id: 201, name: 'Marina' },
  ]);
  getAllPolicyholders(mockRequest, mockResponse);
  expect(mockResponse.json).toHaveBeenCalledWith([
    { id: 325, name: 'Vanessa' },
    { id: 201, name: 'Marina' },
  ]);
});

// mostra apenas o id informado
test('getPolicyholderById should return the selected policyholder', () => {
    const mockRequestValid = {
      params: { policyholderId: 325 }, 
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
    findPolicyholderById.mockReturnValue([
      { id: 325, name: 'Vanessa' },
    ]);
    getPolicyholderById(mockRequestValid, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 325, name: 'Vanessa' },
    ]);
  });

// teste de criação
  test('createPolicyholder should return 400 when an empty request is provided', () => {
    const mockRequestEmpty = {};
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    insertPolicyholder.mockReturnValue(null); 
    createPolicyholder(mockRequestEmpty, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400); 
  });
  
  test('getPolicyholderById should return 404 if policyholder is not found', () => {
    const mockRequestInvalid = {
      params: { policyholderId: 999 }, 
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
    findPolicyholderById.mockReturnValue(null); 
  
    getPolicyholderById(mockRequestInvalid, mockResponse);
  
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalled();
  });  
  
  test('createPolicyholder should create a new policyholder', () => {
    const mockRequest = {
      id: 110,
      name: 'Keila'
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    insertPolicyholder.mockReturnValue([
      { id: 110, name: 'Keila' }
    ]);
    createPolicyholder(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 110, name: 'Keila' }
    ]);
  });