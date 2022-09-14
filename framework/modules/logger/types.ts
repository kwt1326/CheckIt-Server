import { ModuleDefaultProps } from "../types";

type LogLevel = 'warn' | 'error' | 'debug';

interface LoggerProps extends ModuleDefaultProps {
  options?: LogOption
}

interface LogOption {
  level: LogLevel
}

export type { LoggerProps, LogOption, LogLevel };