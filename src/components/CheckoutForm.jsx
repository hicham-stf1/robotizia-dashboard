import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" className="w-[40%] " onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="w-full flex justify-center items-center 
      bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 font-bold
      py-2.5 my-2" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="text-center">{message}</div>}
      <button onClick={() => navigate("/")} className="w-full mt-3 flex justify-center items-center 
      bg-gradient-to-r from-red-500 via-red-600 to-red-500 font-bold
      py-2.5 my-2"  id="submit">
        <span id="button-text">
          Cancel
        </span>
      </button>


    </form>
  );
}
