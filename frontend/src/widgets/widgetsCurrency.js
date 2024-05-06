import { el, setChildren } from 'redom';
import vectorGreen from '../assets/images/svg/schedule.svg';
import vectorRed from '../assets/images/svg/scheduleRed.svg';
import { exchangeCurrency } from '../api/apiRequests';

export function widgetYourCurrencies(data) {
  const arrObjects = iterationObjects(data);
  return el('div.currencyAccounts__widget', [
    el('h3', 'Ваши валюты'),
    el('ul', [
      arrObjects.map((item) => {
        return el('li', [
          el('span.span_start', item.code),
          el('span.span_border'),
          el('span.span_end', item.amount),
        ]);
      }),
    ]),
  ]);
}

export function widgetChangedCurrency() {
  return el('div.currencyAccounts__widget', [
    el('h3', 'Изменение курсов в реальном времени'),
    [el('ul#currency_change_widget'), []],
  ]);
}

export function widgetExchangeCurrency(data) {
  const arrObjects = iterationObjects(data);
  return el('div.currencyAccounts__widget', [
    el('h3', 'Обмен валюты'),
    el('div.currencyAccounts__grid', [
      el('div.currencyAccounts__wrap currencyAccounts__wrap-select', [
        el('span', 'Из'),
        el('select#select_from', [
          arrObjects.map((option) => {
            return el('option', option.code);
          }),
        ]),
        el('span', 'в'),
        el('select#select_to', [
          arrObjects.map((option) => {
            return el('option', option.code);
          }),
        ]),
      ]),
      el('div.currencyAccounts__wrap currencyAccounts__wrap-input', [
        el('span', 'Сумма'),
        el('input#input_amount'),
      ]),
      el(
        'button',
        {
          async onclick(e) {
            e.preventDefault();
            const selectFrom = document.getElementById('select_from');
            const selectTo = document.getElementById('select_to');
            const inputAmount = document.getElementById('input_amount');

            const data = await exchangeCurrency(
              selectFrom.value,
              selectTo.value,
              inputAmount.value,
            );

            if (data.error !== '') {
              alert('Недостаточно средств');
            } else {
              selectFrom.value = '';
              selectTo.value = '';
              inputAmount.value = '';
            }
          },
        },
        'Обменять',
      ),
    ]),
  ]);
}

function iterationObjects(data) {
  const arr = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      arr.push(data[key]);
    }
  }
  return arr;
}

export function itemExchangeCurrency(item) {
  return el('li', [
    el('span.span_start', `${item.from}/${item.to}`),
    renderingBorder(item.change),
    el('span.span_end', `${item.rate}`),
    renderingSvg(item.change),
  ]);
}

export function wsOpen(socket) {
  const arrObjCurrency = [];

  socket.onmessage = async function (event) {
    const dataChange = JSON.parse(event.data);
    arrObjCurrency.push(dataChange);
    setChildren(
      document.getElementById('currency_change_widget'),
      arrObjCurrency.slice(-20).map((item) => {
        return itemExchangeCurrency(item);
      }),
    );
  };
}

function renderingBorder(change) {
  if (change === 1) {
    return el('span.span_border', {
      style: {
        'border-bottom': '1px dashed #76CA66',
      },
    });
  } else {
    return el('span.span_border', {
      style: {
        'border-bottom': '1px dashed #FD4E5D',
      },
    });
  }
}

function renderingSvg(change) {
  if (change === 1) {
    return el('img', {
      src: vectorGreen,
    });
  } else {
    return el('img', {
      src: vectorRed,
    });
  }
}
