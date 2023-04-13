
import { Base64 } from "js-base64";
import axios from 'axios';

const { VITE_CLIENT_ID, VITE_APP_SECRET, VITE_API_URL } = import.meta.env; 

export class PaypalApi {

  // call this function to create your client token
  static async listTransaction() {
    const token = await PaypalApi.generateAccessToken();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const data = await (await fetch(`https:/${VITE_API_URL}/v1/reporting/transactions?start_date=2023-04-04T23:59:59.999Z&end_date=2023-04-28T00:00:00.000Z&transaction_currency=EUR&fields=transaction_info, payer_info, shipping_info, cart_info, store_info, auction_info, incentive_info`, requestOptions)).json();
  return data;
  }

  // access token is used to authenticate all REST API requests
  static async generateAccessToken() {
    const auth = Base64.encode(VITE_CLIENT_ID + ":" + VITE_APP_SECRET);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + auth);

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("ignoreCache", "true");
    urlencoded.append("return_authn_schemes", "true");
    urlencoded.append("return_client_metadata", "true");
    urlencoded.append("return_unconsented_scopes", "true");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const data = await (await fetch(`https://${VITE_API_URL}/v1/oauth2/token`, requestOptions)).json();
    return data.access_token;
  }
}