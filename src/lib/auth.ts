import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        
        // Mock fallback for test credentials
        if (credentials.password === "password123") {
          const MOCK_USERS: Record<string, any> = {
            "student@example.com": { id: "u1", name: "Test Student", email: "student@example.com", role: "STUDENT" },
            "farmer@khetconnect.com": { id: "u2", name: "Test Farmer", email: "farmer@khetconnect.com", role: "FARMER" },
            "delivery@khetconnect.com": { id: "u3", name: "Test Delivery", email: "delivery@khetconnect.com", role: "DELIVERY" },
            "admin@khetconnect.com": { id: "u4", name: "Test Admin", email: "admin@khetconnect.com", role: "ADMIN" },
          };
          
          if (MOCK_USERS[credentials.email]) {
            return MOCK_USERS[credentials.email];
          }
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
};
