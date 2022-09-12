import * as express from 'express';
import { ModuleDefaultClass } from "../common";
import { LoggerProps, LogLevel, LogOption } from "./types"

class LoggerModule implements ModuleDefaultClass {
  protected options: LogOption;
  protected styles: any;

  constructor(props: LoggerProps) {
    this.options = props.options;
  }

  init(app: express.Express) {}

  setStyle(styles: any) {
    this.styles = styles.join(';') + ';';
  }

  printLog(level: LogLevel, msg: string) {
    switch (level) {
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