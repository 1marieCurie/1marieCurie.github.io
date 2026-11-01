# Khadija Mellak — Portfolio

A responsive React + TypeScript portfolio built with Vite and deployed through GitHub Pages.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build locally

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (recommended)

1. Create a **public** GitHub repository named exactly `1marieCurie.github.io`.
2. Extract this project and push all its contents to the repository's `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to finish successfully.
6. Your website will be available at `https://1marieCurie.github.io/`.

Every subsequent push to `main` automatically rebuilds and redeploys the site.

## Deploy from a normal project repository instead

If you prefer a repository such as `portfolio`, set the Vite base path before building:

```yaml
      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: /portfolio/
```

Then the URL will be `https://1marieCurie.github.io/portfolio/`.

## Personalise before publishing

- Check all project descriptions and add repository/demo links when you have them.
- Add a professional portrait if you want one (the current design uses a monogram instead).
- Update `public/CV_Khadija_Mellak.pdf` whenever your CV changes.
- The street address from the CV is intentionally not published; the site only displays Fès, Morocco.
- Verify that you are comfortable publishing the email address and phone number before adding any additional contact details. The current website uses the email address and GitHub link only.

## Project structure

```text
src/
  App.tsx       # Portfolio content, language switch, project filters and details
  main.tsx      # React entry point
  styles.css    # Responsive visual design
public/
  CV_Khadija_Mellak.pdf
.github/workflows/deploy.yml
```

## Notes

- This is a static website; it does not require a backend.
- Project cards show the descriptions available in the supplied CV. They do not claim unverified live demos or repository URLs.
- The language switch currently covers the main portfolio sections. Project descriptions and technical terms are retained in their CV-based wording.
