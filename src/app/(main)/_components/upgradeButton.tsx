import { Button } from '@/components/ui/button';
import { useCreateOrder } from '@/lib/hooks/users/useCreateOrder';
import { useVerifyPayment } from '@/lib/hooks/users/useVerifyPayment';
import { loadScript } from '@/lib/loadscript';
import React, { useEffect } from 'react'

const UpgradeButton = () => {
    const createOrderMutation = useCreateOrder();
    const verifyPaymentMutation = useVerifyPayment();

    const verifyPayment = async (orderData: any) => {
        verifyPaymentMutation.mutate({
            signature: orderData.razorpay_signature,
            orderId: orderData.razorpay_order_id,
            paymentId: orderData.razorpay_payment_id,
        },{
            onSuccess: () => {
                console.log("Payment verified");
            },
            onError: () => {
                console.log("Payment verification failed");
            }
        })
    }

    const onPayment = async () => {
        let orderData;
        createOrderMutation.mutate({
            planId: "premium",
        },{
            onSuccess: async(data) => {
                const paymentObject = new (window as any).Razorpay({    
                    key: process.env.RAZORPAY_KEY_ID,
                    order_id: data.data.id,
                    ...data.data,
                    
                    handler: async function (response:any) {
                        orderData = response;
                        console.log(orderData);
                        
                        await verifyPayment(orderData);
                    }
                })
                await paymentObject.open();
            }
        })
    }

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, [])
    
  return (
    <Button
        onClick={onPayment}
        className='mt-4 w-full'
    >
        Upgrade
    </Button>
  )
}

export default UpgradeButton