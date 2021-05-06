import { google } from "googleapis";

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/signin`
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const Google = {
  authUrl: auth.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "online",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  }),
  signIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos",
    });
    return { user: data };
  },
};
