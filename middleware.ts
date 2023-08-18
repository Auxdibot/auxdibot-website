import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
      
    },
    {
      callbacks: {
        authorized: ({ token }) => (token?.guilds?.length || 0) > 0,
      },
    }
  )
export const config = { matcher: ["/dashboard"] }