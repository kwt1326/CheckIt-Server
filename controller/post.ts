import { ControllerParams } from "./types";

function post({ req, res, spec }: ControllerParams) {
  // Object.keys(spec).includes()

  res.status(200).json(spec.response);
  res.end();
}

export default post