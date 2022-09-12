import { MetadataKeys } from "../../common/interface";

const Controller = (basepath: string): ClassDecorator => {
  return (target) => Reflect.defineMetadata(MetadataKeys.BASE_PATH, basepath, target);
}

export { Controller }