import { el } from 'redom';

export function createAccountDetails(
  widgetAccountDetailsTop,
  widgetAccountDetailsForm,
  widgetAccountDetailsChart,
  widgetAccountDetailsTransactions,
) {
  return el('section.accountDetails', [
    el('div.accountDetails__container', [
      el('div.accountDetails__widget-top', [widgetAccountDetailsTop]),
      el('div.accountDetails__widget-center', [
        widgetAccountDetailsForm,
        widgetAccountDetailsChart,
      ]),
      el('div.accountDetails__widget-bottom', [
        widgetAccountDetailsTransactions,
      ]),
    ]),
  ]);
}
