import AppError from "../core/error.js";

export default (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  console.error(err);
  // amazonq-ignore-next-line
  res
    .status(500)
    .json({ success: false, message: "Error interno do servidor" });
};
