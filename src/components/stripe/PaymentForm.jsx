import React, { useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51MbAZNKrjQpaXbt1KOtqbaWESAETrRzggd9l4u1VMp6rwnOXaUQesXQZMOUHNc2XctUiW16oO0rmpE5d1XwZXov5002lco92EI")
export default function PaymentForm() {

    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 10000,
                    id
                })

                if (response.data.success) {
                    console.log("Successful Payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }


    return (
        <>

            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardNumberElement />
                        </div>
                    </fieldset>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardExpiryElement />
                        </div>
                    </fieldset>
                    <fieldset className='FormGroup'>
                        <div className="FormRow">
                            <CardCvcElement />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div className="payment-success">
                    <h2>Payment successful</h2>
                    <h3 className='Thank-you'>Thank you for your patronage</h3>
                </div>
            }
        </>
    )
}
