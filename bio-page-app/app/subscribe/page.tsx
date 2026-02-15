"use client";

import { useState, useEffect } from "react";
import { FiCheck, FiLock } from "react-icons/fi";
import Script from "next/script";

export default function SubscriptionPage() {
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/INR"
        );
        const data = await res.json();
        setExchangeRate(data.rates.USD);
      } catch (err) {
        console.error("Exchange rate fetch failed");
      }
    };
    fetchRate();
  }, []);

  const getYearlyPrice = (monthly: number) => {
    const yearlyPrice = monthly * 12;
    return Math.round(yearlyPrice * 0.8);
  };

  const getOriginalYearlyPrice = (monthly: number) => {
    return monthly * 12;
  };

  const convertPrice = (price: number) => {
    if (currency === "USD" && exchangeRate) {
      return Number((price * exchangeRate).toFixed(2));
    }
    return price;
  };

  const formatPrice = (price: number) => {
    const converted = convertPrice(price);
    return currency === "USD" ? `$${converted}` : `₹${converted}`;
  };

  // ===========================
  // ✅ IMPROVED PAYMENT FUNCTION
  // ===========================
  const handlePayment = async (amount: number) => {
    try {
      // 🔥 Always send INR amount to backend
      // amount already INR hai
const amountInPaise = amount * 100;


const res = await fetch(
  "http://localhost:8080/api/payment/create-order",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInPaise,
    }),
  }
);


      const order = await res.json();
      console.log("Order Response:", order);

      if (!order.id) {
        alert("Order creation failed");
        return;
      }

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: "rzp_test_SEuZBWWkoQd7Iz",
        amount: order.amount,
        currency: "INR",
        name: "Influencer",
        description: "Subscription Payment",
        order_id: order.id,

        handler: async function (response: any) {
  console.log("Payment Success:", response);

  const verifyRes = await fetch(
    "http://localhost:8080/api/payment/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
    }
  );

  const verifyData = await verifyRes.json();

  if (verifyData.success) {
    alert("Payment Successful 🎉");
  } else {
    alert("Payment Verification Failed ❌");
  }
},


        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        theme: {
          color: "#10b981",
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        console.error("Payment Failed:", response.error);
        alert(response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed");
    }
  };
  // ===========================

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center px-4 py-10 transition-colors duration-300">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Subscription Plans
          </h1>

          <div className="flex items-center justify-center gap-4 flex-wrap">

            <div className="flex items-center gap-3">
              <span className={!yearly ? "font-semibold text-gray-900 dark:text-white" : "text-gray-500"}>
                Monthly
              </span>

              <button
                onClick={() => setYearly(!yearly)}
                className={`relative w-14 h-7 flex items-center rounded-full p-1 transition ${
                  yearly ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    yearly ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>

              <span className={yearly ? "font-semibold text-gray-900 dark:text-white" : "text-gray-500"}>
                Yearly
              </span>

              {yearly && (
                <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                  20% OFF
                </span>
              )}
            </div>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
              className="border rounded-lg px-3 py-1 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm text-gray-700 dark:text-white"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
            </select>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">

          <PlanCard
            title="Starter"
            monthlyPrice={99}
            yearly={yearly}
            selected={selectedPlan === "Starter"}
            onClick={() => setSelectedPlan("Starter")}
            getYearlyPrice={getYearlyPrice}
            getOriginalYearlyPrice={getOriginalYearlyPrice}
            formatPrice={formatPrice}
            handlePayment={handlePayment}
            features={[
              "10 Cards Limit",
              "Basic Bio Page",
              "Limited Social Icons",
              "Subdomain Username",
            ]}
          />

          <PlanCard
            title="Professional"
            monthlyPrice={199}
            yearly={yearly}
            selected={selectedPlan === "Professional"}
            onClick={() => setSelectedPlan("Professional")}
            getYearlyPrice={getYearlyPrice}
            getOriginalYearlyPrice={getOriginalYearlyPrice}
            formatPrice={formatPrice}
            handlePayment={handlePayment}
            features={[
              "Unlimited Cards",
              "Professional Bio Page",
              "All Social Icons",
              "Custom Username",
            ]}
          />

          <PlanCard
            title="Business"
            monthlyPrice={299}
            yearly={yearly}
            selected={selectedPlan === "Business"}
            onClick={() => setSelectedPlan("Business")}
            getYearlyPrice={getYearlyPrice}
            getOriginalYearlyPrice={getOriginalYearlyPrice}
            formatPrice={formatPrice}
            handlePayment={handlePayment}
            features={[
              "Everything in Pro",
              "Priority Support",
              "Advanced Analytics",
              "Team Access",
              "No Limits",
            ]}
          />
        </div>

        <div className="mt-8 flex justify-center">
  <a
    href="https://razorpay.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="
      rounded-md
      overflow-hidden
      shadow-md
      hover:shadow-lg
      transition
      duration-300
    "
  >
    <img
      src="https://badges.razorpay.com/badge-light.png"
      className="h-11 dark:hidden"
      alt="Razorpay"
    />

    <img
      src="https://badges.razorpay.com/badge-dark.png"
      className="h-11 hidden dark:block"
      alt="Razorpay"
    />
  </a>
</div>



      </div>
    </>
  );
}

function PlanCard({
  title,
  monthlyPrice,
  yearly,
  features,
  selected,
  onClick,
  getYearlyPrice,
  getOriginalYearlyPrice,
  formatPrice,
  handlePayment,
}: any) {

  const finalPrice = yearly
    ? getYearlyPrice(monthlyPrice)
    : monthlyPrice;

  const originalYearly = getOriginalYearlyPrice(monthlyPrice);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-left transition transform hover:-translate-y-1 ${
        selected ? "border-2 border-emerald-500 scale-105" : ""
      }`}
    >
      <div className="text-center mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>

        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {formatPrice(finalPrice)}
          <span className="text-base font-medium text-gray-500 dark:text-gray-400">
            {yearly ? " / year" : " / month"}
          </span>
        </p>

        {yearly && (
          <>
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(originalYearly)}
            </p>
            <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((item: string, index: number) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
              <FiCheck className="text-emerald-600" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePayment(finalPrice);
        }}
        className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition ${
          selected
            ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
      >
        Subscribe Now
      </button>
    </div>
  );
}
