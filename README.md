# Nagare web page

## About us

- Nagare is a web development and design startup created by me and my girlfriend Julieta. Our mission is to give small businesses their first chance to have a web page and to improve their popularity.

## Stack

- Astro v6
- Tailwind 8
- Vercel deploy
- Resend with endpoing /api/emails by astro server output and vercel adapter

## Vercel configuration

```JSON
{
  "rewrites": [
    {
      "source": "/(.*)",
      // capture the path to be rewritten and pass it as a parameter to the destination
      "destination": "/$1"
    }
  ]
}
```
