import React from "react";
import { useState, useEffect } from "react";
import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants";
import PaypalButton from 'react-paypal-express-checkout'
import axios from 'axios'
import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";
import PaymentCancel from "./PaymentCancel"

function Payment(props) {
    const [environment, setEnvironment] = useState("sandbox")
    const [clientID, setClientID] = useState({sandbox: SANDBOX_CLIENT_ID})
    const [currency, setCurrency] = useState("USD")
    const [total, setTotal] = useState(props.total)
    const [order, setOrder] = useState(null)
    const [successFlag, setSuccess] = useState(false)
    const [errorFlag, setError] = useState(false)
    const [cancelFlag, setCancel] = useState(false)
    const [paymentId, setPaymentId] = useState("")

    const onSuccess = (payment) => {
        let temp = order;
        temp.status = "Pending"
        setOrder(temp)
        axios.post(`${SERVER_HOST}/orders/addOrder`, order)
        .then(res =>{
            localStorage.removeItem('order')
            const cart = {
                products: [],
                total: 0
            }
            localStorage.setItem("cart",JSON.stringify(cart))
            console.log("Payment succesfull")
            setPaymentId(payment.paymentID)
            setSuccess(true)
        })
        .catch(err => {
            console.log(err.response)
            setError(true)
        })
    }
    const onError = (e) => {
        localStorage.removeItem('order')
        console.log("Payment error")
        setError(true)
    }
    const onCancel = (e) => {
        localStorage.removeItem('order')
        console.log("Payment canceled")
        setCancel(true)
    }

    useEffect(() => {
        const localOrder = JSON.parse(localStorage.getItem('order'))
        if(localOrder){
            setOrder(localOrder)
        }else {
            setError(true)
        }
      }, [])
    

    return (
        <div className="Payment">
            <PaypalButton
                env={environment}
                client={clientID}
                currency={currency}
                total={total}
                shipping={1}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                style={{color: "blue"}}/>
            {successFlag ? <PaymentSuccess paymentId={paymentId}/> : ""}
            {errorFlag ? <PaymentError/> : ""}
            {cancelFlag ? <PaymentCancel/>: ""}
        </div>
      );
}

export default Payment;