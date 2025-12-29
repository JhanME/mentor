import { withAuth } from "next-auth/middleware";
import { authOptions } from "@/lib/auth";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Rutas específicas para mentores
    if (pathname.startsWith("/dashboard/mentor") && token && token.role !== "mentor") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/becario";
      return Response.redirect(url);
    }

    // Rutas específicas para becarios
    if (pathname.startsWith("/dashboard/becario") && token && token.role !== "becario") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/mentor";
      return Response.redirect(url);
    }
  },
  {
    ...authOptions,
    callbacks: {
      ...authOptions.callbacks,
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Rutas públicas
        if (pathname === "/" || pathname === "/registro" || pathname.startsWith("/api/auth")) {
          return true;
        }

        // Requiere autenticación
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};