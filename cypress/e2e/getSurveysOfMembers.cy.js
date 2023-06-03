describe("Test Plan - getSurveyofMembers", () => {
  const matrixMembers_Survey = [
    [1, 16],
    [1, 25],
    [1, 45],
    [1, 79],
    [1, 82],
    [1, 95],
  ]; // I got this array from the participant.csv table
  it("Verify given a member id it throws at least one survey", () => {
    const memberID = 1;
    const surveyID = 16;
    let surveyCount = 0;

    cy.request("GET", `/api/members/${memberID}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).not.to.be.null;
      expect(response.body.length).to.be.greaterThan(1);

      cy.wrap(response.body)
        .each((member, index) => {
          cy.wrap(member).should("have.property", "id");
          cy.wrap(member).should("have.property", "name");
          cy.wrap(member).should("have.property", "expectedCompletes");
          cy.wrap(member).should("have.property", "completionPoints");
          cy.wrap(member).should("have.property", "filteredPoints");

          if (index) {
            surveyCount++;
          }
        })
        .then(() => {
          expect(surveyCount).to.be.greaterThan(1);
        });
    });
  });

  matrixMembers_Survey.forEach(([memberID, surveyID]) => {
    it(`Verify given a memberID  ${memberID} , it has a relationship with surveyID  ${surveyID}`, () => {
      cy.request("GET", `/api/members/${memberID}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).not.to.be.null;
        expect(response.body.length).to.be.greaterThan(1);
        const survey = response.body.find((survey) => survey.id === surveyID);
        expect(survey).to.exist;
      });
    });
  });

  it("Verify a Member ID is not attached to an invalid survey ID", () => {
    const memberID = 1;
    const surveyID = -6666; // Replace with the survey ID that should not be in the Participant.csv
    cy.request("GET", `/api/members/${memberID}`, {
      failOnStatusCode: false,
    }).then((response) => {
      const survey = response.body.find((survey) => survey.id === surveyID);
      expect(survey).to.not.exist;
    });
  });

  //

  it("Verify /api/members/{memberId} response  has an object with a given survey name ", () => {
    const memberID = 2;
    // Replace with the survey name that should be present in the Participant.csv and

    cy.request("GET", `/api/members/${memberID}`, {
      failOnStatusCode: false,
    }).then((response) => {
      const surveyName = response.body.find(
        (surveyName) => surveyName.name === "Survey 01" //name taken from the Survey.csv
      );
      expect(surveyName).to.exist;
    });
  });

  it("Verify /api/members/{memberId} response  does not have an object with a given survey name ", () => {
    const memberID = 2;
    // Replace with the survey name that should be present in the Participant.csv and

    cy.request("GET", `/api/members/${memberID}`, {
      failOnStatusCode: false,
    }).then((response) => {
      const surveyName = response.body.find(
        (surveyName) => surveyName.name === "Marlenis QA at Dynata" //name does not exist on Survey.csv
      );
      expect(surveyName).to.not.exist;
    });
  });
});
