import { el, setChildren } from 'redom';

export function widgetAtmMap() {
  return el('div.widgetMap', [
    el('div.widgetMap__container', [
      el('h2', 'Карта банкоматов'),
      el('div#map'),
    ]),
  ]);
}
