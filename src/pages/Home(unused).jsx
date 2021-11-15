import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogoutAction } from '../redux/actions'

const Home = (props) => {

    const onLogout = () => {
        localStorage.removeItem("token")
        props.LogoutAction()
        window.location.reload(false);
    }

    return (
        <div>
            {props.auth.isLogin ? (
                <>
                    <p>udah login</p>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <>
                    <p>belum login</p>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps, { LogoutAction })(Home)
