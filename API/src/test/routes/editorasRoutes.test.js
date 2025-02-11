import { afterEach, beforeEach, describe, expect, jest, it } from '@jest/globals';
import app from '../../app.js';
import  request from 'supertest';
import { application } from 'express';

let server;
beforeEach(() =>{
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

describe('GEt em /editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
        const resposta = await request(app)
            .get('/editoras')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);

        expect(resposta.body[0].email).toEqual('e@e.com'); // testando a resposta
    });
});

let idResposta;
describe('POST em /editoras', () => {
    it('Deve adicionar uma nova editora', async () => {
      const resposta = await request(app)
        .post('/editoras')
        .send({
          nome: 'CDC',
          cidade: 'Sao Paulo',
          email: 's@s.com',
        })
        .expect(201);
      idResposta = resposta.body.content.id // salvando o id da nova editora
    });
    it('Não deve adicionar se o body estiver vazio', async () => {
        await request(app)
            .post('/editoras')
            .send({})
        
            .expect(400);
    });
});

describe('GET em /editoras/id', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)

      .expect(200)
  });
});

// testando cada coluna da tabela
describe('PUT em /editoras/id', () => {
    test.each([
        ['nome', {nome: 'Casa do Código'}],
        ['cidade', {cidade: 'SP'}],
        ['email', {email: 'cdc@cdc.com'}],
    ])('Deve alterar o campo %s', async(chave, param) => {
        
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');
        await requisicao.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204)

        expect(spy).toHaveBeenCalled();
    });
});

describe('DELETE em /editoras/id', () => {
    it('Deletar o recurso adcionado', async () => {
        await request(app)
            .delete(`/editoras/${idResposta}`)
        
        .expect(200);
    });
});
