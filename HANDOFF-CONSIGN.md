# Prestige Imports — Consign With Prestige page (handoff)

**Prototype:** https://sigovs.github.io/Prestige/consign-with-prestige.html
**Replaces:** the demo's https://prestigeimports.aandemo.com/consign_with_prestige/ (today it is only the master template's form)
**Content source:** the live page https://www.prestigeimports.com/consign_with_prestige — every word is taken from it, word for word.

## Why
The demo page has only a form. Everything else on the live page is missing from it: the hero headline, the 3-step form, "How it works",
"Retail Your Ride", "Why Choose Prestige Imports' Consignment Program?" and "We're Looking For...". The prototype puts all of it back,
built from the blocks of the approved Sell Your Car page (`sell-your-car.html`), in the same design.

## Page, top to bottom
| # | Block (reused from the sell page) | Content |
|---|---|---|
| 1 | Hero + glass form card | "The Simple Way to Sell Your Exotic" · 3-step form (below) |
| 2 | How it works (`.section--process`) | the live intro + steps #1–#3, as 3 cards |
| 3 | Retail Your Ride | the live line + the live page's two photos (Porsche Carrera GT, McLaren Senna) |
| 4 | Why (`.section--why`) | the live 4 points |
| 5 | We're Looking For... (`.trust-stats`) | the live 10 makes · Get Started button back to the form |

## The form (3 steps, as on the live page)
1. **Vehicle Info** — VIN, Year*, Make*, Model*, Trim, Body Style*, Mileage*, Interior Color*, Exterior Color* → Next
2. **Contact info** — First Name*, Last Name*, Email*, Zip Code, Phone → Prev / Next
3. **Vehicle Condition** — Vehicle Condition*, Vehicle Transmission*, Ownership Type*, Modifications*, "If modified, please list
   modifications here:", Accidents, Damage*, Clean Title*, Vehicle Financing*, **Upload Images (up to 8)**, "Additional condition
   information and details" → Prev / Submit · consent line · "Fields marked with asterisk (*) are required"

- **Image upload** is the demo's ("Upload Images (up to 8)", "Drag and Drop Here", "Upload"), redesigned as a drop zone with thumbnails
  and remove buttons. Images only, 8 at most. The files sit in `<input type="file" name="vehicle_images[]">`; the form is `multipart/form-data`.
- Each step checks its own required fields before Next; Enter moves to the next step.
- **The form is not connected.** Submit shows "Prototype: this form is not connected yet." Wire it to the dealer's lead endpoint/CRM and add the site's reCAPTCHA (the live page has "Captcha" before Submit).

## Decisions (ours, change only with Alex)
- Header links "How it works / Why Prestige / We're Looking For" and the "Get Started" buttons are ours; the live page has none.
- Hero picture is the sell page's `hero_d.jpg`. The live page's wide white "three Lamborghinis" picture (Prestige_03) is not used: it does not sit on the dark design.
- Year list: 2027 → 2000 (the live page stops at 2023).
- "Burgandy" on the live page is spelled **Burgundy**.
- The accident question is labelled "Dropdown" on the live page (a bug); here its first option reads **Accidents**.
- Not added: reviews, recently purchased, FAQ, final CTA. The live page does not have them.

## Also fixed
`sell-your-car.html` pointed its header logo at `assets/images/logo.svg`, which does not exist (empty logo). Both pages now use `assets/images/prestige_logo.svg`, like the other pages.

## Files
- `consign-with-prestige.html`
- `assets/css/sell-your-car.css` (shared, unchanged) + `assets/css/consign.css` (step form, upload, photo pair, makes list)
- `assets/js/main.js` (shared) + `assets/js/consign.js` (steps, validation, upload)
- `assets/images/consign/` — the two photos, taken from the live page

## Checked
1920 / 1440 / 1024 / 768 / 390: no horizontal scroll, no console errors; the form's steps, validation, Enter, Prev and the upload limit (10 files in → 8 images kept, non-image refused) work.
Brief for a coding agent: `HANDOFF-CONSIGN-AGENT.md`.
