// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('authorization', (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/');
      cy.get('.form__input-login').type(username);
      cy.get('.form__input-password').type(password);
      cy.get('.form__btn').click().url().should('include', '/accounts');
    },
    {
      validate() {
        cy.request('/whoami').its('status').should('eq', 200);
      },
    },
  );
});

Cypress.Commands.add('checkToken', (token) => {
  cy.window().its('localStorage.token').should('eq', token);
});

Cypress.Commands.add('lastAccount', () => {
  let balance;
  let accountNumber;
  cy.visit('/accounts');
  cy.get('.card__link').last().click();
  cy.get('.accountDetails__right-span')
    .invoke('attr', 'balance')
    .then((attributeValue) => {
      balance = attributeValue;
      cy.get('.accountDetails__left-subtitle').then(($el) => {
        accountNumber = $el.text();
        return cy.wrap({ balance, accountNumber });
      });
    });
});

Cypress.Commands.add('translation', (account, balance) => {
  let amount = 1000;
  cy.visit('/accounts');
  cy.get('.card__link').first().click();
  cy.get('#myBrowser').type(account);
  cy.get('#amount').type(amount);
  cy.get('.accountDetails__form-btn').click();
  cy.visit(`/account/${account}`);
  cy.get('.accountDetails__right-span').should(
    'have.attr',
    'balance',
    Number(balance) + Number(amount),
  );
});
