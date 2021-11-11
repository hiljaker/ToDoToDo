import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import "./styles/Login.css"
import { LoginAction } from "../redux/actions";
import { connect } from 'react-redux';
import axios from 'axios';
import { api_url } from '../helpers/api_url';

const Login = (props) => {
    const [dataLogin, setdataLogin] = useState({
        usernamemail: "",
        password: ""
    })

    useEffect(() => {
        setdataLogin(dataLogin)
    }, [dataLogin])

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

    const rememberMe = (e) => {
        if (e.target.checked) {
            localStorage.setItem("remember", true)
            console.log(localStorage.getItem("remember"));
        } else {
            localStorage.setItem("remember", false)
        }
    }

    const onLogin = async () => {
        const { usernamemail, password } = dataLogin
        if (!usernamemail || !password) {
            alert(`isi semua dong`)
        }
        let res = await axios.post(`${api_url}/auth/login`, {
            username: usernamemail,
            email: usernamemail,
            password: password
        })
        try {
            localStorage.setItem("token", res.headers["access-token"])
            props.LoginAction(res.data[0])
        } catch (error) {
            alert(error)
        }
    }

    // Redirect not working
    // if (props.auth.isLogin) {
    //     return <Redirect to="/" />
    // }

    return (
        <div>
            <div className="login-box">
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder="username atau email" name="usernamemail" onChange={inputHandler} />
                </div>
                <div>
                    <input type={hidepass} placeholder="password" name="password" onChange={inputHandler} />
                </div>
                <div>
                    <input type="checkbox" onChange={lihatPassword} /> Lihat Password
                </div>
                <div>
                    <button onClick={onLogin}>login</button>
                </div>
                <div>
                    <input type="checkbox" onChange={rememberMe} /> Remember me
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
