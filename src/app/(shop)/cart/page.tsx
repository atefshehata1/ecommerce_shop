// 'use client'
// import Image from 'next/image'
// import React, { useContext, useEffect, useState } from 'react'
// import { ClearProducts, getCartData, RemoveProductToTrash, UpdateQuantity } from '../../../CartAction/CartAction'
// import { cart, CartData } from '../../../types/cartData'
// import Loading from '@/app/loading'
// import { Button } from '@/components/ui/button'
// import { toast } from 'sonner'
// import { CountContext } from '../../../CountProvider'
// import CheckOut from '@/app/_Component/CheckOut/CheckOut'



// export default function Cart() {  
//   // handle data Type (context)
// const context = useContext(CountContext)
// if (!context) throw new Error("CountContext must be used within a CountProvider")
// const { setCount } = context

//   const [cart, setCart] = useState<cart>()
//   const [cartLoading, setCartLoading] = useState(true)
//   const [LoadingCount, setLoadingCount] = useState(false)
//   const [CountDisabled, setCountDisabled] = useState(false)
//   const [currentId, setCurrentId] = useState<string | null>(null)

//   useEffect(() => {
//     gatAllCartData()
//   }, [])

//   async function gatAllCartData() {
//     try {
//       setCartLoading(true)
//       const data: CartData = await getCartData()
//       setCart(data.data)

//       // تحديث العدد في الـ Context
//       const sum = data.data.products.reduce((total, item) => total + item.count, 0)
//       setCount(sum)

//       setCartLoading(false)
//     } catch (error) {
//       console.error("Error fetching cart:", error)
//       setCartLoading(false)
//     }
//   }

//   async function removeProduct(id: string) {
//     const data = await RemoveProductToTrash(id)
//     if (data.status === "success") {
//       toast.success("Product removed", { position: 'top-center' })
//       setCart(data.data)
//       const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
//       setCount(sum)
//     }
//   }

//   async function clearProducts() {
//     const data = await ClearProducts()
//     if (data.message === "success") {
//       toast.success("All products cleared! ", { position: 'top-center' })
//       setCart(undefined)
//       setCount(0)
//     }
//   }

//   async function updateQuantity(count: number, id: string) {
//     setCurrentId(id)
//     setLoadingCount(true)
//     setCountDisabled(true)
//     const data = await UpdateQuantity(count, id)

//     if (data.status === "success") {
//       toast.success("Quantity updated", { position: 'top-center' })
//       setCart(data.data)
//       const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
//       setCount(sum)
//     }

//     setLoadingCount(false)
//     setCountDisabled(false)
//   }

//   return (
//     <>
//       <h1 className="text-2xl">Shop cart</h1>

//       {cartLoading ? (
//         <Loading />
//       ) : (
//         <>
//           {cart?.products.length ? (
//             <div>
//               <h2>Total Cart price : {cart?.totalCartPrice}</h2>
//               <Button
//                 onClick={clearProducts}
//                 className="float-right cursor-pointer"
//               >
//                 Clear Data
//               </Button>
//               <div className="clear-both"></div>
//               <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 dark">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                       <th scope="col" className="px-16 py-3">
//                         <span className="sr-only">Image</span>
//                       </th>
//                       <th scope="col" className="px-6 py-3">Product</th>
//                       <th scope="col" className="px-6 py-3">Qty</th>
//                       <th scope="col" className="px-6 py-3">Price</th>
//                       <th scope="col" className="px-6 py-3">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cart.products.map((item) => (
//                       <tr
//                         key={item._id}
//                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                       >
//                         <td className="p-4">
//                           <Image
//                             src={item.product.imageCover}
//                             alt={item.product.title}
//                             width={80}
//                             height={80}
//                             className="w-16 md:w-32 max-w-full max-h-full"
//                           />
//                         </td>
//                         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                           {item.product.title}
//                         </td>

//                         <td>
//                           <div className="flex items-center">
//                             <Button
//                               disabled={CountDisabled}
//                               onClick={() => { updateQuantity(item.count - 1, item.product._id) }}
//                               className="inline-flex items-center justify-center p-3 h-6 w-6 text-sm font-medium text-gray-500 bg-white border rounded-full cursor-pointer"
//                               type="button"
//                             >
//                               {item.count === 1 ? (
//                                 <i className='fa-solid fa-trash'></i>
//                               ) : (
//                                 <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
//                                 </svg>
//                               )}
//                             </Button>

//                             {LoadingCount && currentId === item.product._id
//                               ? <i className='fa-solid fa-spinner fa-spin'></i>
//                               : <span className="px-7 py-4">{item.count}</span>}

//                             <Button
//                               disabled={CountDisabled}
//                               onClick={() => { updateQuantity(item.count + 1, item.product._id) }}
//                               className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border rounded-full cursor-pointer"
//                               type="button"
//                             >
//                               <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
//                               </svg>
//                             </Button>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4">${item.price}</td>
//                         <td className="px-6 py-4">
//                           <Button
//                             disabled={CountDisabled}
//                             onClick={() => removeProduct(item.product._id)}
//                             className="cursor-pointer text-red-600 hover:underline"
//                           >
//                             <i className="fa-solid fa-trash fa-xl"></i>
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {/* CheckOut */}
//               <div className='my-5 text-center cursor-pointer  '>
//              {cart && <CheckOut cartId={cart._id}  onOrderComplete={gatAllCartData} />}

