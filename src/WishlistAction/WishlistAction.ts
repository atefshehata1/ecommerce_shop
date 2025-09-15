'use server'
import getUserToken from "../getUserToken"


export async function addWishlist(id: string) {
    
    const token = await getUserToken()
    if (!token)  throw new Error (" token undefined");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
        method:'post',
        body:JSON.stringify({productId: id}),
        headers:{token : token , "content-type" : "application/json"}
    })
    const data = await res.json()
    return data
}


export async function removeWishlist(id: string) {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
    method: 'DELETE',
    headers: { token: token }
  })
  const data = await res.json()
  return data
}



export async function getWishlist() {
  const token = await getUserToken()
  if (!token) throw new Error("token undefined")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token: token,
      "content-type": "application/json"
    },
    cache: "no-store" // عشان دايماً يجيب الداتا الجديدة
  })

  if (!res.ok) throw new Error("فشل في جلب الـ wishlist")

  const data = await res.json()
  return data
}
