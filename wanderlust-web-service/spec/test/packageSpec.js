const request = require("request");
const baseUrl = "http://localhost:4000";

describe("TestCase Set 1: User db Setup", () => {
    it("TestCase 1: Returns Insertion error", (done) => {
        request.get(baseUrl + "/setup", (error, response, body) => {
            expect(error).toBe(null);
            done();
        });
    });

    
    it("TestCase 2: Returns Inserted Successfully", (done) => {
        request.get(baseUrl + "/setup", (error, response, body) => {
            expect(body).toBe("Insertion Successfull");
            done();
        });
    });

    it("TestCase 3: Returns login error statuscode", (done) => {
        request.get(baseUrl + "/user/login", (error, response, body) => {
            expect(error).toBe(null);
            done();
        });
    });
});

describe("TestCase 2: Search package", () => {
    it("TestCase 1: Returns status code 200", (done) => {
        request.get(baseUrl + "/packages/ASIAA", (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it("TestCase 2: Returns Successfull Search", (done) => {
        request.get(baseUrl + "/packages/ASIA", (error, response, body) => {
            expect(body).toBeTruthy()
            done();
        });
    });

    it("TestCase 3: Returns Successfull Search", (done) => {
        request.get(baseUrl + "/packages/hotDeals", (error, response, body) => {
            expect(body).toBeTruthy()
            done();
        });
    });

    it("TestCase 4: Returns error", (done) => {
        request.get(baseUrl + "/packages/hotDeals", (error, response, body) => {
            expect(error).toBeFalsy()
            done();
        });
    });
});



describe("TestCase Set 3: User Registration", () => {
    it("TestCase 1: Valid Response", (done) => {
        request.get(baseUrl + "/user/register", (error, response, body) => {
            expect(response.statusCode).toBe(404);
            expect(body).toBeTruthy();
            done();
        });
    });

    it("TestCase 2: Valid Response", (done) => {
        request.get(baseUrl + "/user/register", (error, response, body) => {
            expect(error).toBeFalsy();
            done();
        });
    });
});


describe("TestCase Set 4: Store Booking Details", () => {
    it("TestCase 1: Successful Insertion of user Booking data", (done) => {
        request.get(baseUrl + "/book/U1001/D1001", (error, response, body) => {
            expect(body).toBeTruthy();
            done();
        });
    });

    it("TestCase 2: Booking insertion failed with statuscode", (done) => {
        request.get(baseUrl + "/book/U1001/D1001001a", (error, response, body) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    it("TestCase 3: Booking insertion failed", (done) => {
        request.get(baseUrl + "/book/U1001/D1001001a", (error, response, body) => {
            expect(error).toBe(null);
            done();
        });
    });
})

describe("TestCase Set 5: Deleteing data", () => {
    it("TestCase 1: Valid deletion", (done) => {
        request.get(baseUrl + "/book/cancelBooking/:bookingId", (error, response, body) => {
            expect(body).toBeTruthy();
            done();
        });
    })

    it("TestCase 2: deletion error", (done) => {
        request.get(baseUrl + "/book/cancelBooking/:bookingId", (error, response, body) => {
            expect(error).toBeFalsy();
            done();
        });
    })

    it("TestCase 3: deletion failed with statuscode", (done) => {
        request.get(baseUrl + "/book/cancelBooking/:bookingId", (error, response, body) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    })
})

describe("TestCase Set 6: Fetch Booking details", () => {
    it("TestCase 1: Successfull fetching of booking details", (done) => {
        request.get(baseUrl + "/book/getDetails/:userId", (error, response, body) => {
            expect(body).toBeTruthy();
            done();
        });
    })

    it("TestCase 2: Failed to fetch data", (done) => {
        request.get(baseUrl + "/book/getDetails/:userIdIdId", (error, response, body) => {
            expect(error).toBe(null);
            done();
        });
    })

    it("TestCase 3: Failed to fetch data", (done) => {
        request.get(baseUrl + "/book/getDetails/:userId", (error, response, body) => {
            expect(error).toBeFalsy()
            done();
        });
    })
})