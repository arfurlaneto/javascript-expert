const { error } = require('./constants');
const File = require('./file');
const sinon = require('sinon');
const { rejects, deepStrictEqual } = require('assert');

;(async () => {
  {
    const filePath = '../mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    sinon.stub(Date.prototype, 'getFullYear').returns(2020);

    const filePath = '../mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Erick Wendel",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthYear": 1995
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Specialist",
        "birthYear": 1940
      },
      {
        "name": "Joaozinho",
        "id": 231,
        "profession": "Java Developer",
        "birthYear": 1990
      }
    ];
    await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
