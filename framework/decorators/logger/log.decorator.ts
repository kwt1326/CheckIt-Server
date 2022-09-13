import { MetadataKeys } from "../../common/interface";

const Log: MethodDecorator = (target, propertyKey) => {
  if (Reflect.hasMetadata(MetadataKeys.LOGGERS, target)) {
    const logger = Reflect.getMetadata(MetadataKeys.LOGGERS, target);
    Reflect.defineProperty(target, propertyKey, logger);
  }
}

export { Log }