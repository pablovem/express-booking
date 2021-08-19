module.exports = (error, req, res, next) => {
  console.log('My express error handler');
  const status = error.statusCode || 500;
  const message = error.message;
  const data =  error.data;
  res.status(status).json({ success: false, message, data });
};