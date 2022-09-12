import { Method } from "../../common/interface";
import { routeMethodDecoratorFactory } from "./method-factory.decorator";

const GET = routeMethodDecoratorFactory(Method.GET);
const POST = routeMethodDecoratorFactory(Method.POST);

export {
  GET, POST
}