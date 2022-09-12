import { ModuleDefaultProps } from "../types";

type LogLevel = 'warn' | 'error' | 'debug';

interface LoggerProps extends ModuleDefaultProps {
  options: LogOption
}

interface LogOption {}

export type { LoggerProps, LogOption, LogLevel };