export default function errorHandler(err, req, res, next) {
  // You can log the error here
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ error: message });
}
