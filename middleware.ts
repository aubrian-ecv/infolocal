import { requiredAuth } from "@/lib/auth/helper";
import { ActionError } from "@/lib/server-actions/safe-actions";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    
    if (request.url.includes('/admin')) {
        const user = await requiredAuth() as { id: number, email: string, name?: string, image?: string, roles?: string[] };
        
        console.log(user);
        
        if (!user.roles?.includes('SUPERADMIN') && !user.roles?.includes('JOURNALISTE')) {
            throw new ActionError('You are not allowed to access this resource.');
        }        
    }
    
}

export const config = {
    matcher: '/admin/:path*'
}