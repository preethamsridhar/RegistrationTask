## Question
### React.js (Web)
Using React Hooks and pure Functional Components, create a simple registration form
that accepts the following from a user

Course (Radio)
1. Technical Report Writing
2. English Literature
3. Computer Sciences

#### Subject (Select)

If Course 1 is selected, then
1. Short Reports
2. Annual Reports
3. Presentations

If Course 2 is selected, then
1. Poetry
2. Short Stories
3. Drama

If Course 3 is selected, then
1. Web Development
2. Desktop Software Development
3. Research and Analysis

#### Start date (Date Picker)
#### Additional Notes (Textarea)

Add necessary data validation that checks all data is entered by the user except Additional
notes that is optional. But if the user has entered something inside additional notes, then
validate that it is not less than 20 characters and not more than 500 characters. Validate
the date picker date as: if the user selects any date other than {20 December, 2019; 15
January, 2020; 1 February, 2020} then you should display an error message that says
something along the lines “Your selected course and subject is not offered beginning from
your selected date”.

When the user submits the data, display some kind of loading animation inside the
“Submit” button. Delay the process for a few seconds to mimic as if the app is
communicating with a real server. After a few seconds, simply display a nice modal that
says “Your course has been successfully registered.”