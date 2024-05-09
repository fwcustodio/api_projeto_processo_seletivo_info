let chai = require('chai');
let assert = require('assert');
let https = require('https');
let should = chai.should();
let expect = chai.expect;

import DadosTesteVeiculo from './data';
import DadosTeste from '../dados_teste';

const URL_BASE = DadosTeste.url_base;
const HEADER = DadosTeste.header;

var VeiculoId = null; // VeiculoId do veiculo que sera cadastrado

describe('Modulo Veiculos', async () => {
  it('Validar acesso com Token', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos`);

      expect(res.status).to.equal(401);
    } catch (error) {
      should.not.exist(error);
    }
  });

  it('Consultar veículos', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos`, HEADER);

      let ResJson = await res.json();
      res.status == 400 && console.log(JSON.stringify(ResJson));
      //console.log(JSON.stringify(ResJson));

      expect(res.status).to.equal(200);
      expect(ResJson).to.be.a('array');
    } catch (error) {
      should.not.exist(error);
    }
  });

  it('Consultar veículos - Search', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos/search/ford`, HEADER);

      let ResJson = await res.json();
      res.status == 400 && console.log(JSON.stringify(ResJson));
      //console.log(JSON.stringify(ResJson));

      expect(res.status).to.equal(200);
      expect(ResJson).to.be.a('array');
    } catch (error) {
      should.not.exist(error);
    }
  });

  it('Insert veículo', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos`, {
        ...HEADER,
        method: 'POST',
        body: JSON.stringify(DadosTesteVeiculo),
      });

      let ResJson = await res.json();
      res.status == 400 && console.log(JSON.stringify(ResJson));

      if (ResJson && ResJson.id) VeiculoId = ResJson.id;
      console.log('Insert : VeiculoId : ' + VeiculoId);

      expect(res.status).to.equal(201);
      expect(ResJson).to.be.a('object');
      expect(ResJson).to.have.property('id');
      expect(ResJson).to.have.property('placa');
      expect(ResJson).to.have.property('chassi');
    } catch (error) {
      should.not.exist(error);
    }
  });

  it('Update veículo', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos/${VeiculoId ?? 1}`, {
        ...HEADER,
        method: 'PUT',
        body: JSON.stringify(DadosTesteVeiculo),
      });

      let ResJson = await res.json();
      console.log('Update : ' + JSON.stringify(ResJson));

      expect(res.status).to.equal(200);
      expect(ResJson).to.be.a('object');
    } catch (error) {
      should.not.exist(error);
    }
  });

  it('Delete veículo', async () => {
    try {
      let res = await fetch(`${URL_BASE}/veiculos/${VeiculoId ?? 1}`, {
        ...HEADER,
        method: 'DELETE',
      });

      let ResJson = await res.json();
      console.log('Delete : ' + JSON.stringify(ResJson));
      //console.log('VeiculoId', VeiculoId);

      expect(res.status).to.equal(200);
    } catch (error) {
      should.not.exist(error);
    }
  });
});
