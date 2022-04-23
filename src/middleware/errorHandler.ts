import sendAdminEmail from "../util/sendAdminEmail";

const transformError = (err) => {
  return {
    success: false,
    name: err.name,
    code: err.code,
    errors: err.errors || {
      type: err.name,
      message: err.message,
    },
    controller: err.name == "RESTError" ? err.message : undefined,
  };
};

export default (err, _, res, __) => {
  if (!err.code) {
    sendAdminEmail(err);
  }

  res.status(err.code || 500).send(transformError(err));
};
