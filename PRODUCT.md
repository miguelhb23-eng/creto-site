# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences with equal weight (confirmed 2026-10-29):

- **Homeowners and families** in Manizales and the Eje Cafetero who want to remodel, build a house, or get an urgent repair. Their main worry is cost overruns and whether the contractor can be trusted.
- **Companies and institutions** (businesses, residential complexes, entities) that hire civil works, engineering or maintenance. They expect formal credentials (NIT, address, phone, a formal proposal) before contacting anyone.

Allied construction firms that subcontract design, BIM or budgets are a secondary audience the current copy already mentions ("Constructora aliada").

## Product Purpose

The corporate website of CRETO Ingeniería y Construcciones S.A.S. (Manizales, Caldas). Its job is to make a visitor trust CRETO enough to request a quote. Success means a qualified contact through WhatsApp or the contact form.

## Positioning

"Construimos con rigor. Presupuestamos sin sorpresas." CRETO promises that the budget it quotes is the budget the client pays. That promise rests on BIM-based design and 5D budgeting, plus a single responsible party from design through execution.

## Operating Context

- Visitors usually arrive on a phone, often from WhatsApp or social links.
- Contact happens mainly through WhatsApp, using a pre-filled message per service or project, and secondarily through a Web3Forms contact form.
- The site is in Colombian Spanish.

## Capabilities and Constraints

- Static multi-page site built with Vite and TypeScript, deployed to Hostinger by FTPS from GitHub Actions when a commit lands on `main`.
- All content is edited in `src/data/site.ts` and `src/data/proyectos.ts`, so the person maintaining the site only touches those files.
- **Open as of 2026-10-29:**
  - the real WhatsApp number and the Web3Forms key are still placeholders;
  - the phone, address and NIT are not provided;
  - the Instagram and Facebook URLs are not provided;
  - the contact email is cretoingenieriayconstrucciones@gmail.com.

## Brand Commitments

These four are binding (confirmed by the user, 2026-10-29):

- **Logo:** the current logo (`public/logo.svg`, `public/logo-mark.svg`).
- **Brand colors:** red, black and white.
- **Main message:** "Construimos con rigor. Presupuestamos sin sorpresas.", together with the promise that the quoted budget is the one the client pays.
- **Service lines:** the four names CRETO Express, CRETO Remodelaciones, CRETO Construcciones and CRETO Ingeniería.
- **Look and feel:** a modern corporate builder site, dark and high impact, with transitions and professional typography. The professionalism reference is https://conconcreto.com/. The user rejected concept-led directions in favour of this standard (2026-10-29), and wants it to feel neither template-like nor informal or small, and easy to use on a phone.

## Evidence on Hand

- **No real photographs exist yet.** Until they arrive, free Unsplash photos in `public/fotos/referencia/` (credits in CREDITOS.md) stand in so the design can be judged. They are not CRETO work, and the build in CI refuses to publish while any of them is still referenced.
- **The projects in `src/data/proyectos.ts` are examples, not real work.** The same goes for the team data on the Empresa page. None of it may be presented as genuine.
- **The home testimonials are examples.** Do not show invented testimonials as real.
- **Unconfirmed claims.** The current site states the following, but the user has not confirmed them:
  - "32+ years";
  - (credentials ACIEM, Camacol, SENA and Autodesk were removed from the site at the user's request, 2026-10-29; do not re-add them);
  - the NSR-10 and RETIE compliance.

  Keep them as they are, but do not add new figures or claims.

## Product Principles

1. **Show the rigor, don't just say it.** The budget-certainty promise is the differentiator and should be visible as method and process, without fabricating data.
2. **Make trust legible to both audiences.** It should feel warm and plain-spoken for families and formal and verifiable for companies.
3. **Contact is always one tap away, and never noisy.**
4. **Never fake proof.** Use honest stand-ins until real photos, projects and reviews exist, and design so they can be swapped in easily.
5. **Engineering terms come with a plain explanation.**
