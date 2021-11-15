import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { api_url } from '../helpers/api_url'
import "./styles/Signup.css"

const Signup = (props) => {
    const [dataSignup, setdataSignup] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [passAlert, setpassAlert] = useState(false)
    const [button, setbutton] = useState(false)

    const inputHandler = (e) => {
        setdataSignup({ ...dataSignup, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setdataSignup(dataSignup)
        const cekPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})")
        if (!cekPass.test(dataSignup.password)) {
            setpassAlert(false)
            setbutton(false)
            return
        } else {
            setpassAlert(true)
            setbutton(true)
        }
    }, [dataSignup])

    const [hidePass, sethidePass] = useState("password")

    const lihatPassword = (e) => {
        if (e.target.checked) {
            sethidePass("text")
        } else {
            sethidePass("password")
        }
    }

    const onSignup = () => {
        const { username, email, password } = dataSignup
        if (!username || !email || !password) {
            alert("isi semua")
            return
        }
        axios.post(`${api_url}/auth/isregistered`, {
            username,
            email
        }).then((res) => {
            if (res.data.length) {
                alert("sudah terdaftar")
                return
            }
            axios.post(`${api_url}/auth/signup`, {
                username,
                email,
                password
            }).then(() => {
                alert("berhasil dan cek email untuk verifikasi")
            })
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div>
            <div className="signup-box">
                <h1>Sign Up</h1>
                <div className="signup-input-box">
                    <input type="text" placeholder="username" name="username" className="signup-input-style" onChange={inputHandler} />
                </div>
                <div className="signup-input-box">
                    <input type="email" placeholder="email" name="email" className="signup-input-style" onChange={inputHandler} />
                </div>
                <div className="signup-input-box">
                    <input type={hidePass} placeholder="password" name="password" className="signup-input-style" onChange={inputHandler} />
                </div>
                <p hidden={passAlert} style={{ fontSize: "85%", color: "red" }}>Password harus berisi setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka</p>
                <div className="signup-input-box">
                    <input type="checkbox" onChange={lihatPassword} /> Lihat Password
                </div>
                {button ? (
                    <div className="signup-input-box">
                        <button className="signup-button-style" onClick={onSignup}>Sign Up</button>
                    </div>

                ) : (
                    <div className="signup-input-box">
                        <button disabled className="signup-button-style-disabled" onClick={onSignup}>Sign Up</button>
                    </div>
                )}
                <p>Kembali ke <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps)(Signup)
