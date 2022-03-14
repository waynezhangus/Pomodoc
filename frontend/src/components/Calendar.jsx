function Calendar() {

  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = '371469659869-s6loadjd3p30sm0uree294jftqmhvg3d.apps.googleusercontent.com';
  var SECRET = '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';
  var API_KEY = 'AIzaSyA9BBok9gROpGFSPYQrBn-N_VU-uGXpboI';
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

    //   gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!', //title
          'start': {
            'date': '2022-06-28', //dueDate yyyy-mm-dd
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'date': '2022-06-28', //dueDate yyyy-mm-dd
            'timeZone': 'America/Los_Angeles'
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        // request.execute(event => {
        //   console.log(event)
        //   window.open(event.htmlLink)
        // })
        request.execute()
        

      })
    })
  }

  return (
    <div>
        <p>Click to add event to Google Calendar</p>
        <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
    </div>
  );
}

export default Calendar;