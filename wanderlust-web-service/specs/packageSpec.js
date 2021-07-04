const request = require("request");
const baseUrl = "http://localhost:4000/package";

describe("TestCase Set 1: Set Package Db", () => {
    it("TestCase 1: Returns status code 200", (done) => {
        request.get(baseUrl + "/DestinationSetup", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    it("TestCase 2: Returns Inserted Successfully", (done) => {
        request.get(baseUrl + "/DestinationSetup", (error, response, body) => {
            expect(body).toBe("Insertion Successfull");
            done();
        });
    });
});

describe("TestCase Set 2: Set HotDeal Db", () => {
    it("TestCase 1: Returns status code 200", (done) => {
        request.get(baseUrl + "/hotdealSetup", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    it("TestCase 2: Returns Inserted Successfully", (done) => {
        request.get(baseUrl + "/hotdealSetup", (error, response, body) => {
            expect(body).toBe("Insertion Successfull");
            done();
        });
    });
});

describe("TestCase Set 3: Get Hotdeals", () => {
    it("TestCase 1: Valid Response", (done) => {
        request.get(baseUrl + "/hotdeals", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
});

describe("TestCase Set 4: Get Search Bar Destination", () => {
    it("TestCase 1: Valid City Response", (done) => {
        request.get(baseUrl + "/destinations/Paris", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
    
    it("TestCase 2: Valid Continent Response", (done) => {
        request.get(baseUrl + "/destinations/ASIA", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toBeTruthy();
            done();
        });
    });
})