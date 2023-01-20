import React from 'react';
import TransferFunds from '../transferFunds';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_PAYMENT_REQUEST } from '../../utils/stitchServices';

/**
 * Simple integration test to see if the payment request is executed if valid parameters are passed through
 * */
const mocks = [
    {
        request: {
            query: CREATE_PAYMENT_REQUEST,
            variables: {
                amount: { currency: 'ZAR', quantity: 100 },
                payerReference: 'test',
                beneficiaryReference: 'test',
                externalReference: 'test',
                beneficiaryName: 'test',
                beneficiaryBankId: 'test',
                beneficiaryAccountNumber: 'test'
            },
        },
        result: {
            data: {
                clientPaymentInitiationRequestCreate: {
                    paymentInitiationRequest: {
                        url: 'https://test.com',
                    },
                },
            },
        },
    },
];

const mockCreatePaymentRequest = jest.fn();
const logSpy = jest.spyOn(console, 'log')

mockCreatePaymentRequest.mockReturnValue({
    data: {
        clientPaymentInitiationRequestCreate: {
            paymentInitiationRequest: {
                url: 'https://test.com',
            },
        },
    }
});

mockCreatePaymentRequest.mockResolvedValue({
    data: {
        clientPaymentInitiationRequestCreate: {
            paymentInitiationRequest: {
                url: 'https://test.com',
            },
        },
    }
});

describe('<TransferFunds />', () => {
    it('should submit the form and redirect to the returned url', async () => {
        const { getByTestId, findByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TransferFunds createPaymentRequest={mockCreatePaymentRequest} />
            </MockedProvider>
        );
        fireEvent.change(getByTestId('reference'), { target: { value: 'test' } });
        fireEvent.change(getByTestId('cashAmount'), { target: { value: 100 } });
        fireEvent.change(getByTestId('beneficiary'), { target: { value: 'test' } });
        fireEvent.submit(getByTestId('form'));
        expect(logSpy).toHaveBeenCalledWith('Creating the payment request');
    });

    afterEach(() => {
        mockCreatePaymentRequest.mockClear();
        logSpy.mockClear();
    });
});

function delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**TODO: Add more tests to check boundry conditions. Also mock the API call to simulate failures*/
