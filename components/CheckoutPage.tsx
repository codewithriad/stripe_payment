"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    if (!clientSecret || !stripe || !elements) {
      return (
        // Loading spinner
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      );
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }
  };
  if (!clientSecret || !elements || !stripe) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-fuchsia-800 border-collapse rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}

      <button className="mt-4 px-16 py-4 w-full bg-blue-600 text-white font-bold rounded-md text-lg">
        {!loading ? `Pay ${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
