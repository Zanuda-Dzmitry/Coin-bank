import { el } from 'redom';

export function currencyAccounts(
  widgetYourCurrencies,
  widgetExchangeCurrency,
  currencyChangeWidget,
) {
  return el('section.currencyAccounts', [
    el('div.currencyAccounts__container', [
      el('h2.currencyAccounts__title', 'Валютный обмен'),
      el('div.currencyAccounts__widgets', [
        widgetYourCurrencies,
        widgetExchangeCurrency,
        currencyChangeWidget,
      ]),
    ]),
  ]);
}
