# TechYard website

This is the site for TechYard, the company behind DropDoor, Hullor Shop and the digital agency. It's one static page, no build step and nothing to install. I kept it that way on purpose so I can change a line of text and redeploy in a minute.

Live on Vercel: https://techyard-website.vercel.app/

## What's in the folder

```
index.html            the whole page, styles and scripts included
favicon.ico           browser tab icon
site.webmanifest      icon info for phones
assets/
  logo.png            full logo, for light backgrounds
  logo-dark.png       same logo with the navy turned light, for dark mode
  mark.png            the T/Y symbol alone
  mark-dark.png       symbol for dark backgrounds
  favicon-16/32/48    small tab icons
  apple-touch-icon    iPhone home screen icon
  icon-192/512        Android and install icons
```

## Deploying

Nothing special here. Either drag the folder into a new Vercel project, or run `vercel` from inside it. Set the framework to "Other" and leave the build command empty. If you're updating the existing project, just push over the old files.

## Editing things

Text lives straight in `index.html`, so search for the words you want to change. A few spots I always forget:

- The email address (hello@techyard.asia) shows up in the contact section, in the footer, and once more in the script at the bottom (the `EMAIL` line). Change all three or the form will send people to the old address.
- The Facebook link still points at facebook.com. It needs the real page URL.
- DropDoor's button goes to the Play Store listing (`dropdoor.app`). Hullor Shop goes to tryhullor.com.

Colors are the variables at the top of the `<style>` block. The three brand colors come from the logo: navy, teal and the lime green. There's a separate set of values for dark mode right below.

Fonts are Outfit and Instrument Sans, loaded from Google Fonts. If they fail to load the page falls back to the system font, which looks fine but a bit plainer.

## About the contact form

It doesn't send anything. There's no server behind it. When someone fills it in, the page puts together the email text and gives them a button to open it in their mail app, or copy it. I'd like to hook it up to a real inbox at some point, but this works for now.

## Still to do

- Real Facebook page link
- A name for the agency (it still says "Name coming soon")
- Open Graph image so links look right when shared
- Check it on an actual cheap Android phone, not just in the browser

© 2026 TechYard, Bangladesh.
