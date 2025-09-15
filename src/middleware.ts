import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export  async function  middleware(request: NextRequest) {

    const token = await getToken({ req : request })
    console.log(token);
    
    if (token) {
        NextResponse.next()
    }else{
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
//  protected  
export const config = {
  matcher: [ '/cart' , '/orders' ],
}