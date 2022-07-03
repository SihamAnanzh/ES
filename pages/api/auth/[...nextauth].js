import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
          console.log("RESPONSE IS : ", res.data);
          if (res.data.status.code !== 200) {
            console.log(res);

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
