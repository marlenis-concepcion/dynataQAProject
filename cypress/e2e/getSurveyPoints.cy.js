describe("Test Plan - getSurveyPoints", () => {
  it("Verify getSurveyPoints response have the right properties and data type", () => {
    const memberId = 77;
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.greaterThan(0);
      const surveyItem = response.body;

      surveyItem.forEach((surveyItem) => {
        expect(surveyItem).to.have.property("survey").to.be.an("object");
        expect(surveyItem.survey).to.have.property("id").to.be.a("number");
        expect(surveyItem.survey).to.have.property("name").to.be.a("string");
        expect(surveyItem.survey)
          .to.have.property("expectedCompletes")
          .to.be.a("number");
        expect(surveyItem.survey)
          .to.have.property("completionPoints")
          .to.be.a("number");
        expect(surveyItem.survey)
          .to.have.property("filteredPoints")
          .to.be.a("number");

        expect(surveyItem).to.have.property("point").to.be.a("number");
      });
    });
  });

  it("Verify getSurveyPoints response with invalid memberID - long memberid not in db", () => {
    const memberId = "7777777";
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      /* But it should be 400-Bad Request
        status code indicates that the server cannot process the request due to client error. 
        In this case, the invalid Member ID provided by the client would be considered a client 
        error because it does not conform to the expected format or does not exist in the system.
    */
      expect(response.body).to.be.empty;
    });
  });

  it("Verify getSurveyPoints response with invalid memberID - checking letter are allowed", () => {
    const memberId = "marlenis4:04 am";
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      /* But it should be 400-Bad Request
        status code indicates that the server cannot process the request due to client error. 
        In this case, the invalid Member ID provided by the client would be considered a client 
        error because it does not conform to the expected format or does not exist in the system.
    */
      //not handled
      expect(response.body).to.be.empty;
    });
  });

  it("Verify getSurveyPoints response with invalid memberID - checking special chars are allowed", () => {
    const memberId = "$#$#$$#$#$#$#$#";
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      /* But it should be 400-Bad Request
        status code indicates that the server cannot process the request due to client error. 
        In this case, the invalid Member ID provided by the client would be considered a client 
        error because it does not conform to the expected format or does not exist in the system.
    */
      //not handled
      expect(response.body).to.be.empty;
    });
  });

  it("Verify getSurveyPoints response with invalid memberID - checking alphnumeric-mix are allowed", () => {
    const memberId = "-akjdskjdjskdjd4$#$$#$$#";
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      /* But it should be 400-Bad Request
        status code indicates that the server cannot process the request due to client error. 
        In this case, the invalid Member ID provided by the client would be considered a client 
        error because it does not conform to the expected format or does not exist in the system.
    */
      //not handled
      expect(response.body).to.be.empty;
    });
  });

  it("Verify getSurveyPoints response with invalid memberID - checking white space  are allowed", () => {
    const memberId = "    ";
    cy.request("GET", `/api/members/${memberId}/points`, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      /* But it should be 400-Bad Request
        status code indicates that the server cannot process the request due to client error. 
        In this case, the invalid Member ID provided by the client would be considered a client 
        error because it does not conform to the expected format or does not exist in the system.
    */
      //not handled
      expect(response.body).to.be.empty;
    });
  });
});
