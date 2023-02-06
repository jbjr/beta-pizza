import React from "react";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useNavigate} from "react-router-dom";

export default function PayPal({total}){

    const amount = "2";
    const currency = "USD";
    const style = {"layout":"vertical"};

    const client = "Ac-xl74fK4C_wDeaa34xcu8ifrJjg_NfdEsNew6-NVjk3TtRFu-wxaMCtFZx5j2Rcyp06du8Y0H7jDLx";

    const navigate = useNavigate();

    const createOrder = (data, actions) => {
        const num = total;
        console.log(num);
        const strTotal = num.toString();
        console.log(strTotal);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: strTotal,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    };
    const onApprove = (data, actions) => {

        return actions.order.capture().then(function (orderData) {
            // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];
            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);

            navigate('/payment-confirmed')
        });
    }

    return(
        <PayPalScriptProvider options={{"client-id": client, components: "buttons", currency: "USD"}}>
            <PayPalButtons style={style}
                           disabled={false}
                           forceReRender={[amount, currency, style]}
                           fundingSource={undefined}
                           createOrder={(data, actions) => createOrder(data, actions)}
                           onApprove={(data, actions) => onApprove(data,actions)}
            />
        </PayPalScriptProvider>
    )
}