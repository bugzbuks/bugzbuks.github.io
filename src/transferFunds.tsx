import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props { }
interface FormData {
    name: string;
    cashAmount: number;
    beneficiary: string;
}

const Form: React.FC<Props> = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        cashAmount: 0,
        beneficiary: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast(`Name: ${formData.name}, Cash Amount: ${formData.cashAmount}, Beneficiary: ${formData.beneficiary}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Cash Amount:
                    <input type="number" name="cashAmount" value={formData.cashAmount} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Beneficiary:
                    <input type="text" name="beneficiary" value={formData.beneficiary} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Form;
