// import { getAllProducts } from '$utils/shopify';
import data from '$utils/data.json'

import { error } from '@sveltejs/kit'

export async function load () {
  // const res = await getAllProducts()

  // if (res.status === 200) {
  // const products = data
  let allProducts = data

  if (allProducts) {
    return {
      body: { allProducts }
    }
  }

  //   throw error(404)
  // } else {
  //   throw error(res.status)
  // }
}
