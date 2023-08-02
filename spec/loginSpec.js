/* eslint-disable no-undef */
let request = require("request");

let baseUrl = "http://localhost:8080/teachers";

describe("classes", function () {
  describe("GET /", function () {
    it("returns status code 200", function (done) {
      request.get(baseUrl, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        console.log(error);

        done();
      });
    });
  });
});
