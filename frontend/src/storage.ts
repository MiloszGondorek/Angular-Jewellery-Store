export class Storage {
  static getData(key: string) {
    try {
      const data = localStorage.getItem(key);
      if (data == null) return '[]';
      return data;
    } catch (error) {
      return '[]';
    }
  }
  static setData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  static removeData(key: string) {
    localStorage.removeItem(key);
  }
}
