
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