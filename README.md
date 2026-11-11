# ViduLeaf

**Bring nature home.**

A local preview of an indoor plant shop for the Viduneth family. Built with Next.js, React, TypeScript, and shared CSS styles.

## Current status

This is a storefront preview, not a live shop. The six catalogue products, prices, stock counts, plant sizes, pot descriptions, and seven generated plant photographs are demonstration content. Checkout does not send an order, collect payment, or schedule delivery.

### Available in this preview

- Responsive homepage with collections, featured plants, family introduction, and care-guide links.
- Shop with search, collection and size filters, sorting, and empty states.
- Individual plant pages with a product photograph, sample details, quantity selection, and related plants.
- Shopping bag with quantity updates, removal, and browser persistence.
- Demo checkout with pickup/delivery selection and a browser-session summary.
- Our Story, Plant Care, individual guides, Delivery & Pickup, and Contact pages.
- Draft privacy, returns, and terms pages.
- A central image registry and a record of generated image sources.

`/admin` is a setup-status page only. Secure owner sign-in, product editing, image uploads, stock persistence, and order management have not been connected. The contact page displays configured contact links; it does not submit an enquiry form.

## Run locally

Install Node.js and npm before starting. The included unit-test command uses Node's `--experimental-strip-types` flag, so the installed Node release must support it.

From this repository folder:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server binds to the local machine. Use the URL printed in the terminal if that port is occupied.

No database, payment account, or environment credentials are required for this preview. `.env.example` records that external integrations are pending. Never commit real credentials.

### Production build, locally

```sh
npm run build
npm start
```

These commands build and serve the application. They do not turn demo checkout into real ordering or deploy the site.

### Checks

```sh
npm run typecheck
npm test
```

The unit tests cover cart validation, duplicate item reconciliation, quantity limits, and subtotal calculations. Browser review should also cover the complete shopping journey, responsive layouts, and missing-storage behaviour before release.

## Project map

```text
src/app/                 Page routes, shared layout, and global styles
src/components/          Navigation, images, product cards, cart state, and CSS modules
src/data/assets.ts       Central image paths, alt text, focal positions, temporary flags
src/data/products.ts     Demonstration catalogue and price formatting
src/data/site.ts         Business contact placeholders and preview settings
src/data/guides.ts       Care-guide content and source links
src/lib/cart.ts          Cart validation and calculation helpers
public/brand/            ViduLeaf logo
public/images/demo/      Seven generated temporary photographs
tests/                   Unit tests
IMAGE_SOURCES.md         Image provenance and exact generation prompts
docs/NEXT_STEPS.md       Remaining implementation and launch work
```

## Replace the temporary photographs

An owner upload interface is planned but is **not available yet**. For now, replace photographs through the project files:

1. Put a new photograph in `public/images/`. Use a descriptive, versioned filename, for example `public/images/products/monstera-real-v1.jpg`.
2. Open `src/data/assets.ts` and update the relevant asset's `src`. A file in `public/images/products/` is referenced as `/images/products/...`, without the `public` prefix.
3. Update `alt` so it accurately describes the new photograph. Set `temporary` to `false` after the photograph has been reviewed.
4. Set `position` to an appropriate CSS focal position, such as `center` or `60% 50%`. Check the page at phone and desktop widths; the homepage hero also has responsive crop rules in `src/app/globals.css`.
5. Keep the asset ID unchanged when replacing the same subject. Products and page sections reference these IDs, so the replacement appears in each corresponding location.
6. Record any new source, permission, or attribution details in `IMAGE_SOURCES.md`.

Example asset record:

```ts
monstera: {
  src: '/images/products/monstera-real-v1.jpg',
  alt: 'Our Monstera plant in the included cream pot',
  position: 'center',
  temporary: false,
}
```

Use square photographs with the whole plant and pot visible for products. The current product originals are 1254 x 1254 pixels; the decorative hero is 1536 x 1024 pixels. Keep enough space around plants for different page crops. Next.js Image handles delivery optimisation.

All seven temporary photographs were generated with the built-in image-generation tool. They do not show confirmed inventory, the actual shop, or the owner's family. See [IMAGE_SOURCES.md](IMAGE_SOURCES.md) for exact prompts and provenance. The supplied ViduLeaf logo is kept separately in `public/brand/`.

## Edit products and business information

- Edit sample product names, categories, images, prices, stock, and descriptions in `src/data/products.ts`.
- Preserve existing product IDs when editing the same product: the saved cart refers to those IDs.
- Add new image records to `src/data/assets.ts` and reference their IDs through each product's `asset` field.
- Edit contact details in `src/data/site.ts`. Empty phone, email, WhatsApp, address, and opening-hour fields produce honest unavailable states.
- Prices currently display in LKR. Review `formatPrice` in `src/data/products.ts` if changing currency; changing `site.currency` alone does not change price formatting.
- Care-guide text and source links are in `src/data/guides.ts`.

Changing a flag or adding contact details does **not** activate production commerce. Real ordering requires the backend and launch work described in [NEXT_STEPS.md](docs/NEXT_STEPS.md).

## What stays in the browser

The sample cart is stored under `viduleaf-demo-cart-v1` in local storage. Cart quantities are checked against the demonstration catalogue.

Completing checkout stores a demonstration receipt in session storage under `viduleaf-demo-receipt`. The submitted name, phone, email, and address are not saved in that receipt or sent to a server. Use sample information when testing. The confirmation page explicitly states that no order or payment occurred.

The preview requests search engines not to index it. Keep that setting until the live content and services are ready.
