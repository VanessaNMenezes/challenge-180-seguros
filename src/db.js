// Variável que simula o "banco de dados".
// Todas as funções da camada de db deverão atuar
// nesta variável, que será passada para todas as
// rotas através do middleware abaixo.
const db = {
  // "Tabela" de segurados
  policyholders: [
    {
      "id": 325,
      "name": "Vanessa"
      },
      {
      "id": 201,
      "name": "Marina"
      },
      {
      "id": 475,
      "name": "Aline"
      },
      {
      "id": 110,
      "name": "Keila"
      },
      {
      "id": 123,
      "name": "Polyana"
      },
      {
      "id": 325,
      "name": "Daphne"
      }
  ],
};

function findAllPolicyholders() {
  return db.policyholders;
}

function insertPolicyholder(policyholder) {
  db.policyholders.push(policyholder);
  return policyholder;
}

function findPolicyholderById(policyholderId) {
  return db.policyholders.filter((policyholder) => policyholder.id === policyholderId)[0];
}

module.exports = {
  findAllPolicyholders,
  findPolicyholderById,
  insertPolicyholder,
};
