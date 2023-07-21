function uniRestPromise(unirest_req, always_resolve) {
  return new Promise((resolve, reject) => {
    unirest_req
      .strictSSL(false)
      .end(r => {
        return always_resolve === true || (r.status >= 200 && r.status < 300)
          ? resolve(r.body)
          : reject(r);
      });
  });
}
module.exports = {
  uniRestPromise: uniRestPromise
};