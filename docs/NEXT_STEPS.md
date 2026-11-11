# ViduLeaf: remaining build stages

The current project is a local storefront preview. The work below has not been completed merely because the relevant page route exists.

## 1. Review the storefront

- Review the homepage, product presentation, colours, logo use, and mobile layout.
- Check the generated photo style and replace the product photographs with representative real inventory before selling those products.
- Confirm the catalogue categories and which product options are actually offered.
- Check the demonstration shopping journey, including empty results, invalid quantities, cart persistence, and both pickup and delivery paths.

## 2. Connect persistent data and owner access

The proposed backend is Supabase: PostgreSQL for records, Auth for owner sign-in, and Storage for persistent image uploads. No Supabase service, credentials, schema, or migration has been configured in this preview.

Suggested records:

- Products and variants: identity, descriptions, prices, currency, stock, publication status.
- Media: stable asset ID, storage path, alt text, focal position, source, and temporary-image status.
- Collections and page content: references to products and media IDs.
- Business settings: contact information, opening hours, delivery areas, and pickup rules.
- Orders and order items: order status, fulfilment details, payment status, and purchased-item snapshots.
- Owner permissions: an explicit role permitting management operations.

Implement server-side authorisation and database/storage access policies before exposing editing or customer data. Customer browsing and guest checkout must not grant owner privileges. Keep service credentials on the server.

Use separate development seed data. Deployments must not reseed over owner edits, stock updates, or uploaded images.

## 3. Build the management area

Replace the `/admin` setup-status page with authenticated owner screens for:

- Product creation, editing, prices, and stock.
- Media upload, replacement, ordering, alt text, and crop/focal-position preview.
- Hero, collection, story, and guide-image selection.
- Business settings and content updates.
- Order viewing and status updates.

Images should use persistent storage. Updating a media record should update all pages that reference that asset. Check image type and size and prevent removal of files still in use.

## 4. Connect real orders

Confirm supported ordering methods with the owner: WhatsApp enquiries, cash on delivery, bank transfer, or online payment. Choose the actual payment integration only after that decision.

- Validate customer fields and fulfilment rules server-side.
- Recalculate prices and totals from live records.
- Check stock and reserve/decrement it consistently.
- Prevent duplicate submissions.
- Preserve purchased names, variants, and prices in order items so later catalogue edits do not rewrite order history.
- Protect confirmations and order details from unauthorised access.
- Keep order status and payment status separate.
- Do not allow demonstration products to become purchasable until reviewed and explicitly activated.

For online payments, verify provider notifications server-side and handle repeated notifications safely. A WhatsApp link opening is an enquiry handoff, not evidence that a message was sent or an order accepted.

## 5. Supply business details

Before accepting orders, confirm:

- Shop address, directions, opening hours, phone, email, and WhatsApp number.
- Real product names, sizes, pot inclusion/options, prices, and stock.
- Delivery coverage, fees, lead times, and pickup arrangements.
- Supported payment methods and cancellation/returns process.
- Owner-approved privacy, terms, and returns text.

The present policy pages are draft notices, not completed shop policies. Contact email delivery and enquiry submission require a working service if those features are added.

## 6. Verify and deploy

- Run type checks, unit tests, and a production build.
- Verify mobile/desktop layouts, keyboard operation, validation, and failed-request behaviour.
- Test real order processing in the provider's test environment before enabling live transactions.
- Test owner access restrictions and image replacement across the shop, product page, homepage, and cart.
- Configure hosting, production environment variables, backups, and error reporting.
- Keep preview and live data separate.
- Remove demo notices and search-engine exclusions only when the corresponding content and services are ready.

Hosting, Supabase, email, and payment services can introduce account setup and costs. Select and configure them as part of the relevant stage; none is required for reviewing the current local storefront.
