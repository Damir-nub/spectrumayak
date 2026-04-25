import "next-auth";

declare module "next-auth" {
  interface User {
    subscriptionTier: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      subscriptionTier: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    subscriptionTier: string;
  }
}
