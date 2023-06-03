describe("Test Plan - getSurveyStatistics", () => {
  it("Verify getSurveyStatistics response have the right properties", () => {
    cy.request("GET", `/api/surveys/statistics`, {
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response.body).each((member) => {
        cy.wrap(member).should("have.property", "surveyId");
        cy.wrap(member).should("have.property", "surveyName");
        cy.wrap(member).should("have.property", "numberOfCompletes");
        cy.wrap(member).should("have.property", "numberOfFiltered");
        cy.wrap(member).should("have.property", "numberOfRejected");
        cy.wrap(member).should("have.property", "avgLengthOfSurvey");

        console.log(response);
      });
    });
  });

  it("Verify the correct number of completes for Survey 20", () => {
    cy.request("/api/surveys/statistics").then((response) => {
      const surveyNumber = response.body.find(
        (surveyNumber) => surveyNumber.surveyId === 20
      );
      expect(surveyNumber.numberOfCompletes).to.eq(4);
    });
  });

  it("Verify statistics should have at least one survey with 5 filtered surveys", () => {
    cy.request("/api/surveys/statistics").then((response) => {
      const filteredSurveys = response.body.filter(
        (fsurvey) => fsurvey.numberOfFiltered === 5
      );
      expect(filteredSurveys.length).to.be.greaterThan(0);
    });
  });

  it("Verify Verify the survey name and number of completes for the 77th survey in the response", () => {
    cy.request("/api/surveys/statistics").then((response) => {
      const SurveySelected = response.body.find(
        (selectedSurvey) => selectedSurvey.surveyName === "Survey 77"
      );
      expect(SurveySelected).to.exist;
      expect(SurveySelected.numberOfCompletes).to.eq(6);
    });
  });
});
