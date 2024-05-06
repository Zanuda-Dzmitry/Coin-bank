import '../assets/scss/main.scss';
import { el, setChildren } from 'redom';
import { main } from '../page/main';

export function showLoader() {
  const skeleton = el(
    'div.skeleton',
    {
      id: 'skeleton',
    },
    [
      el('div.skeleton-text', 'LOADING...'),
      el('div.skeleton-text skeleton-text__body'),
      el('div.skeleton-footer'),
    ],
  );

  main.innerHTML = '';
  setChildren(main, skeleton);
}
