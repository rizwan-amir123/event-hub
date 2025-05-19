import './PaymentHeader.css';

const PaymentHeader = () => {
    return (
        <div className="payment-header">
            <h1 className="payment-title">Payment</h1>
            <p className="payment-description">
                Enter your card details to complete the payment.
            </p>
        </div>
    );
};

export default PaymentHeader;
