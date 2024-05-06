export async function authorizationToken(login, password) {
  return await fetch(`http://localhost:3000/login`, {
    method: 'POST',
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      'Content-type': 'Application/json',
    },
  }).then((data) => data.json());
}

export async function authorizationAccount(token) {
  const response = await fetch(`http://localhost:3000/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function accountInformation(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/account/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function createNewAccount() {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/create-account`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function transferFunds(from, to, amount) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:3000/transfer-funds`, {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  });
}

export async function getCurrencyAccounts() {
  const token = localStorage.getItem('token');
  return await fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());
}

export async function getChangedCurrency() {
  return new WebSocket('ws://localhost:3000/currency-feed', ['soap', 'wamp']);
}

export async function getKnownCurrencies() {
  return await fetch('http://localhost:3000/all-currencies').then((data) =>
    data.json(),
  );
}

export async function exchangeCurrency(from, to, amount) {
  const token = localStorage.getItem('token');
  return await fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());
}
