import {BrowserRouter, Routes,Route} from 'react-router-dom'
import SolarCalculatorApp from './components/SolarCalculatorApp'
import UserForm from './components/UserForm'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<SolarCalculatorApp/>}/>
      <Route path='/add-user' element={<UserForm/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App