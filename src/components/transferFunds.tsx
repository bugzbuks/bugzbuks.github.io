import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { BankBeneficiaryBankId, CREATE_PAYMENT_REQUEST, ITransaction } from '../utils/stitchServices';
import 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    //Placeholder
}

interface FormData {
    reference: string;
    cashAmount: number;
    beneficiary: string;
}

const TransferFunds: React.FC<Props> = (props:Props) => {
    const [formData, setFormData] = useState<FormData>({
        reference: '',
        cashAmount: 0,
        beneficiary: '',
    });
    const [createPaymentRequest] = useMutation(CREATE_PAYMENT_REQUEST);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast(`Creating transactions:\n Reference: ${formData.reference}, Cash Amount: ${formData.cashAmount}, Beneficiary: ${formData.beneficiary}`);
        let transactionReference = 'Donation #' + v4();
        let paymentDetail: ITransaction = {
            amount: {
                currency: 'ZAR',
                quantity: formData.cashAmount
            },
            beneficiaryAccountNumber: '123456',
            beneficiaryBankId: BankBeneficiaryBankId[BankBeneficiaryBankId.fnb],
            beneficiaryName: formData.beneficiary,
            beneficiaryReference: formData.reference,
            externalReference: transactionReference,
            payerReference: formData.reference,
        };
        try {
            console.log("Creating the payment request");
           
            let response = await createPaymentRequest({
                variables: {
                    amount: paymentDetail.amount,
                    payerReference: paymentDetail.payerReference,
                    beneficiaryReference: paymentDetail.beneficiaryReference,
                    externalReference: paymentDetail.externalReference,
                    beneficiaryName: paymentDetail.beneficiaryName,
                    beneficiaryBankId: paymentDetail.beneficiaryBankId,
                    beneficiaryAccountNumber: paymentDetail.beneficiaryAccountNumber,
                }
            });
            //Check if the data object with the results from createPaymentRequest is populated
            if (response.data) {
                console.log(JSON.stringify(response.data));
                toast('Payment request initialized');
                if (response.data.clientPaymentInitiationRequestCreate) {
                    const returnUrl = `?redirect_uri=https://localhost:8000/return`;//This is the only re-direct uri that works. Same for test cases online
                    const url = response.data.clientPaymentInitiationRequestCreate.paymentInitiationRequest.url + returnUrl;
                    console.log('Re-direct url = ', url);
                    window.location.assign(url);
                }
            }
            else {
                toast(`Error in executing payment request`);
            }
        } catch (err) {
            toast(`Error: ${err}`);
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="TransferFundsContainer">
            <ToastContainer />
            <h1>Please select the NGO you would like to support</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reference">Reference:</label>
                    <input type="text" className="form-control" id="reference" name="reference" value={formData.reference} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cashAmount">Cash Amount:</label>
                    <input type="number" className="form-control" id="cashAmount" name="cashAmount" value={formData.cashAmount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="beneficiary">Beneficiary:</label>
                    <select className="form-control" id="beneficiary" name="beneficiary" value={formData.beneficiary} onChange={handleSelectChange}>
                        <option value="Cape Refugee Centre">Cape Refugee Centre</option>
                        <option value="Rural Commu Init">Rural Community Initiative</option>
                        <option value="Academy For FS">Academy For Future Science</option>
                    </select>
                </div>
                <button style={{ marginTop: "5px" }} type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    );
};

export default TransferFunds;
