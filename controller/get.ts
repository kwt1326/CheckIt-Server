import { ControllerParams } from "./types";

function get({ req, res, spec }: ControllerParams) {
  

  res.status(200).json(spec.response);
  res.end();
}

export default get