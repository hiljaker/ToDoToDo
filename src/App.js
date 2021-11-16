import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { api_url } from './helpers/api_url'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
import { LoginAction } from './redux/actions'
import Navbar from './components/Navbar';
//? pages
import { Home, NotFound, Login, Signup, VerifyAlert } from './pages';
import AdminPage from './pages/admin/adminPage'

const App = (props) => {

  useEffect(async () => {
    let token = localStorage.getItem("token")
    let res = await axios.get(`${api_url}/auth/rememberme`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    })
    try {
      let remember = localStorage.getItem("remember")
      if (remember == "true") {
        props.LoginAction(res.data[0])
      } else {
        return
      }
    } catch (error) {
      alert(error)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'*'} element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        {props.auth.isLogin ? (
          <Route path="/login" element={<Navigate to="/" />}
          />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/admin" element ={<AdminPage/>} />
      </Routes>
    </div>
  )
}

const MapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(MapStateToProps, { LoginAction })(App)
