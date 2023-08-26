import crypto from 'crypto'
import axios from 'axios'
import { json } from '@sveltejs/kit'
// import admin from '$utils/admin.json'
import { config } from 'dotenv'
config() // Load environment variables from .env file

// This is a very simple script working on Binance Pay API
// Set your apiKey and apiSecret, then you are ready to go.

const apiKey = process.env.apiKey
const apiSecret = process.env.apiSecret
const baseURL = process.env.baseURL
const merchantId = process.env.merchantId

// ===== functions ======

function hash_signature (query_string) {
  return crypto
    .createHmac('sha512', apiSecret)
    .update(query_string)
    .digest('hex')
}

function random_string () {
  return crypto
    .randomBytes(32)
    .toString('hex')
    .substring(0, 32)
}

function dispatch_request (http_method, path, payload = {}) {
  const timestamp = Date.now()
  const nonce = random_string()
  const payload_to_sign = timestamp + '\n' + nonce + '\n' + JSON.stringify(payload) + '\n'
  const url = baseURL + path
  const signature = hash_signature(payload_to_sign)
  return axios
    .create({
      baseURL,
      headers: {
        'content-type': 'application/json',
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonce,
        'BinancePay-Certificate-SN': apiKey,
        'BinancePay-Signature': signature.toUpperCase()
      }
    })
    .request({
      method: http_method,
      url,
      data: payload
    })
}

// // Query Order

// // POST /binancepay/openapi/order/query
// // https://developers.binance.com/docs/binance-pay/api-order-query
// function query_order() {
//   dispatch_request(
//     'POST',
//     '/binancepay/openapi/order/query',
//     {
//       'merchantId': '123456789',
//       'merchantTradeNo': '121055692278489088'
//     }
//   ).then(response => console.log(response.data)).catch(error => console.log(error))
// }

// query_order()

// Create Order
//
// POST /binancepay/openapi/order
// https://developers.binance.com/docs/binance-pay/api-order-create
// async function create_order () {}
/** @type {import('./$types').RequestHandler} */
export async function POST ({ request }) {
  // Handle the creation of the Binance Pay order here
  // You can use the same functions from the previous examples

  // Example response
  // console.log(request.json())
  const body = await request.json()
  body.merchantId = merchantId

  // console.log('request:', body)
  // create_order()
  return dispatch_request('POST', '/binancepay/openapi/order', body)
    .then((response) => {
      console.log(response.data)
      return json(response.data)
    })
    .catch((error) => console.log(error))

  // return json(a + b)
}
