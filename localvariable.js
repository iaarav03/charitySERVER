const localvariables = (req, res, next) => {
    req.app.locals = {
      Otp: null,
      resetSession: false
    };
    next();
  };


  
  module.exports =  localvariables ;
  