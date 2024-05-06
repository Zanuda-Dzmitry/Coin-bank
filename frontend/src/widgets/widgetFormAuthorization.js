import { el, setChildren } from 'redom';

export function createFormAuthorization() {
  return el('div.modal', [
    el('div.modal__container', [
      el('form.form', [
        el('h2.form__title', 'Вход в аккаунт'),
        el('div.form__wrapper form__wrapper-logo', [
          el('label.form__label form__label-login', 'Логин'),
          el('input.form__input form__input-login', {
            placeholder: 'Введите логин',
            type: 'login',
          }),
        ]),
        el('div.form__wrapper form__wrapper-password', [
          el('label.form__label form__label-password', 'Пароль'),
          el('input.form__input form__input-password', {
            placeholder: 'Введите пароль',
            type: 'password',
          }),
        ]),
        el(
          'button.form__btn',

          'Войти',
        ),
      ]),
    ]),
  ]);
}

export function isValid(input) {
  // Регулярное выражение, которое проверяет, что строка содержит хотя бы 6 символов и не содержит пробелов
  const regex = /^\S{6,}$/;

  return regex.test(input);
}
