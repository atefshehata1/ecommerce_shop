// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 

// export  async function  middleware(request: NextRequest) {

//     const token = await getToken({ req : request })
//     console.log(token);
    
//     if (token) {
//         NextResponse.next()
//     }else{
//         return NextResponse.redirect(new URL('/login', request.url))
//     }
// }
// //  protected  
// export const config = {
//   matcher: [ '/cart' , '/orders' ],
// }



import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

 
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/products", request.url))
  }


  if ((pathname.startsWith("/cart") || pathname.startsWith("/orders")) && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

 
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/cart", "/orders"],
}
