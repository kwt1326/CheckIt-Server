import Framework from "../..";
import { LoggerModule } from "../../modules";
import { MetadataKeys } from "../../common/interface";

const Log: MethodDecorator = (target, propertyKey) => {
  if (Reflect.hasMetadata(MetadataKeys.LOGGERS, target.constructor)) {
    return Reflect.getMetadata(MetadataKeys.LOGGERS, target.constructor);
  }
  const logger = Framework.instance?.modules?.logger as LoggerModule;
  Reflect.defineProperty(target.constructor, MetadataKeys.LOGGERS, logger);

  return logger;
}

export { Log }