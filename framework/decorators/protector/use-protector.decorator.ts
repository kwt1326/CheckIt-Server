import { RouterApiSpec } from "../../modules";


const useProtector = (token: string, api: RouterApiSpec): MethodDecorator =>
  (target, propertyKey) => {
    try {
      const authorization = api.headers?.Authorization;
      if (api.headers?.Authorization.required) {
        // TODO: validate token
        if (!token) {
          throw new Error(authorization?.description);
        }
      }
    } catch (e: any) {
      console.error(e);
    }
  }

export { useProtector }