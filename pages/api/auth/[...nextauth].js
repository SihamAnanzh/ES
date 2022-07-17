import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "xpress-login-auth",
      name: "user",
      async authorize(credentials, req) {
        const res = await axios({
          method: "post",
          url: process.env.endPoint + "/user/login",
          data: {
            username: credentials.username,
            password: credentials.password,
            deviceId: "",
          },
        });
        if (res) {
          // console.log("RESPONSE IS : ", res.data);
          if (res.data.status.code !== 200) {
            return null;
          } else {
            const user = {
              id: res.data.results.id,
              name: "user",
              email: res.data.results.username,
              token: res.data.results.token,
            };
            return user;
          }
        } else {
          return null;
        }
      },
      credentials: {
        username: {
          label: "Username",
          type: "text ",
          placeholder: "Username (EMAIL)",
        },
        password: { label: "Password", type: "password" },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/profile",
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (
        user.account.provider === "google" ||
        user.account.provider === "facebook"
      ) {
        const endpoint = process.env.endPoint + "/user/login";
        console.log("account", user.account.user);
        const response = await axios({
          method: "post",
          url: endpoint,
          data: {
            social_media_id: user.account.providerAccountId,
            social_media_type_id: 1,
          },
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.status.code === 200) {
          user.user.token = response.data.results.token;
        } else {
          user = undefined;
        }
      }

      if (user !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.token;
      }
      return token;
    },
    session: ({ session, user, token }) => {
      if (token) {
        session.user = token.id;
        session.token = session.user.token;
        session.userId = token.sub;
      }

      return session;
    },
  },
});