//               </div>
//             </div>

            
//           ) : (
//             <div className="flex justify-center mt-15 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
//               <svg className="shrink-0 inline w-4 h-4 me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//               </svg>
//               <div>
//                 <span className="font-medium">Info !</span> Your cart is currently empty
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </>

//   )
// }



'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { ClearProducts, getCartData, RemoveProductToTrash, UpdateQuantity } from '../../../CartAction/CartAction'
import { cart, CartData } from '../../../types/cartData'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CountContext } from '../../../CountProvider'
import CheckOut from '@/app/_Component/CheckOut/CheckOut'

export default function Cart() {  
  // ✅ Handle context safely
  const context = useContext(CountContext)
  if (!context) throw new Error("CountContext must be used within a CountProvider")
  const { setCount } = context

  const [cart, setCart] = useState<cart>()
  const [cartLoading, setCartLoading] = useState(true)
  const [LoadingCount, setLoadingCount] = useState(false)
  const [CountDisabled, setCountDisabled] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)

  // ✅ Wrap in useCallback to avoid useEffect warning
  const gatAllCartData = useCallback(async () => {
    try {
      setCartLoading(true)
      const data: CartData = await getCartData()
      setCart(data.data)

      // تحديث العدد في الـ Context
      const sum = data.data.products.reduce((total, item) => total + item.count, 0)
      setCount(sum)

      setCartLoading(false)
    } catch (error) {
      console.error("Error fetching cart:", error)
      setCartLoading(false)
    }
  }, [setCount])

  useEffect(() => {
    gatAllCartData()
  }, [gatAllCartData])

  const removeProduct = async (id: string) => {
    const data = await RemoveProductToTrash(id)
    if (data.status === "success") {
      toast.success("Product removed", { position: 'top-center' })
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
      setCount(sum)
    }
  }

  const clearProducts = async () => {
    const data = await ClearProducts()
    if (data.message === "success") {
      toast.success("All products cleared! ", { position: 'top-center' })
      setCart(undefined)
      setCount(0)
    }
  }

  const updateQuantity = async (count: number, id: string) => {
    setCurrentId(id)
    setLoadingCount(true)
    setCountDisabled(true)
    const data = await UpdateQuantity(count, id)

    if (data.status === "success") {
      toast.success("Quantity updated", { position: 'top-center' })
      setCart(data.data)
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total + item.count, 0)
      setCount(sum)
    }

    setLoadingCount(false)
    setCountDisabled(false)
  }

  return (
    <>
      <h1 className="text-2xl">Shop cart</h1>

      {cartLoading ? (
        <Loading />
      ) : (
        <>
          {cart?.products.length ? (
            <div>
              <h2>Total Cart price : {cart?.totalCartPrice}</h2>
              <Button onClick={clearProducts} className="float-right cursor-pointer">
                Clear Data
              </Button>
              <div className="clear-both"></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 dark">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                      <th scope="col" className="px-6 py-3">Product</th>
                      <th scope="col" className="px-6 py-3">Qty</th>
                      <th scope="col" className="px-6 py-3">Price</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map((item) => (
                      <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <Image src={item.product.imageCover} alt={item.product.title} width={80} height={80} className="w-16 md:w-32 max-w-full max-h-full" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.product.title}</td>

                        <td>
                          <div className="flex items-center">
                            <Button
                              disabled={CountDisabled}
                              onClick={() => updateQuantity(item.count - 1, item.product._id)}
                              className="inline-flex items-center justify-center p-3 h-6 w-6 text-sm font-medium text-gray-500 bg-white border rounded-full cursor-pointer"
                              type="button"
                            >
                              {item.count === 1 ? <i className='fa-solid fa-trash'></i> :
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                </svg>}
                            </Button>

                            {LoadingCount && currentId === item.product._id ? <i className='fa-solid fa-spinner fa-spin'></i> :
                              <span className="px-7 py-4">{item.count}</span>}

                            <Button
                              disabled={CountDisabled}
                              onClick={() => updateQuantity(item.count + 1, item.product._id)}
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border rounded-full cursor-pointer"
                              type="button"
                            >
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                            </Button>
                          </div>
                        </td>

                        <td className="px-6 py-4">${item.price}</td>
                        <td className="px-6 py-4">
                          <Button
                            disabled={CountDisabled}
                            onClick={() => removeProduct(item.product._id)}
                            className="cursor-pointer text-red-600 hover:underline"
                          >
                            <i className="fa-solid fa-trash fa-xl"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='my-5 text-center cursor-pointer'>
                {cart && <CheckOut cartId={cart._id} onOrderComplete={gatAllCartData} />}
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-15 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
              <svg className="shrink-0 inline w-4 h-4 me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div><span className="font-medium">Info !</span> Your cart is currently empty</div>
            </div>
          )}
        </>
      )}
    </>
  )
}
