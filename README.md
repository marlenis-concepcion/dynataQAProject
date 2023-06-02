# dynataApiTesting


Description of the development:

There is a list with the information of 300 people who participated in different surveys.
For each survey the respondent can receive points that later can be claimed as different gifts.

You can find active and inactive members in the file, in a survey we only can target the active members,
but it is possible that the currently inactive members participated in previous surveys.

We are storing 4 different participation statuses:
- (1) Not asked - Not participated in the questionnaire (was not asked)
- (2) Rejected - Not participated in the questionnaire (was asked, but no response)
- (3) Filtered - Based on the filtering questions, the member did not fit into the targeted group
- (4) Completed - Filled and finished the questionnaire
  The respondent can receive point only in 3 and 4 cases (points may differ between Filtered or Completed).

All the data are stored in csv files:
Members.csv - all the members who can participate in surveys
Surveys.csv - information about surveys that will target the members in order to collect their answers
Participation.csv  - information about survey participation, which member was part of which survey
Statuses.csv - all the possible statuses of a survey participation



API endpoints:
a) Fetch all the respondents who completed the questionnaire for the given survey id
b) Fetch all the surveys that were completed by the given member id
c) Fetch the list of points (with the related survey id) that the member collected so far (the input is the member id)
d) Fetch the list of members who can be invited for the given survey (not participated in that survey yet and active)
e) Fetch the list of surveys with statistics
- it should contain the following fields:
survey id,
survey name,
number of completes,
number of filtered participants,
number of rejected participants,
average length of time spent on survey (Participation.length)




------------------------------------------------------------------------------------------------------------------------------------

Your task is to write tests for the API endpoints.


You can start the application with the following command (java 11 is required to be installed first):
java -jar dynata-surveys-0.0.1-SNAPSHOT.jar 


Once the application is running, you can find the swagger documentation of the API here:
http://localhost:8080/swagger-ui/index.html


