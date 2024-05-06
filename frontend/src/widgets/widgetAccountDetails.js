import { el } from 'redom';
import arrowSvg from '../assets/images/svg/arrow.svg';
import letterSvg from '../assets/images/svg/letter.svg';

import { transferFunds } from '../api/apiRequests';

export function widgetAccountDetailsTop(data) {
  return el('div.accountDetails__top', [
    el('div.accountDetails__left', [
      el('h2.accountDetails__left-title', 'Просмотр счёта '),
      el('span.accountDetails__left-subtitle', data.account),
    ]),
    el('div.accountDetails__right', [
      el(
        'a.accountDetails__right-link',
        {
          href: `/accounts`,
        },
        'Вернуться назад',
        [
          el('img', {
            src: arrowSvg,
          }),
        ],
      ),

      el('h4.accountDetails__right-title', 'Баланс'),
      el(
        'span.accountDetails__right-span',
        {
          balance: data.balance,
        },
        ` ${data.balance} ₽`,
      ),
    ]),
  ]);
}

export function widgetAccountDetailsForm(data) {
  const account = data.account;
  const arrAccount = JSON.parse(localStorage.getItem('account')) || [];
  return el('div.accountDetails__left', [
    el('form.accountDetails__form', [
      el('h3.accountDetails__form-title', 'Новый перевод'),
      el(
        'div.accountDetails__form-wrapper',
        {
          id: 'datalist',
        },
        [
          el('label.accountDetails__form-label', 'Номер счёта получателя'),
          el('input.accountDetails__form-input', {
            placeholder: 'Введите номер счета',
            type: 'number',
            list: 'browsers',
            id: 'myBrowser',
            name: 'myBrowser',
          }),
          dataList(arrAccount),
        ],
      ),
      el(
        'div.accountDetails__form-wrapper ',
        {
          id: 'transferAmount',
        },
        [
          el('label.accountDetails__form-label', 'Сумма перевода'),
          el('input.accountDetails__form-input', {
            placeholder: 'Введите сумму',
            type: 'number',
            id: 'amount',
          }),
        ],
      ),
      el(
        'button.accountDetails__form-btn',
        {
          onclick(e) {
            e.preventDefault();
            const input = document.getElementById('myBrowser');
            const inputAmount = document.getElementById('amount');

            if (inputAmount.value < 0) {
              alert('Введите положительную сумму');
            } else {
              if (input.value !== '' && inputAmount.value !== '') {
                transferFunds(account, input.value, inputAmount.value);
                input.value = '';
                inputAmount.value = '';

                if (!arrAccount.includes(input.value)) {
                  arrAccount.push(input.value);
                  localStorage.setItem('account', JSON.stringify(arrAccount));
                }
              } else {
                alert('Заполните все поля');
              }
            }
          },
        },
        'Отправить',
        [
          el('img', {
            src: letterSvg,
          }),
        ],
      ),
    ]),
  ]);
}

export function widgetAccountDetailsChart() {
  return el('div.accountDetails__right', [
    el('canvas', {
      id: 'balance',
    }),
  ]);
}

export function widgetAccountDetailsTransactions(data) {
  return el('div.accountDetails__bottom', [
    el('h3.accountDetails__bottom-title', 'История переводов'),
    el(
      'a',
      {
        href: `/account/${data.account}/balance_history`,
        id: 'linkBalanceHistory',
      },
      [
        el('table', [
          el('thead', [
            el('tr.tr-header', [
              el('th', 'Счёт отправителя'),
              el('th', 'Счёт получателя'),
              el('th', 'Сумма'),
              el('th', 'Дата'),
            ]),
          ]),
          el('tbody', [
            data.transactions.slice(-10).map((transaction) => {
              return el('tr', [
                el('td', transaction.from),
                el('td', transaction.to),
                filterTransactions(data, transaction),
                el('td', formatDate(transaction.date)),
              ]);
            }),
          ]),
        ]),
      ],
    ),
  ]);
}

export function filterTransactions(data, transaction) {
  if (data.account === transaction.from) {
    return el('td.outgoingTransactions', {}, `- ${transaction.amount} ₽`);
  } else {
    return el('td.incomingTransactions', {}, `+ ${transaction.amount} ₽`);
  }
}

function dataList(arrAccount) {
  return el('datalist.data-list', { id: 'browsers' }, [
    arrAccount.map((account) => {
      return el('option', account);
    }),
  ]);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}.${month + 1}.${year}`;
}
