import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51MbAZNKrjQpaXbt1KOtqbaWESAETrRzggd9l4u1VMp6rwnOXaUQesXQZMOUHNc2XctUiW16oO0rmpE5d1XwZXov5002lco92EI")

export default function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
