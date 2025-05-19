import './PaymentForm.css';

const PaymentForm = ({
    onSubmit,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    loading,
    error
}) => {
    return (
        <form className="payment-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="form-input"
                    required
                    placeholder="XXXX XXXX XXXX XXXX"
                />
            </div>
            <div className="form-group">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="form-input"
                    required
                    placeholder="MM/YY"
                />
            </div>
            <div className="form-group">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="form-input"
                    required
                    placeholder="CVC"
                />
            </div>

            {error && <div className="form-error">{error}</div>}
            <div className="form-button-container">
		          <button type="submit" className="form-submit-button" disabled={loading}>
		              {loading ? 'Processing...' : 'Pay Now'}
		          </button>
            </div>
        </form>
    );
};

export default PaymentForm;
