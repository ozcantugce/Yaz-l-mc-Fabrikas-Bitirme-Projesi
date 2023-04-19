import {auth, provider} from "../firebase-config.js";
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie";
import Header from "../components/Header.js";
import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default {
  render() {
    return (
      <Header/>
    )
  }
}


const cookies = new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;
    const signInWithGoogle = async () => {
        try {
       const result = await signInWithPopup(auth, provider);
       cookies.set("auth-token", result.user.refreshToken);
       setIsAuth(true);
    } catch (err) {
        console.error(err);
    }
   
    };

    return (
    <div className="card text-bg-info p-3 shadow p-3 mb-5 bg-body-tertiary rounded" style={{width: "50%", justifyContent: "center", marginLeft: "350px", marginTop: "50px"}}>
        <h1 style={{textAlign: "center", marginTop: "20px"}}>Giriş Yapınız.</h1>
        <img src="https://w7.pngwing.com/pngs/802/786/png-transparent-google-account-google-search-customer-service-google-logo-login-button-blue-sphere-car-rental-thumbnail.png" style={{width: "100px", borderRadius: "50%", marginLeft: "310px"}}/>
        <p style={{textAlign: "center", marginTop: "20px"}}><img src="https://w7.pngwing.com/pngs/882/225/png-transparent-google-logo-google-logo-google-search-icon-google-text-logo-business.png" style={{width: "20px"}}></img> Google ile oturum aç</p>
        <button type="button" className="btn btn-primary" style={{width: "150px", textAlign: "center", marginLeft: "290px"}} onClick={signInWithGoogle}>Oturum Aç</button>
    </div>)
}