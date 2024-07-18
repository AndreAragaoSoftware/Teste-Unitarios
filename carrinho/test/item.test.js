import Item from '../item.js';

describe('Testes dos Itens', () => {
  it('Deve ter campos: nome, valor e quatidade', () => {
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  it('Deve ter o preço calculado de acordo com a quantidade', () => {
    const item = new Item('Batata', 0.1, 3);

    // Usa toBeCloseTo para pontos flutuantes(aproximação)
    expect(item.pegaValorTotalItem()).toBeCloseTo(0.3);
  });
});
