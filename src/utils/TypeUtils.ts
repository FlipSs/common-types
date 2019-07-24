export class TypeUtils {
  public static isNullOrUndefined(arg: any): boolean {
    return arg == null;
  }

  public static isNumber(arg: any): arg is number {
    return typeof arg === 'number' || this.is(arg, Number);
  }

  public static isString(arg: any): arg is string {
    return typeof arg === 'string' || this.is(arg, String);
  }

  public static is<T>(arg: any, type: (new (...args: any[]) => T)): arg is T {
    return arg instanceof type;
  }
}