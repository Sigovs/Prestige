# Task for a coding agent: Prestige Imports — Consign With Prestige page

Port one finished prototype page to the Prestige Imports site (WordPress by All Auto Network; staging prestigeimports.aandemo.com,
behind a password). The design is approved. **Reproduce it; do not redesign it.**

## Sources of truth
- Repo: https://github.com/Sigovs/Prestige (branch `main`).
- Page, live: https://sigovs.github.io/Prestige/consign-with-prestige.html
- Human handoff with the decisions and open items: `HANDOFF-CONSIGN.md`.
- Markup: `consign-with-prestige.html`. Styles: `assets/css/sell-your-car.css` → `assets/css/consign.css` (in that order).
  Scripts: `assets/js/main.js`, `assets/js/consign.js`. Images: `assets/images/hero_d.jpg`, `assets/images/consign/*.jpg`.

## Where it goes
| Prototype | Site URL |
|---|---|
| `consign-with-prestige.html` | `/consign_with_prestige/` (replace the demo's current form-only page) |

Keep the site's own header and footer.

## Rules
1. **Words are final.** Every string is copied from the live prestigeimports.com/consign_with_prestige page. Copy them exactly from the
   prototype, including "We're Looking For...", the plain hyphen in "sold - collect your cash" and "doesn’t". Add no headings or intros.
2. **Same blocks, same order, same anchors:** `#hero` (form inside, `#consign-form`), `#how-it-works`, `#retail-your-ride`, `#why-prestige`,
   `#looking-for`. Every "Get Started" button links to `#consign-form`.
3. **Reuse the prototype's classes and scripts** instead of rebuilding in Elementor widgets. If the theme forces widgets, one HTML widget per
   section with the prototype's markup is acceptable; both stylesheets must load.
4. **Type roles:** capitals only for labels and buttons (eyebrows, step tabs, make names, buttons). Headings stay in sentence/title case as written.
5. **The form keeps 3 steps** (`.cstep[data-step]`, tabs `.csteps__item`), with Prev/Next, per-step required checks and Enter = next step
   (`consign.js`). Field `name`s: `vin, vehicle_year, vehicle_make, vehicle_model, vehicle_trim, body_style, mileage, interior_color,
   exterior_color, first_name, last_name, email, zip, phone, condition, transmission, ownership, modifications, modifications_list,
   accidents, damage, clean_title, financing, vehicle_images[], condition_details`. Map them to the CRM's fields; keep labels and options.
6. **Image upload** (step 3, `[data-upload]`): drop zone + "Upload" button, images only, max 8, thumbnails with remove. Files live in
   `input[name="vehicle_images[]"]`, so the form must stay `enctype="multipart/form-data"`. The site's backend must accept up to 8 images.
7. **Submit** must post to the dealer's lead endpoint/CRM, with the site's reCAPTCHA before Submit, and show the site's success state.
   Replace the prototype's "not connected" message.
8. **Photos:** the two "Retail Your Ride" photos are square crops of the live page's slides (`object-position: 50% 14%`): their lower fifth is a black
   fade, so do not show them uncropped. Do not add the live page's white Prestige_03 banner.
9. **Header logo** is `prestige_logo.svg` (the old `logo.svg` path is broken).

## Acceptance checks (do all, report each)
- [ ] 1920, 1440, 1024, 768, 390 px: no horizontal scroll (`scrollWidth - clientWidth === 0`).
- [ ] Visual diff against the GitHub Pages prototype at 1440 and 390: same blocks, order, words, photos and crops.
- [ ] Next is blocked until a step's required fields are filled; Prev keeps values; Enter advances.
- [ ] Upload: 10 files dropped → 8 images kept, non-images refused, remove works, files arrive at the endpoint.
- [ ] Submit reaches the real endpoint with all fields and images; the success state shows.
- [ ] Every "Get Started" scrolls to the form.
- [ ] No console errors.
