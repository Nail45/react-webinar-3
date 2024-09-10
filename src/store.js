/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let code;
    function generatorNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    code = generatorNumber(0, this.state.list.length * 30);
    this.state.list.map(item => {
      if (code === item.code) code = generatorNumber(0, this.state.list.length * 30);
    });
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: code, title: 'Новая запись', selectCount: 0 }],
    });
  }
  /**
   * Добавление количество совершенных выделений
   */
  selectItemCount(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (code === item.code && item.selected) {
          item.selectCount += 1;
        }
        return item;
      }),
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
