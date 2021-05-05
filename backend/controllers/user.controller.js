exports.allAccess = (req, res) => {
    res.status(200).send("Treści publiczne.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Treści dla użytkownika");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Treści dla Admina");
  };