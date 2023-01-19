import { gql } from '@apollo/client';

export enum BankBeneficiaryBankId {
    absa = "absa",
    capitec = "capitec",
    discovery_bank = "discovery_bank",
    fnb = "fnb",
    investec = "investec",
    nedbank = "nedbank",
    sasfin_bank = "sasfin_bank",
    standard_bank = "standard_bank",
    tymebank = "tymebank",
    za_access_bank = "za_access_bank",
    access_bank = "access_bank",
    first_bank_of_nigeria = "first_bank_of_nigeria",
    gtbank = "gtbank",
    providus_bank = "providus_bank",
    sterling_bank = "sterling_bank",
    united_bank_for_africa = "united_bank_for_africa",
    vfd_microfinance_bank = "vfd_microfinance_bank",
    wema_bank = "wema_bank",
    zenith_bank = "zenith_bank",
    za_bidvest = "za_bidvest",
    za_citibank = "za_citibank",
    za_u_bank = "za_u_bank",
    za_jp_morgan_chase_bank = "za_jp_morgan_chase_bank",
    za_mercantile_bank = "za_mercantile_bank",
    za_postbank = "za_postbank",
    za_bank_windhoek = "za_bank_windhoek",
    za_nedbank_namibia = "za_nedbank_namibia",
    za_hbz_bank = "za_hbz_bank",
    za_olympus_mobile = "za_olympus_mobile",
    za_hsbc = "za_hsbc",
    za_vbs_mutual_bank = "za_vbs_mutual_bank",
    za_finbond_mutual_bank = "za_finbond_mutual_bank",
    za_finbond_net1 = "za_finbond_net1",
    za_bnp_paribas = "za_bnp_paribas",
    za_habib_overseas_bank = "za_habib_overseas_bank",
    za_people_bank = "za_people_bank",
    za_standard_chartered_bank = "za_standard_chartered_bank",
    za_ithala_bank = "za_ithala_bank",
    za_unibank = "za_unibank",
    za_albaraka_bank = "za_albaraka_bank",
    za_state_bank_of_india = "za_state_bank_of_india",
    za_bank_zero = "za_bank_zero",
}

export interface ITransaction {
    amount: {
        quantity: number;
        currency: string;
    };
    payerReference: string;
    beneficiaryReference: string;
    externalReference: string;
    beneficiaryName: string;
    beneficiaryBankId: string;
    beneficiaryAccountNumber: string;
}


/**
 * Retrieve the client access token
 **/
export async function retrieveTokenUsingClientSecret(clientId: string, clientSecret: string) {
    const body = {
        grant_type: "client_credentials",
        client_id: clientId,
        scope: "client_paymentrequest",
        audience: "https://secure.stitch.money/connect/token",
        client_secret: clientSecret,
    };

    const bodyString = Object.entries(body)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");

    const response = await fetch("https://secure.stitch.money/connect/token", {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: bodyString,
    });

    const responseBody = await response.json();
    console.log("Tokens: ", responseBody);
    return responseBody;
}

/*
 * Define a graphQL mutation to create a payment request
 */ 
export const CREATE_PAYMENT_REQUEST = gql`
  mutation CreatePaymentRequest(
    $amount: MoneyInput!,
    $payerReference: String!,
    $beneficiaryReference: String!,
    $externalReference: String,
    $beneficiaryName: String!,
    $beneficiaryBankId: BankBeneficiaryBankId!,
    $beneficiaryAccountNumber: String!
  ) {
    clientPaymentInitiationRequestCreate(input: {
      amount: $amount,
      payerReference: $payerReference,
      beneficiaryReference: $beneficiaryReference,
      externalReference: $externalReference,
      beneficiary: {
        bankAccount: {
          name: $beneficiaryName,
          bankId: $beneficiaryBankId,
          accountNumber: $beneficiaryAccountNumber
        }
      }
    }) {
      paymentInitiationRequest {
        id
        url
      }
    }
  }
`;