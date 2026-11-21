export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  if (error?.code === 11000) return res.status(409).json({ message: "This email is already in use" });
  if (error?.name === "ValidationError") {
    return res.status(400).json({ message: "Validation failed", errors: Object.values(error.errors).map((item) => item.message) });
  }
  if (error?.name === "CastError") return res.status(400).json({ message: "Invalid resource ID" });
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
}
