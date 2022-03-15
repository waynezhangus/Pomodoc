import Button from '@mui/material/Button'

function Calendar({docs}) {

  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = '';
  var SECRET = '';
  var API_KEY = '';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      const events = []
      for(let i = 0; i < docs.length; i += 1) {
          const event = {
            'summary': docs[i].title, //title
            'start': {
              'date': docs[i].dueDate.split('T')[0], //dueDate yyyy-mm-dd
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'date': docs[i].dueDate.split('T')[0], //dueDate yyyy-mm-dd
              'timeZone': 'America/Los_Angeles'
            }
          }
          events.push(event)
      }
      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        const batch = gapi.client.newBatch();
        events.map((r, j) => {
            batch.add(gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': events[j]
            }))
          })

        batch.then(function(){
        console.log('all jobs now dynamically done!!!')
        });
      })
    })
  }

  return (
    <Button sx={{ mt:4, ml:38.5 }} onClick={handleClick} variant='contained'>Add to Google Calendar</Button>
  );
}

export default Calendar;