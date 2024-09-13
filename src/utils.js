const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function selectCountText(click) {
  let a = click.toString().split('');
  if (click === 12 || click === 13 || click === 14) return `Выделяли ${click} раз`;
  if (a[a.length - 1] === '2' || a[a.length - 1] === '3' || a[a.length - 1] === '4')
    return `Выделяли ${click} раза`;
  else return `Выделяли ${click} раз`;
}
