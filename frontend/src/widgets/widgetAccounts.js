import { el, setChildren } from 'redom';

import plus from '../assets/images/svg/plus.svg';

export function widgetAccountsTop() {
  return el('div.account__top', [
    el('h2.account__title', 'Ваши счета'),
    el(
      'select.account__select',
      {
        id: 'select_sort',
      },
      [
        el(
          'option.account__option',

          'Сортировка',
        ),
        el(
          'option.account__option',
          {
            value: 'accountNumber',
          },
          'По номеру',
        ),
        el(
          'option.account__option',
          {
            value: 'balance',
          },
          'По балансу',
        ),
        el(
          'option.account__option',
          {
            value: 'lastTransaction',
          },
          'По последней транзакции',
        ),
      ],
    ),
    el('button.account__btn', 'Создать новый счёт', [
      el('img', {
        src: plus,
      }),
    ]),
  ]);
}

export function widgetAccountsCenter(accounts) {
  return el('div.account__center', [
    accounts.map((element) =>
      el('div.card', [
        el('div.card__wrap', [
          el('h3.card__title', [element.account]),
          el('span.card__subtitle', [element.balance]),
          el(
            'p.card__text',
            `Последняя транзакция: ${transaction(element.transactions)}`,
          ),
          el(
            'a.card__link',
            {
              href: `/account/${element.account}`,
            },
            'Открыть',
          ),
        ]),
      ]),
    ),
  ]);
}

function transaction(transaction) {
  if (transaction[0]) {
    return formatDate(transaction[0].date);
  } else {
    return 'Транзакции отсутствуют';
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function sortAccounts(accounts) {
  const select = document.getElementById('select_sort');
  select.addEventListener('change', function () {
    let sortType = this.value;

    if (sortType === 'accountNumber') {
      accounts.sort((a, b) => a.account.localeCompare(b.account));
    } else if (sortType === 'balance') {
      accounts.sort((a, b) => a.balance - b.balance);
    } else if (sortType === 'lastTransaction') {
      accounts.sort((a, b) => a.transactions.date - b.transactions.date);
    }

    const widgetCenter = document.querySelector('.widgetCenter');
    widgetCenter.innerHTML = '';
    setChildren(widgetCenter, widgetAccountsCenter(accounts.reverse()));
  });
}
