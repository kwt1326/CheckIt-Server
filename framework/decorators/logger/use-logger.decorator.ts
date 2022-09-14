import Framework from "../.."
import { MetadataKeys } from "../../common/interface";
import { LoggerModule } from "../../modules";

const UseLogger: ClassDecorator = (target) => {
  // const logger = Framework.instance?.modules?.logger as LoggerModule;
  // const targetClassConstructor = target.constructor;
  // Reflect.defineMetadata(MetadataKeys.LOGGERS, logger, targetClassConstructor);
};

export { UseLogger }