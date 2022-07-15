// process.env.NEXTAUTH_URL = "http://localhost:3000/";
process.env.NEXTAUTH_URL = "https://store-zeta-three.vercel.app/";
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },

  images: {
    domains: [
      "staging.xprestores.com",
      "pay-it.mobi",
      "likecard-space.fra1.digitaloceanspaces.com",
    ],
  },

  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  env: {
    endPoint: "https://staging.xprestores.com/api",
    JWT_SECRET: {
      kty: "EC",
      kid: "BwmGsjvRehScmi5OmP0o1fx6_OoFlfYlhjirnlIv-k4",
      alg: "HS512",
      crv: "P-256",
      x: "rMfZyvrjytlcwLoEHdOjJ6vT8Hr8f6AIphzgRZ2ccWE",
      y: "shhIfquJq5DwfqkbQUh2lX6p3Bm6lGf5pw2KfJmPORI",
      d: "qyTGFjxgKxwyEHLgPYmm6FqO3FKQH-2GkyMCf8KjG1s",
    },
  },
};
