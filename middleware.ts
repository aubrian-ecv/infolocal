import { requiredAuth } from "@/lib/auth/helper";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    
    if (request.url.includes('/admin')) {
        try {
            const user = await requiredAuth() as { id: number, email: string, name?: string, image?: string, roles?: string[] };

            if (!user.roles?.includes('SUPERADMIN') && !user.roles?.includes('JOURNALISTE')) {
                return NextResponse.json({ error: 'Page not found' }, { status: 404 })
            }        
        } catch (_) {            
            return NextResponse.redirect(request.nextUrl.origin + "/api/auth/signin?callbackUrl=/admin")
        }
    }
    
}

export const config = {
    matcher: '/admin/:path*'
}