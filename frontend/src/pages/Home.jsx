import Header from '../components/Header'
// import Cards from '../components/Cards'
import Footer from '../components/Footer'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Header/>
        {/* <main>
          <Cards/>
        </main> */}
        <Footer/>
    </LocalizationProvider>
  );
}