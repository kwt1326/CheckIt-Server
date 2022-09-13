import * as express from 'express';
import { ModuleDefaultClass } from "../common";
import { RouterApiSpec, RouterProps } from "./types";

class RouterModule implements ModuleDefaultClass {
  private schema: { [x: string]: RouterApiSpec } = {};
  private routeFunctions: { [x: string]: (api: RouterApiSpec) => any } = {};

  constructor({ path, routeFunctions }: RouterProps) {
    const apiSchemaJson = require(path);
    const apiSchema = Object.freeze(apiSchemaJson);

    this.schema = apiSchema;
    this.routeFunctions = routeFunctions
  }

  /**
   * @description json schema router module - API 스펙을 파싱하여 경로를 라우팅합니다.
   */
  init(app: express.Express) {
    const _schema = Object.entries(this.schema);
    const info: { method: string; url: string, success: boolean }[] = [];

    _schema.forEach(([key, api]) => {
      let isRegistered = false;
      if (typeof this.routeFunctions[key] === 'function') {
        app[api.method](api.url, this.routeFunctions[key](api));
        isRegistered = true;
      }

      info.push({
        method: api.method.toLocaleUpperCase(),
        url: api.url,
        success: isRegistered,
      });
    })

    // // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //   next(createError(404));
    // });

    // // error handler
    // app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};

    //   // render the error page
    //   res.status(err.status || 500);
    //   res.send({ 'error': err.message });
    // });
    
    console.log('* APIs *******');
    console.table(info);
  }

  // init() {
  //   const info: Array<{ api: string, handler: string }> = [];

  //   controllers.forEach((controllerClass) => {
  //     const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

  //     const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
  //     const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

  //     const exRouter = express.Router();

  //     routers.forEach(({ method, path, handlerName }) => {
  //       exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));

  //       info.push({
  //         api: `${method.toLocaleUpperCase()} ${basePath + path}`,
  //         handler: `${controllerClass.name}.${String(handlerName)}`,
  //       });
  //     });

  //     this._instance.use(basePath, exRouter);
  //   });

  //   console.table(info);
  // }
}

export { RouterModule };
