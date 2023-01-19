﻿import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { BankBeneficiaryBankId, CREATE_PAYMENT_REQUEST, ITransaction } from './stitchServices';

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
    const [createPaymentRequest, { data }] = useMutation(CREATE_PAYMENT_REQUEST);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            createPaymentRequest({
                variables: {
                    amount: paymentDetail.amount,
                    payerReference: paymentDetail.payerReference,
                    beneficiaryReference: paymentDetail.beneficiaryReference,
                    externalReference: paymentDetail.externalReference,
                    beneficiaryName: paymentDetail.beneficiaryName,
                    beneficiaryBankId: paymentDetail.beneficiaryBankId,
                    beneficiaryAccountNumber: paymentDetail.beneficiaryAccountNumber,
                }
            }).then(() => {
                if (data) {
                    console.log(JSON.stringify(data));
                    toast('Payment successful');
                }
                else {
                    toast(`Error in executing payment request`);
                }
            }).catch((error) => {
                toast(`Error: ${error}`);
            });
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

    return (
        <div id="TransferFundsContainer">
            <ToastContainer />
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
                    <input type="text" className="form-control" id="beneficiary" name="beneficiary" value={formData.beneficiary} onChange={handleChange} required />
                </div>
                <button style={{ paddingTop: "5px" }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default TransferFunds;