import { IRouter, MetadataKeys, Method } from '../../common/interface';

/**
 * @description
 * method decorator 생성
 * Controller decorator 에서 basepath 를 사용하여 클래스에 메타데이터를 저장하기 시작합니다.
 * Controller decorator 가 적용된 클래스의 메타데이터에 route 정보를 기록합니다.
 * method -> path -> 최종 decorator function 반환
 * @param method 
 * @returns 
 */
const routeMethodDecoratorFactory = (method: Method) => 
  (path: string): MethodDecorator =>
    (target, propertyKey) => {
      // class constructor 에 기록합니다.
      const controllerClass = target.constructor;
      // 기록된 router metadata array 를 가져옵니다.
      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) :
        [];
      routers.push({
        method,
        path,
        handlerName: propertyKey,
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }

export { routeMethodDecoratorFactory }