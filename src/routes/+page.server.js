// import { getAllCollections } from '$utils/shopify'
import data from '$utils/data.json'

import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function load ({ url }) {
  // const res = await getAllCollections()
  // if (res.status === 200) {
  // const products = res.body?.data?.collections?.edges
  const products = data
  console.log(data)
  //     let arr=[
  //   { node: { handle: 'clothes', products: [Object] } },
  //   { node: { handle: 'featured', products: [Object] } }
  // ]

  // console.log(res.body?.data?.collections?.edges)
  if (products) {
    console.log(products)
    let nodes = { node: { handle: 'clothes', products: products } }
    return nodes
  }
  // throw error(404)
  // } else {
  //   throw error(res.status)
  // }
}
