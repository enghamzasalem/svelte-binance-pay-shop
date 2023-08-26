import { getAllCollections } from '$utils/shopify'
import { error } from '@sveltejs/kit'
import data from '$utils/data.json'

export async function load () {
  let collections = data

  if (collections) {
    return {
      body: { collections }
    }
  }

  // const res = await getAllCollections();
  // if (res.status === 200) {
  //   const collections = res.body?.data?.collections?.edges || [];
  //   if (collections) {
  //     return {
  //       body: { collections }
  //     };
  //   }
  //   throw error(404)
  // } else {
  //   throw error(res.status)
  // }
}
