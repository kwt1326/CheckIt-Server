import * as express from 'express';
import { ModuleDefaultClass } from "../common";
import { LoggerProps, LogLevel, LogOption } from "./types"

class LoggerModule implements ModuleDefaultClass {
  protected static _options: LogOption;
  protected static styles: any;

  constructor() {}

  init(app: express.Express) {}

  static set options(options: LogOption) {
    LoggerModule._options = options;
  }

  static setStyle(styles: any) {
    this.styles = styles.join(';') + ';';
  }

  static printLog(msg: string) {
    switch (LoggerModule._options.level) {
      case 'warn':
        return console.warn(`%c${msg}`, "color: yellow" + this.styles);
      case 'error':
        return console.error(`%c${msg}`, "color: red" + this.styles);
      case 'debug':
        return console.debug(`%c${msg}`, this.styles);
      default:
        return console.log(`%c${msg}`, this.styles)
    }
  }
}

export { LoggerModule }