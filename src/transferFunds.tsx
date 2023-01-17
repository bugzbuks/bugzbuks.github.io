import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';

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
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cashAmount">Cash Amount:</label>
                    <input type="number" className="form-control" id="cashAmount" name="cashAmount" value={formData.cashAmount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="beneficiary">Beneficiary:</label>
                    <input type="text" className="form-control" id="beneficiary" name="beneficiary" value={formData.beneficiary} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Form;
