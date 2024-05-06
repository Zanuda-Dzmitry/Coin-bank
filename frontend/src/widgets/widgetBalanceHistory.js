import { el, setChildren } from 'redom';
import arrowSvg from '../assets/images/svg/arrow.svg';

import { filterTransactions, formatDate } from './widgetAccountDetails';

let currentSlide = 0;

export function widgetBalanceHistoryTop(data) {
  return el('div.balanceHistory__top', [
    el('div.balanceHistory__top-left', [
      el('h3', 'История баланса'),
      el('span', data.account),
    ]),
    el('div.balanceHistory__top-right', [
      el(
        'a',
        {
          href: `/account/${data.account}`,
          id: 'balanceHistory-back',
        },
        'Вернуться назад',
        [
          el('img', {
            src: arrowSvg,
          }),
        ],
      ),

      el('h4', 'Баланс'),
      el('span', ` ${data.balance} ₽`),
    ]),
  ]);
}

export function widgetBalanceHistoryChartTop() {
  return el('div.balanceHistory__center-top', [
    el('canvas', {
      id: 'balanceHistory',
      width: '',
      height: '',
    }),
  ]);
}

export function widgetBalanceHistoryChartBottom() {
  return el('div.balanceHistory__center-bottom', [
    el('canvas', {
      id: 'incomingOutgoingTransactions',
      width: '',
      height: '',
    }),
  ]);
}

export function widgetBalanceHistoryTransactions(data) {
  const arrTransactions = chunkArray(data.transactions, 25);
  return el('div.balanceHistory__bottom', [
    el('h3.balanceHistory__bottom-title', 'История переводов'),
    el('table', [
      el('thead', [
        el('tr.tr-header', [
          el('th', 'Счёт отправителя'),
          el('th', 'Счёт получателя'),
          el('th', 'Сумма'),
          el('th', 'Дата'),
        ]),
      ]),
      el('tbody#tBody', [showSlide(arrTransactions, data)]),
    ]),
    el('div.balanceHistory__bottom-navigate', [
      el('button.prevSlide', 'prevSlide', {
        onclick(e) {
          e.preventDefault();
          prevSlide(arrTransactions, data);
        },
      }),
      el('button.nextSlide', 'nextSlide', {
        onclick(e) {
          e.preventDefault();
          nextSlide(arrTransactions, data);
        },
      }),
    ]),
  ]);
}

// разбиваем транзакции по массивам в количестве 25 или меньше.
function chunkArray(array, chunkSize) {
  const chunks = [];
  const reversedArray = array.slice().reverse(); // Создаем копию и переворачиваем массив
  for (let i = 0; i < reversedArray.length; i += chunkSize) {
    chunks.push(reversedArray.slice(i, i + chunkSize));
  }
  return chunks;
}

function showSlide(arrTransactions, data) {
  return arrTransactions[currentSlide].map((transaction) => {
    return el('tr', [
      el('td', transaction.from),
      el('td', transaction.to),
      filterTransactions(data, transaction),
      el('td', formatDate(transaction.date)),
    ]);
  });
}

function nextSlide(arrTransactions, data) {
  currentSlide = (currentSlide + 1) % arrTransactions.length; // Переход к следующему слайду
  setChildren(
    document.getElementById('tBody'),
    showSlide(arrTransactions, data),
  );
}

function prevSlide(arrTransactions, data) {
  currentSlide =
    (currentSlide - 1 + arrTransactions.length) % arrTransactions.length; // Переход к предыдущему слайду
  setChildren(
    document.getElementById('tBody'),
    showSlide(arrTransactions, data),
  );
}
