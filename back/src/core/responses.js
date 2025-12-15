export const success = (res, data, message = "Success", statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

export const error = (res, message, statusCode = 400) =>
  res.status(statusCode).json({ success: false, message });
