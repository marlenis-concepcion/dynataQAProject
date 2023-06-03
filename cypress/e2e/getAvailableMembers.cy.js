describe("Test Plan - getAvailableMembers", () => {
  it("Verify /api/surveys/{surveyId}/members/not-invited response should return the correct data format", () => {
    const surveyId = 1;
    cy.request("GET", `/api/surveys/${surveyId}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response.body).each((member) => {
        cy.wrap(member).should("have.property", "id");
        cy.wrap(member).should("have.property", "name");
        cy.wrap(member).should("have.property", "emailAddress");
        cy.wrap(member).should("have.property", "active");
      });
    });
  });

  it("Verify /api/surveys/{surveyId}/members/not-invited includes only active members:", () => {
    const surveyId = 1;
    cy.request("GET", `/api/surveys/${surveyId}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response.body).each((member) => {
        cy.wrap(member).should("have.property", "active", true);
      });
    });
  });

  it("Verify /api/surveys/{surveyId}/members/not-invited doest not include members with active:false value", () => {
    const surveyId = 1;
    cy.request("GET", `/api/surveys/${surveyId}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response.body).each((member) => {
        cy.wrap(member).should("not.have.property", "active", false);
      });
    });
  });

  it("Verify response find a not invited name", () => {
    const surveyId = 1;
    const memberName = "Yesenia Conte";
    cy.request("GET", `/api/surveys/${surveyId}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      const member = response.body.find((member) => member.name === memberName);
      expect(member).to.exist;
    });
  });

  it("Verify response validates a member name does not exist in the not-invited list", () => {
    const surveyId = 40;
    const memberName = "I know I will get it";
    cy.request("GET", `/api/surveys/${surveyId}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      const member = response.body.find((member) => member.name === memberName);
      expect(member).not.to.exist;
    });
  });

  it.skip("Verify given invalid survey id", () => {
    const surveyID = 1000061; //Invalid Survey ID

    cy.request("GET", `/api/surveys/${surveyID}/members/not-invited `, {
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.status).to.equal(500);

      //It is not documented, and it should be fixed
    });
  });
});
