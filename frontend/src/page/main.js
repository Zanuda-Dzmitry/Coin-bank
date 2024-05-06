import '../assets/scss/main.scss';
import { el, setChildren } from 'redom';
import Navigo from 'navigo';

const router = new Navigo('/');
let socket;

import { showLoader } from '../resources/spinner';

import { createHeader } from './header';

import {
  calculateMonthlyBalance,
  calculateMonthlyTransactions,
  incomingOutgoingTransactions,
  barChart,
  barChartTransaction,
} from '../resources/chart';

import {
  authorizationToken,
  authorizationAccount,
  accountInformation,
  createNewAccount,
  getCurrencyAccounts,
  getChangedCurrency,
} from '../api/apiRequests';

import {
  createFormAuthorization,
  isValid,
} from '../widgets/widgetFormAuthorization';

import { createAccount } from './account';
import { createAccountDetails } from './accountDetails';
import { createBalanceHistory } from './balanceHistory';
import { currencyAccounts } from './currencyAccounts';

import { createNav } from '../widgets/widgetNav';

import {
  widgetAccountsTop,
  widgetAccountsCenter,
  sortAccounts,
} from '../widgets/widgetAccounts';

import {
  widgetAccountDetailsTop,
  widgetAccountDetailsForm,
  widgetAccountDetailsChart,
  widgetAccountDetailsTransactions,
} from '../widgets/widgetAccountDetails';

import {
  widgetBalanceHistoryTop,
  widgetBalanceHistoryChartTop,
  widgetBalanceHistoryChartBottom,
  widgetBalanceHistoryTransactions,
} from '../widgets/widgetBalanceHistory';

import {
  widgetYourCurrencies,
  widgetExchangeCurrency,
  widgetChangedCurrency,
  wsOpen,
} from '../widgets/widgetsCurrency';

import { createYmap } from '../resources/ymap';

import { widgetAtmMap } from '../widgets/widgetATMs';

export const main = el('main');

setChildren(window.document.body, [createHeader(), main]);

const nav = document.querySelector('.nav');
setChildren(nav, createNav());
const navLink = document.querySelectorAll('.nav__link');

navLink.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    router.navigate(link.getAttribute('href'));
  });
});

router
  .on(
    '/',
    () => {
      setChildren(main, createFormAuthorization());

      const btmFormAuthorization = document.querySelector('.form__btn');
      btmFormAuthorization.addEventListener('click', async (e) => {
        e.preventDefault();
        const login = document.querySelector('.form__input-login').value;
        const password = document.querySelector('.form__input-password').value;

        if (isValid(login) && isValid(password)) {
          const token = await authorizationToken(login, password);

          if (token.error === '') {
            localStorage.setItem('token', token.payload.token);
            router.navigate('/accounts');
          } else {
            alert(token.error);
          }
        } else {
          alert(
            'Пароль и логин имеют длину менее 6 символов, или присутствуют пробелы.',
          );
        }
      });
    },
    {
      before: (done) => {
        done(true);
        localStorage.setItem('token', '');
        nav.innerHTML = '';
      },
      leave: (done) => {
        done(true);
        setChildren(nav, createNav());
      },
    },
  )

  .on('/accounts', async () => {
    showLoader();
    const data = await authorizationAccount(localStorage.getItem('token'));

    if (data) {
      let copyArr = [...data.payload];
      main.innerHTML = '';

      setChildren(
        main,
        createAccount(
          widgetAccountsTop(copyArr),
          widgetAccountsCenter(copyArr),
        ),
      );

      sortAccounts(copyArr);

      const btn = document.querySelector('.account__btn');
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const newAccount = await createNewAccount();
        copyArr.push(newAccount.payload);

        const widgetCenter = document.querySelector('.widgetCenter');
        widgetCenter.innerHTML = '';
        setChildren(widgetCenter, widgetAccountsCenter(copyArr));
      });

      const links = document.querySelectorAll('.card__link');
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(e.target.getAttribute('href'));
        });
      });
    }
  })

  .on('/account/:id', async ({ data: { id } }) => {
    showLoader();
    const data = await accountInformation(id);

    if (data.error === '') {
      main.innerHTML = '';
      setChildren(
        main,
        createAccountDetails(
          widgetAccountDetailsTop(data.payload),
          widgetAccountDetailsForm(data.payload),
          widgetAccountDetailsChart(),
          widgetAccountDetailsTransactions(data.payload),
        ),
      );
      const arrBalance = calculateMonthlyBalance(data.payload.transactions, 6);
      barChart(arrBalance, 'balance');

      const linkBalanceHistory = document.getElementById('linkBalanceHistory'),
        accountDetailsBack = document.querySelector(
          '.accountDetails__right-link',
        );

      accountDetailsBack.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(e.target.getAttribute('href'));
      });

      linkBalanceHistory.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(linkBalanceHistory.getAttribute('href'));
      });
    } else {
      alert(data.error);
    }
  })

  .on('/account/:id/balance_history', async ({ data: { id } }) => {
    showLoader();
    const data = await accountInformation(id);

    if (data.error === '') {
      if (data.payload.transactions.length !== 0) {
        main.innerHTML = '';

        setChildren(
          main,
          createBalanceHistory(
            widgetBalanceHistoryTop(data.payload),
            widgetBalanceHistoryChartTop(),
            widgetBalanceHistoryChartBottom(),
            widgetBalanceHistoryTransactions(data.payload),
          ),
        );

        const transactions = incomingOutgoingTransactions(
          data.payload.account,
          data.payload.transactions,
        );
        const arrBalance = calculateMonthlyBalance(
          data.payload.transactions,
          12,
        );
        barChart(arrBalance, 'balanceHistory');
        const arrTransactions = calculateMonthlyTransactions(
          transactions.outgoingTransactions,
          transactions.incomingTransactions,
          12,
        );

        barChartTransaction(arrTransactions);
        const balanceHistoryBack = document.getElementById(
          'balanceHistory-back',
        );
        balanceHistoryBack.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(e.target.getAttribute('href'));
        });
      } else {
        main.innerHTML = '';

        setChildren(
          main,
          createBalanceHistory(widgetBalanceHistoryTop(data.payload)),
        );
        const balanceHistoryBack = document.getElementById(
          'balanceHistory-back',
        );
        balanceHistoryBack.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(e.target.getAttribute('href'));
        });
      }
    } else {
      alert(data.error);
    }
  })

  .on('/ATMs', () => {
    showLoader();
    main.innerHTML = '';
    setChildren(main, widgetAtmMap());

    createYmap();
  })

  .on(
    '/currency',
    async () => {
      showLoader();

      const dataCurrency = await getCurrencyAccounts();

      if (dataCurrency.error === '') {
        socket = await getChangedCurrency();

        main.innerHTML = '';

        setChildren(
          main,
          currencyAccounts(
            widgetYourCurrencies(dataCurrency.payload),
            widgetExchangeCurrency(dataCurrency.payload),
            widgetChangedCurrency(),
          ),
        );

        wsOpen(socket);
      } else {
        alert(data.error);
      }
    },
    {
      leave: (done) => {
        if (socket) {
          socket.close();
        }
        done(true);
      },
      already: async () => {
        // Открываем WebSocket-соединение при возврате на '/currency', если оно еще не открыто
        if (!socket || socket.readyState !== WebSocket.OPEN) {
          socket = await getChangedCurrency();
          wsOpen(socket);
        }
      },
    },
  )
  .resolve();
