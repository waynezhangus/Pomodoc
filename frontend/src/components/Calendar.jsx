function Calendar({docs}) {

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

        // var event = {
        //   'summary': 'Awesome Event!', //title
        //   'start': {
        //     'date': '2022-06-28', //dueDate yyyy-mm-dd
        //     'timeZone': 'America/Los_Angeles'
        //   },
        //   'end': {
        //     'date': '2022-06-28', //dueDate yyyy-mm-dd
        //     'timeZone': 'America/Los_Angeles'
        //   }
        // }
        // for (let i = 0; i < events.length; i += 1){
        //     var request = gapi.client.calendar.events.insert({
        //         'calendarId': 'primary',
        //         'resource': events[i],
        //       })
        // }

        // request.execute(event => {
        //   console.log(event)
        //   window.open(event.htmlLink)
        // })
        // request.execute()
        

      })
    })
  }

  return (
    <div>
        <p>Click to add docs to Google Calendar</p>
        <button style={{width: 100, height: 50}} onClick={handleClick}>Add Docs</button>
    </div>
  );
}

export default Calendar;