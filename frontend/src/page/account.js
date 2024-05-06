import { el } from 'redom';

export function createAccount(widgetAccountsTop, widgetAccountsCenter) {
  return el('section.account', [
    el('div.account__container', [
      el('div.widgetsAccount', [
        el('div.widgetTop', [widgetAccountsTop]),
        el('div.widgetCenter', [widgetAccountsCenter]),
      ]),
    ]),
  ]);
}
