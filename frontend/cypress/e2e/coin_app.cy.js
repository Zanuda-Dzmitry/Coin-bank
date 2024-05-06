/// <reference types="cypress" />
describe('Приложение Coin', () => {
  beforeEach('authorization', () => {
    cy.authorization('developer', 'skillbox');
    cy.getAllLocalStorage().then((localStorageData) => {
      const appData = localStorageData['http://localhost:8080'];
      cy.checkToken(appData['token']);
    });
  });

  it('Проверяем перевод суммы со счёта на счёт ', () => {
    cy.lastAccount().then((result) => {
      cy.translation(result.accountNumber, result.balance);
    });
  });

  it('Создаем новый счёт и делаем перевод на него', () => {
    cy.visit('/accounts');
    cy.get('.account__btn').click();
    cy.wait(2000);
    cy.lastAccount().then((result) => {
      cy.translation(result.accountNumber, result.balance);
    });
  });
});
