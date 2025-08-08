import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
    const { t, i18n } = useTranslation();

    const [adapterStatus, setAdapterStatus] = useState(null);
    const [loadingAdapter, setLoadingAdapter] = useState(false);

    const handlePay = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/payment/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const { id } = await res.json();
            const stripe = await stripePromise;
            stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error("Stripe checkout error:", error);
            alert(t('paymentError'));
        }
    };

    const fetchAdapterStatus = async () => {
        setLoadingAdapter(true);
        try {
            const res = await fetch(`${API_BASE}/api/adapter/test-connectivity`);
            const data = await res.json();
            setAdapterStatus(data);
        } catch (err) {
            setAdapterStatus({
                status: 'failed',
                adapter: 'unknown',
                error: 'Unable to connect to adapter',
            });
        }
        setLoadingAdapter(false);
    };

    useEffect(() => {
        fetchAdapterStatus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow space-y-6 text-center">
                <h1 className="text-3xl font-bold">{t('welcome')}</h1>

                <button
                    className="w-full rounded-md bg-blue-600 text-white px-4 py-2 focus-visible:ring-2 focus:outline-none focus:ring-blue-400 hover:bg-blue-700 transition"
                    onClick={handlePay}
                >
                    {t('pay')}
                </button>

                <button
                    className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
                    onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
                >
                    {t('switchLang')}
                </button>

                <div className="border-t pt-4 text-left text-sm space-y-2">
                    <h2 className="font-semibold">Adapter Status</h2>
                    {loadingAdapter ? (
                        <p className="text-gray-500">Checking...</p>
                    ) : adapterStatus ? (
                        <div>
                            <p><strong>Mode:</strong> {adapterStatus.adapter || "unknown"}</p>
                            <p><strong>Status:</strong> {adapterStatus.status}</p>
                            {adapterStatus.error && <p className="text-red-600">{adapterStatus.error}</p>}
                            {adapterStatus.message && (
                                <p className="text-green-700">{adapterStatus.message}</p>
                            )}
                        </div>
                    ) : (
                        <p>No adapter info yet.</p>
                    )}
                    <button
                        onClick={fetchAdapterStatus}
                        className="mt-2 text-blue-600 underline hover:text-blue-800 focus:outline-none"
                    >
                        Recheck Adapter Connectivity
                    </button>
                </div>
            </div>
        </div>
    );
}
