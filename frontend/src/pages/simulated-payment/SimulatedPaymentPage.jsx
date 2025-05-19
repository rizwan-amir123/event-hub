import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentHeader from '../../components/simulated-payment/PaymentHeader';
import PaymentForm from '../../components/simulated-payment/PaymentForm';
import SharedHeader from '../../components/shared/SharedHeader';
import { registerForEvent } from '../../api/api';
import './SimulatedPaymentPage.css';

const SimulatedPaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const { eventId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (cardNumber && expiryDate && cvv) {
                // Payment successful
                const response = await registerForEvent(eventId);
                if (response.status === 201) {
                	navigate('/events'); // Redirect to a success page
            		} 
                
            } else {
                setError('Invalid card details. Please check your information.');
            }

        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="payment-page">
        		<SharedHeader />
            <div className="payment-card-container">
		          <div className="payment-card">
		              <PaymentHeader />
		              <PaymentForm
		                  onSubmit={handleSubmit}
		                  cardNumber={cardNumber}
		                  setCardNumber={setCardNumber}
		                  expiryDate={expiryDate}
		                  setExpiryDate={setExpiryDate}
		                  cvv={cvv}
		                  setCvv={setCvv}
		                  loading={loading}
		                  error={error}
		              />
		          </div>
		        </div>
        </div>
    );
};

export default SimulatedPaymentPage;
