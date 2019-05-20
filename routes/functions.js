function startSession(req) {
  req.session.auth = true;
}

function passHash(password) {
  return passwordHash.generate(password);
}