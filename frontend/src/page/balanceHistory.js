import { el, setChildren } from 'redom';

export function createBalanceHistory(
  widgetBalanceHistoryTop,
  widgetBalanceHistoryChartTop,
  widgetBalanceHistoryChartBottom,
  widgetBalanceHistoryTransactions,
) {
  return el('section.balanceHistory', [
    el('div.balanceHistory__container', [
      el('div.balanceHistory__widget-top', [widgetBalanceHistoryTop]),
      el('div.balanceHistory__widget-center', [
        widgetBalanceHistoryChartTop,
        widgetBalanceHistoryChartBottom,
      ]),
      el('div.balanceHistory__widget-bottom', [
        widgetBalanceHistoryTransactions,
      ]),
    ]),
  ]);
}
