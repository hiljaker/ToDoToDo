import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./styles/Login.css"
import { LoginAction } from "../redux/actions";
import { connect } from 'react-redux';
import axios from 'axios';
import { api_url } from '../helpers/api_url';
import Swal from 'sweetalert2';


const Login = (props) => {
    const [dataLogin, setdataLogin] = useState({
        usernamemail: "",
        password: ""
    })


    const inputHandler = (e) => {
        setdataLogin({ ...dataLogin, [e.target.name]: e.target.value })
    }

    const [hidepass, sethidepass] = useState("password")

    const lihatPassword = (e) => {
        if (e.target.checked) {
            sethidepass("text")
        } else {
            sethidepass("password")
        }
    }

    const [remember, setRemember] = useState(false)

    const rememberMeHandler = (e) => {
        if (e.target.checked) {
            setRemember(true)
        } else {
            setRemember(false)
        }
    }

    const onLogin = async () => {
        const { usernamemail, password } = dataLogin
        if (!usernamemail || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Isi semua!',
                timer: 1500,
                timerProgressBar: true
            })
            return
        }
        let res = await axios.post(`${api_url}/auth/login`, {
            username: usernamemail,
            email: usernamemail,
            password: password
        })
        try {
            if (!res.data.length) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Akun tidak terdaftar!',
                    timer: 1500,
                    timerProgressBar: true
                })
                return
            }
            localStorage.setItem("token", res.headers["access-token"])
            props.LoginAction(res.data[0])
            alert("berhasil login")
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        setdataLogin(dataLogin)
        setRemember(remember)
        if (remember) {
            localStorage.setItem("remember", true)
        } else {
            localStorage.setItem("remember", false)
        }
    }, [dataLogin, remember])

    // Redirect not working
    // if (props.auth.isLogin) {
    //     return <Redirect to="/" />
    // }

    return (
        <div>
            <div className="login-box">
                <h1>Login</h1>
                <div className="login-input-box">
                    <input type="text" placeholder="username atau email" name="usernamemail" className="login-input-style" onChange={inputHandler} />
                </div>
                <div className="login-input-box">
                    <input type={hidepass} placeholder="password" name="password" className="login-input-style" onChange={inputHandler} />
                </div>
                <div className="login-input-box">
                    <input type="checkbox" onChange={lihatPassword} /> Lihat Password
                </div>
                <div className="login-input-box">
                    <button className="login-button-style" onClick={onLogin}>login</button>
                </div>
                <div className="login-input-box">
                    <input type="checkbox" onChange={rememberMeHandler} /> Remember me
                </div>
                <p>Belum punya akun? <Link to="/signup">Daftar disini</Link>!</p>
                <p>Kembali ke <Link to="/">Home</Link></p>
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps, { LoginAction })(Login)
