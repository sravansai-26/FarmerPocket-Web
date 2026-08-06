import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { loadRazorpay } from "../../lib/razorpay";
import { useAuth } from "../../lib/auth";

export function RazorpayTopUp({ amount = 1000 }: { amount?: number }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        setError("Failed to load Razorpay SDK. Please check your connection.");
        setLoading(false);
        return;
      }

      // 2. Call backend to create order
      const orderRes = await api.post("/wallet/create-order", { amount });
      const { order_id, amount: rzpAmount, currency, key_id } = orderRes.data;

      if (!key_id || key_id.startsWith("mock")) {
        // Mock mode handler if keys aren't fully set in backend
        const mockVerify = await api.post("/wallet/verify-signature", {
          razorpay_order_id: order_id,
          razorpay_payment_id: "mock_payment",
          razorpay_signature: "mock_signature",
          amount: amount
        });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        setLoading(false);
        return;
      }

      // 3. Configure Razorpay options
      const options = {
        key: key_id,
        amount: rzpAmount,
        currency: currency,
        name: "FarmerPocket",
        description: "Protection Wallet Top-up",
        image: "/logo.svg", // Optionally add logo if you have one
        order_id: order_id,
        handler: async function (response: any) {
          try {
            // 4. Verify signature on backend
            await api.post("/wallet/verify-signature", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount
            });
            // 5. Invalidate dashboard to reflect new balance
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            setLoading(false);
          } catch (err: any) {
            setError(err.response?.data?.detail || "Payment verification failed.");
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name || "Farmer",
          email: user?.email || "",
          contact: ""
        },
        theme: {
          color: "#08662c" // Match FarmerPocket primary green
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
      paymentObject.open();

    } catch (err: any) {
      setError(err.response?.data?.detail || "Error initiating payment.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-start gap-2">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Processing..." : `+ Top up ₹${amount}`}
      </button>
      {error && <p className="text-[12px] text-[var(--failure)] font-medium max-w-sm">{error}</p>}
    </div>
  );
}
