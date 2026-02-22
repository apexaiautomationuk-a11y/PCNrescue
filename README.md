# PCN Rescue Pack landing page

A lightweight, single-page UK landing site for private parking charge administrative support.

## Files
- `index.html` – semantic structure, SEO/meta, JSON-LD, content sections.
- `styles.css` – compact token-based styling and custom components.
- `scripts.js` – purposeful UI interactions (theme, gate, pricing select, FAQ, validation).
- `assets/logo.svg` / `assets/favicon.svg` – monochrome brand marks with yellow accent.

## Replace these placeholders before production
- `{{CHECKOUT_SANITY}}`
- `{{CHECKOUT_DIY}}`
- `{{CHECKOUT_CONCIERGE}}`
- `{{CHECKOUT_ESCALATION}}`
- `{{FLEET_ENQUIRE_LINK}}`
- `{{INTAKE_ENDPOINT}}`
- `{{SUPPORT_EMAIL}}`
- `{{CITIZENS_ADVICE_LINK}}`
- `{{CANONICAL_URL}}`

## Theme tokens and accent edits
In `styles.css`, update `:root` and `[data-theme="dark"]` variables:
- `--accent` (main yellow)
- `--accent-strong` (hover/focus emphasis)
- `--accent-ink` (text colour on yellow)
- `--focus` (focus ring)

The accent is intentionally sparse: used for primary CTA, selected states, and badges.

## Run locally
Open `index.html` directly, or run a static server:
```bash
python -m http.server 4173
```
Then visit `http://localhost:4173`.

## Deploy
### Netlify
1. Push repository to Git provider.
2. New site from Git.
3. Build command: none.
4. Publish directory: `.`
5. Set final placeholder values in files before deploy.

### Vercel
1. Import repository.
2. Framework preset: `Other`.
3. Build command: none.
4. Output directory: `.`
5. Deploy after replacing placeholders.

### Any static host
Upload repository contents as static assets and ensure `index.html` is at the root.
