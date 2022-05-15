export default class Util {
  /**
   *
   * @param {*} obj 传入参数
   * @returns 是否是对象
   */
  static isObject(obj: Record<string, any>) {
    return obj !== null && typeof obj === 'object';
  }

  /**
   * 遍历对象属性执行函数
   * @param {*} obj 需要遍历的对象
   * @param {*} fn 对象的每个key值, 执行函数，传参为 value 和 key
   */
  static forEachValue(obj: any, fn: (...args: any[]) => any) {
    if (this.isObject(obj)) {
      Object.keys(obj).forEach((key) => fn(obj[key], key));
    }
  }
}
