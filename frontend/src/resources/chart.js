import Chart from 'chart.js/auto';
import '../assets/scss/main.scss';

export function barChart(data, id) {
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw: function (chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };
  const config = {
    type: 'bar',
    fillStyle: '#000',
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          data: data.map((row) => row.balance),
          backgroundColor: '#116ACC',
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 10,
          bottom: 10,
        },
      },
      plugins: {
        chartAreaBorder: {
          borderColor: '#000',
          borderWidth: 1,
        },
        tooltip: { enabled: false },
        legend: {
          display: false,
        },
        title: {
          display: true,
          align: 'start',
          text: 'Динамика баланса',
          padding: {
            bottom: 25,
          },
          font: {
            size: 20,
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          drawBorder: false,
          grid: { display: false },
          position: 'right',
          min: 0,
          max: Math.trunc(Math.max(...data.map((row) => row.balance))),
          ticks: {
            maxTicksLimit: 2,
            font: { weight: '500' },
          },
        },
        x: {
          drawBorder: false,
          grid: { display: false },
        },
      },
    },
    plugins: [chartAreaBorder],
  };

  const ctx = document.getElementById(id).getContext('2d');
  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 700;
  Chart.defaults.color = '#000';
  new Chart(ctx, config);
}

export function barChartTransaction(transactions) {
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw: function (chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  const config = {
    type: 'bar',
    fillStyle: '#000',
    data: {
      labels: transactions.map((row) => row.month),
      datasets: [
        {
          data: transactions.map((row) => row.outgoingBalance),
          backgroundColor: '#FD4E5D',
        },
        {
          data: transactions.map((row) => row.incomingBalance),
          backgroundColor: '#76CA66',
        },
      ],
    },
    options: {
      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 10,
          bottom: 10,
        },
      },
      plugins: {
        chartAreaBorder: {
          borderColor: '#000',
          borderWidth: 1,
        },
        tooltip: { enabled: false },
        legend: {
          display: false,
        },
        title: {
          display: true,
          align: 'start',
          text: 'Соотношение входящих исходящих транзакций',
          padding: {
            bottom: 25,
          },
          font: {
            size: 20,
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          drawBorder: false,
          grid: { display: false },
          position: 'right',
          steps: 10,
          stepValue: 5,
          min: 0,
          max: Math.trunc(
            Math.max(...transactions.map((row) => row.incomingBalance)),
          ),
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 3,
            font: { weight: '500' },
            callback: function (value, index, values) {
              values[1].label = Math.trunc(totalBalance(transactions));
              return value;
            },
          },
        },
        x: {
          stacked: true,
          drawBorder: false,
          grid: { display: false },
        },
      },
    },
    plugins: [chartAreaBorder],
  };
  const ctx = document
    .getElementById('incomingOutgoingTransactions')
    .getContext('2d');
  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 700;
  Chart.defaults.color = '#000';
  new Chart(ctx, config);
}

function totalBalance(transactions) {
  const totalIncomingBalance = transactions.reduce(
    (total, obj) => total + obj.incomingBalance,
    0,
  );
  const totalOutgoingBalance = transactions.reduce(
    (total, obj) => total + obj.outgoingBalance,
    0,
  );
  return (totalIncomingBalance + totalOutgoingBalance) / 12;
}

export function calculateMonthlyBalance(transactions, countMonth) {
  // Создаем массив для хранения баланса каждого месяца
  let monthlyBalance = [];

  // Массив с названиями месяцев
  let months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  // Получаем текущую дату
  let currentDate = new Date();

  // Для каждого из последних 6-12 месяцев
  for (let i = 0; i < countMonth; i++) {
    // Устанавливаем дату на i месяцев назад
    let dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    // Фильтруем транзакции за этот месяц
    let thisMonthTransactions = transactions.filter((transaction) => {
      let transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === dateToCheck.getFullYear() &&
        transactionDate.getMonth() === dateToCheck.getMonth()
      );
    });

    // Считаем баланс для этого месяца
    let balance = thisMonthTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    // Добавляем объект с месяцем и балансом в массив
    monthlyBalance.unshift({
      month: months[dateToCheck.getMonth()],
      balance: balance,
    });
  }
  return monthlyBalance;
}
export function calculateMonthlyTransactions(
  outgoingTransactions,
  incomingTransactions,
  countMonth,
) {
  // Создаем массив для хранения баланса каждого месяца
  let monthlyBalance = [];

  // Массив с названиями месяцев
  let months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  // Получаем текущую дату
  let currentDate = new Date();

  // Для каждого из последних 6-12 месяцев
  for (let i = 0; i < countMonth; i++) {
    // Устанавливаем дату на i месяцев назад
    let dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    // Фильтруем входящие транзакции за этот месяц
    let thisMonthIncomingTransactions = incomingTransactions.filter(
      (transaction) => {
        let transactionDate = new Date(transaction.date);
        return (
          transactionDate.getFullYear() === dateToCheck.getFullYear() &&
          transactionDate.getMonth() === dateToCheck.getMonth()
        );
      },
    );

    // Фильтруем исходящие транзакции за этот месяц
    let thisMonthOutgoingTransactions = outgoingTransactions.filter(
      (transaction) => {
        let transactionDate = new Date(transaction.date);
        return (
          transactionDate.getFullYear() === dateToCheck.getFullYear() &&
          transactionDate.getMonth() === dateToCheck.getMonth()
        );
      },
    );

    // Считаем баланс для входящих транзакций этого месяца
    let incomingBalance = thisMonthIncomingTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    // Считаем баланс для исходящих транзакций этого месяца
    let outgoingBalance = thisMonthOutgoingTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    // Считаем общий баланс для этого месяца
    let totalBalance = incomingBalance - outgoingBalance;

    // Добавляем объект с месяцем, входящим балансом, исходящим балансом и общим балансом в массив
    monthlyBalance.unshift({
      month: months[dateToCheck.getMonth()],
      incomingBalance: incomingBalance,
      outgoingBalance: outgoingBalance,
      totalBalance: totalBalance,
    });
  }
  return monthlyBalance;
}

export function incomingOutgoingTransactions(account, transactions) {
  const outgoingTransactions = [];
  const incomingTransactions = [];
  transactions.map((transaction) => {
    if (account === transaction.from) {
      outgoingTransactions.push(transaction);
    } else {
      incomingTransactions.push(transaction);
    }
  });
  return { outgoingTransactions, incomingTransactions };
}
