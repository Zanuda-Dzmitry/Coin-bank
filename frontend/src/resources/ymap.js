export function createYmap() {
  return ymaps.ready(function () {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64], // Координаты центра карты
      zoom: 11, // Уровень масштабирования
    });

    // Создание маркера
    const myPlacemark1 = new ymaps.Placemark([55.66, 37.64], {
      balloonContent: 'ATM-3',
    });
    const myPlacemark2 = new ymaps.Placemark([55.76, 37.6], {
      balloonContent: 'ATM-1',
    });
    const myPlacemark3 = new ymaps.Placemark([55.71, 37.64], {
      balloonContent: 'ATM-2',
    });
    const myPlacemark4 = new ymaps.Placemark([55.72, 37.64], {
      balloonContent: 'ATM-4',
    });
    const myPlacemark5 = new ymaps.Placemark([55.86, 37.64], {
      balloonContent: 'ATM-5',
    });
    const myPlacemark6 = new ymaps.Placemark([55.73, 37.6], {
      balloonContent: 'ATM-6',
    });
    const myPlacemark7 = new ymaps.Placemark([55.96, 37.69], {
      balloonContent: 'ATM-7',
    });

    // Добавление маркера на карту
    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);
    myMap.geoObjects.add(myPlacemark4);
    myMap.geoObjects.add(myPlacemark5);
    myMap.geoObjects.add(myPlacemark6);
    myMap.geoObjects.add(myPlacemark7);
  });
}
