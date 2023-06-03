describe("Test Plan - getMembersOfSurvey", () => {
  it("Verify given survey id it has an specific status - Count the COMPLETED ones", () => {
    const surveyID = 16; //Participation.csv has survyID 16 as completed
    const statusSurvey = "COMPLETED"; // Change the status you want

    let completedTrueCount = 0;
    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.greaterThan(1);

      cy.wrap(response.body)
        .each((member, index) => {
          cy.wrap(member).should("have.property", "id");
          cy.wrap(member).should("have.property", "name");
          cy.wrap(member).should("have.property", "emailAddress");
          cy.wrap(member).should("have.property", "active");

          if (member.id) {
            completedTrueCount++;
          }
        })
        .then(() => {
          expect(completedTrueCount).to.be.greaterThan(1);
        });
    });
  });

  it("Verify given survey id it has an specific status - Count the REJECTED ones", () => {
    const surveyID = 95; //Participation.csv has survyID 95 as REJECTED
    const statusSurvey = "REJECTED"; // Change the status you want

    let RejectedTrueCount = 0;
    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.greaterThan(1);

      cy.wrap(response.body)
        .each((member, index) => {
          cy.wrap(member).should("have.property", "id");
          cy.wrap(member).should("have.property", "name");
          cy.wrap(member).should("have.property", "emailAddress");
          cy.wrap(member).should("have.property", "active");

          if (member.active) {
            RejectedTrueCount++;
          }
        })
        .then(() => {
          expect(RejectedTrueCount).to.be.greaterThan(1);
        });
    });
  });

  it("Verify given survey id it has an specific status - Count the NOT ASKED ones", () => {
    const surveyID = 95; //Participation.csv has NO survyID WITH STATUS as NOT_ASKED
    const statusSurvey = "NOT_ASKED"; // Change the status you want

    let notAskedTrueCount = 0;
    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.equal(0);

      cy.wrap(response.body)
        .each((member, index) => {
          cy.wrap(member).should("have.property", "id");
          cy.wrap(member).should("have.property", "name");
          cy.wrap(member).should("have.property", "emailAddress");
          cy.wrap(member).should("have.property", "active");

          if (member.active) {
            notAskedTrueCount++;
          }
        })
        .then(() => {
          expect(notAskedTrueCount).to.be.equal(0);
        });
    });
  });

  it("Verify given survey id it has an specific status - Count the FILTERED ones", () => {
    const surveyID = 25; //Participation.csv has survyID 95 as FILTERED
    const statusSurvey = "FILTERED"; // Change the status you want

    let filteredTrueCount = 0;
    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.greaterThan(1);

      cy.wrap(response.body)
        .each((member, index) => {
          cy.wrap(member).should("have.property", "id");
          cy.wrap(member).should("have.property", "name");
          cy.wrap(member).should("have.property", "emailAddress");
          cy.wrap(member).should("have.property", "active");

          if (member.active) {
            filteredTrueCount++;
          }
        })
        .then(() => {
          expect(filteredTrueCount).to.be.greaterThan(1);
        });
    });
  });

  it.skip("Verify given invalid survey id", () => {
    const surveyID = 300; //Participation.csv does not have survyID 16 as completed
    const statusSurvey = "COMPLETED"; // Change the status you want

    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`,
      { failOnStatusCode: false }
    ).then((response) => {
      expect(response.body.status).to.equal(500);

      //It is not documented, and it should be fixed
    });
  });

  it.skip("Verify given invalid survey id and invalid survey status", () => {
    const surveyID = 300; //Participation.csv does not have survyID 16 as completed
    const statusSurvey = "DynataQA"; // Change the status you want

    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`,
      { failOnStatusCode: false }
    ).then((response) => {
      expect(response.body.status).to.equal(500);

      //It is not documented, and it should be fixed
    });
  });

  it.skip("Verify given Valid survey id and invalid survey status", () => {
    const surveyID = 1; //Participation.csv does not have surveyID 1 with this status
    const statusSurvey = "DynataQA"; // Change the status you want

    cy.request(
      "GET",
      `/api/surveys/${surveyID}/members?status=${statusSurvey}`,
      { failOnStatusCode: false }
    ).then((response) => {
      expect(response.body.status).to.equal(500);

      //It is not documented, and it should be fixed
    });
  });
});
