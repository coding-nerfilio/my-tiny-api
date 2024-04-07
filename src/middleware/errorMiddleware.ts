export const errorMiddleware = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({
      message: "Something broke!",
      error: error.stack,
    });
  }
};
