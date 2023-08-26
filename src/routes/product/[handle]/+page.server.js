// import { getProduct, getAllProducts } from '$utils/shopify'
import { error } from '@sveltejs/kit'
import data from '$utils/data.json'

export async function load ({ params }) {
  // const [resOne, resTwo] = await Promise.all([getProduct(params.handle), getAllProducts()])
  const resOne = data.find((prod) => params.handle === prod.node.handle)
  // const resOne = data.filter((post) => post.handle.includes(params.handle))

  const resTwo = data
  console.log(resOne)

  // if (resOne.status === 200 && resTwo.status === 200) {
  const product = resOne.node
  const featuredProducts = resTwo

  if (product) {
    return {
      body: {
        product,
        featuredProducts
      }
    }
  }

  //   throw error(404)
  // } else {
  //   let status = resOne.status !== 200 ? resOne.status : resTwo.status
  //   throw error(status)
  // }
}
