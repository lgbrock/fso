0.4: new note

<!-- // depicting the situation where the user creates a new note on page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button. -->

- browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
- server-->browser: HTML-code
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
- server-->browser: main.css
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
- server-->browser: main.js
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
- server-->browser: {content: 'new note', date: '2021-12-15T16:15:58.183Z'}

note over browser:
- browser sends user input to the server
- server responds with a status code - url redirect
- browser reloads the notes page
- browser fetches the style sheet, js code, and raw data
- browser requests JSON data from server
- data is then sent as the body of the post request
- server then creates a new note object then adds it to an array called notes
- renders not to be displayed
end note

0.5: Single page app

<!-- Create a diagram depicting the situation where the user goes to the single page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa. -->

- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
- server-->browser: HTML-code
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
- server-->browser: spa.js
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
- server-->browser: main.css
- browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
- server-->browser: [{"content":"what da!","date":"2021-12-15T06:05:33.290Z"},{"content":"g","date":"2021-12-15T06:13:09.679Z"},{"content":"pj","date":"2021-12-15T06:23:56.735Z"},{"content":"lklk","date":"2021-12-15T06:24:00.090Z"},{"content":",l","date":"2021-12-15T06:24:01.043Z"},{"content":"Hh","date":"2021-12-15T06:36:13.106Z"},{"content":"a","date":"2021-12-15T06:46:49.900Z"},{"content":"test","date":"2021-12-15T07:22:13.309Z"},{"content":"as","date":"2021-12-15T07:34:53.395Z"},{"content":"","date":"2021-12-15T07:37:46.111Z"},{"content":"","date":"2021-12-15T07:37:49.789Z"},{"content":"dsa","date":"2021-12-15T07:41:15.236Z"},{"content":"test22","date":"2021-12-15T07:53:14.992Z"},{"content":"test23","date":"2021-12-15T08:01:45.700Z"},{"content":"sd","date":"2021-12-15T08:08:12.075Z"},{"content":"eqewq","date":"2021-12-15T08:08:36.532Z"},{"content":"123","date":"2021-12-15T08:08:36.985Z"},{"content":"456","date":"2021-12-15T08:26:31.263Z"},{"content":"sd","date":"2021-12-15T08:43:41.373Z"},{"content":"ewq","date":"2021-12-15T08:44:28.120Z"},{"content":"sd","date":"2021-12-15T09:25:53.194Z"},{"content":"asd","date":"2021-12-15T09:33:35.350Z"},{"content":"Earth Calling...","date":"2021-12-15T09:41:28.333Z"},{"content":"thfgh","date":"2021-12-15T09:45:00.517Z"},{"content":"ghfghf","date":"2021-12-15T09:45:04.451Z"},{"content":"tššutyu","date":"2021-12-15T09:45:52.452Z"},{"content":"hlelo","date":"2021-12-15T09:47:34.498Z"},{"content":"jj","date":"2021-12-15T09:50:35.281Z"},{"content":"f","date":"2021-12-15T09:51:48.702Z"},{"content":"f","date":"2021-12-15T09:56:39.658Z"},{"content":"asd","date":"2021-12-15T09:56:54.232Z"},{"content":"sss","date":"2021-12-15T09:57:01.306Z"},{"content":"cheking the form execution","date":"2021-12-15T10:12:39.827Z"},{"content":"dsad","date":"2021-12-15T10:12:46.000Z"},{"content":"levan","date":"2021-12-15T10:12:54.645Z"},{"content":"sad","date":"2021-12-15T10:12:57.659Z"},{"content":"tetete","date":"2021-12-15T10:14:39.042Z"},{"content":"fasffaf","date":"2021-12-15T10:15:00.916Z"},{"content":"gdgs","date":"2021-12-15T10:15:22.199Z"},{"content":"kkkkkk","date":"2021-12-15T10:15:35.134Z"},{"content":"чвавпывапав","date":"2021-12-15T10:15:45.113Z"},{"content":"äää","date":"2021-12-15T10:16:02.779Z"},{"content":"","date":"2021-12-15T10:20:59.281Z"},{"content":"sa","date":"2021-12-15T10:22:08.824Z"},{"content":"bb","date":"2021-12-15T10:23:59.103Z"},{"content":"asd","date":"2021-12-15T10:33:28.884Z"},{"content":"asd","date":"2021-12-15T10:36:54.307Z"},{"content":"cheking the form execution","date":"2021-12-15T10:39:32.765Z"},{"content":"cheking the form execution66","date":"2021-12-15T10:40:39.943Z"},{"content":"Earth Calling...","date":"2021-12-15T10:43:10.602Z"},{"content":"fd","date":"2021-12-15T10:44:55.765Z"},{"content":"leandro's new note","date":"2021-12-15T10:58:30.262Z"},{"content":"bb","date":"2021-12-15T11:03:05.224Z"},{"content":"hola","date":"2021-12-15T11:44:57.636Z"},{"content":"Olas van olas vienen","date":"2021-12-15T12:06:29.796Z"},{"content":"helloooooo","date":"2021-12-15T12:10:46.986Z"},{"content":"bbno$","date":"2021-12-15T12:10:57.575Z"},{"content":"uusi muistiinpano","date":"2021-12-15T12:43:12.223Z"},{"content":"lelel","date":"2021-12-15T12:55:54.416Z"},{"content":"sdgf","date":"2021-12-15T12:56:09.903Z"},{"content":"jiopo","date":"2021-12-15T12:58:18.117Z"},{"content":"morjesta pöytään","date":"2021-12-15T13:31:50.484Z"},{"content":"Ade","date":"2021-12-15T13:38:48.914Z"},{"content":"tere","date":"2021-12-15T13:43:38.942Z"},{"content":"add this","date":"2021-12-15T13:53:16.286Z"},{"content":"hoola","date":"2021-12-15T14:03:06.120Z"},{"content":"datooooo","date":"2021-12-15T14:03:44.883Z"},{"content":"vaaaaa","date":"2021-12-15T14:04:04.046Z"},{"content":"the new note","date":"2021-12-15T14:06:16.492Z"},{"content":"magaria","date":"2021-12-15T14:07:07.599Z"},{"content":"new note","date":"2021-12-15T14:07:38.026Z"},{"content":"cheking the form execution","date":"2021-12-15T14:08:06.506Z"},{"content":"note note","date":"2021-12-15T14:09:17.748Z"},{"content":"semi funny meme","date":"2021-12-15T14:09:20.776Z"},{"content":"ok","date":"2021-12-15T14:11:04.207Z"},{"content":"ok","date":"2021-12-15T14:11:12.460Z"},{"content":"hrthwrh","date":"2021-12-15T14:13:26.642Z"},{"content":"olaaa","date":"2021-12-15T14:20:48.321Z"},{"content":"ajouter une","date":"2021-12-15T14:22:24.430Z"},{"content":"ok","date":"2021-12-15T14:24:04.731Z"},{"content":"ok","date":"2021-12-15T14:27:26.372Z"},{"content":"hrthwrh","date":"2021-12-15T14:27:35.871Z"},{"content":"tere","date":"2021-12-15T14:37:48.295Z"},{"content":"test","date":"2021-12-15T14:40:19.812Z"},{"content":"new note","date":"2021-12-15T14:40:31.866Z"},{"content":"spaTest2","date":"2021-12-15T14:56:08.835Z"},{"content":"asd","date":"2021-12-15T14:57:13.015Z"},{"content":"asd","date":"2021-12-15T14:59:13.154Z"},{"content":"miqa","date":"2021-12-15T15:00:38.371Z"},{"content":"miqa","date":"2021-12-15T15:01:16.558Z"},{"content":"JDH NEW NOTE","date":"2021-12-15T15:08:44.165Z"},{"content":"JDH NEWER NOTE","date":"2021-12-15T15:13:10.374Z"},{"content":"JDH NEWEST NOTE","date":"2021-12-15T15:13:42.088Z"},{"content":"asd","date":"2021-12-15T15:25:15.669Z"},{"content":"","date":"2021-12-15T15:58:33.858Z"},{"content":"booooo","date":"2021-12-15T15:59:36.008Z"},{"content":"","date":"2021-12-15T16:01:47.113Z"},{"content":"does not reload the whole page with a single page app","date":"2021-12-15T16:02:34.836Z"},{"content":"new note","date":"2021-12-15T16:15:58.183Z"},{"content":"new note for single page app","date":"2021-12-15T16:33:55.522Z"}]

note over browser:
- only renders html
- executes js code fetched from the server
- notes are fetched from the server as json data
- html elements are added for displaying the notes to the spa using DOM-API
- end note

0.6: New note

<!-- Create a diagram depicting the situation where the user creates a new note using the single page version of the app. -->

- browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
- server-->browser: {content: "New not for single page app", date: "2021-12-15T16:56:31.450Z"}

note over browser:
- only one request is sent to the server
- content-type header tells the server the data is in json format
- no redirect and browser stays on the same page
- event handler creates a new note and sends it to the server
- end note
