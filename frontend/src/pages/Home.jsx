import Header from '../components/Header'
import PrivateRoute from '../components/PrivateRoute'
import Footer from '../components/Footer'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Header/>
        <main>
          <PrivateRoute />
        </main>
        <Footer/>
    </LocalizationProvider>
  );
}