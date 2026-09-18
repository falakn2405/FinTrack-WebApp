import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Filter from './pages/Filter'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={3000}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/category' element={<Category />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/filter' element={<Filter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}

export default App
