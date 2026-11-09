# SPTA demo — future CMS content contract

## Purpose

The current deliverable is a static proof of concept. It demonstrates page structure and user journeys without pretending that client-controlled records already exist. The production website is expected to use a backend CMS. This document defines a starting content contract so the static presentation can later be connected to managed content without redesigning the site.

No CMS, API, database, authentication or publishing workflow is implemented in this demo.

## Content principles

- Keep content separate from presentation components.
- Do not fabricate real-world SPTA records to populate empty states.
- Every publishable record must carry a status, source/approval metadata and timestamps.
- Use explicit empty states where no approved records exist.
- Treat sensitive memorial content with restricted permissions and an approval trail.
- Store dates in ISO 8601 format and render them in the site's chosen local display format.
- Store money as integer minor units plus an explicit currency code; do not parse formatted currency strings.
- Store fuel price type and unit explicitly so wholesale diesel prices cannot be presented as retail pump prices.

## Proposed CMS collections

### Association pages
Fields: slug, title, summary, body, heroImage, status, publishedAt, updatedAt.
Supports editable page copy and future updates to About, contact information and institutional content. Client-approved mission and values retain supplied wording unless SPTA approves edits.

### Route references
Fields: origin, destination, rankOrStop, routeDescription, verificationSource, verifiedAt, status, notes.
A route record must not imply a live service, timetable, fare or operating guarantee unless separately supplied and verified. Route search should read from this collection in production.

### Notices
Common fields: id, type, title, summary, body, status, announcedAt, effectiveAt, sourceName, sourceUrl, approvedBy, publishedAt, expiresAt.
Supported types: association_announcement, fare_change, fuel_price_update and member_memorial.

### Member memorials
Fields: memberDisplayName, portraitAsset, dateOfPassing, funeralDate, funeralTime, funeralVenue, approvedTribute, familyConsentRecorded, authorisedConfirmationRecorded, correctionContact, plus common notice fields.
Do not publish until required confirmation and consent checks are complete. Do not publish identity numbers, home addresses, medical details or private contact information that is not expressly approved. Restrict editing and approval to authorised roles.

### Fare changes
Fields: routeId, origin, destination, previousFareMinor, newFareMinor, currency, changeAmountMinor, changeDirection, effectiveAt, issuingAuthority, sourceUrl, verifiedAt, plus common notice fields.
A published fare change must identify the affected route and effective date. Historical media reporting must remain visibly distinguished from current SPTA-confirmed fares.

### Fuel price updates
Fields: effectiveMonth, effectiveAt, pricingZone, productGrade, priceType, priceMinorPerLitre, previousPriceMinorPerLitre, changeMinorPerLitre, currency, unit, sourceName, sourceUrl, verifiedAt, plus common notice fields.
Use priceType=regulated_retail for applicable petrol retail prices and priceType=wholesale for diesel wholesale prices. Do not label wholesale diesel prices as pump prices. Each monthly update must identify the applicable pricing zone and official source.

### Business directory
Fields: businessName, slug, description, logoAsset, category, listingType, website, phone, email, address, isFeatured, displayOrder, status, approvedAt, publishedAt.
listingType should support the commercial model selected by SPTA, such as member business, external partner or paid advertiser. Demo cards are illustrative and are not actual businesses or confirmed advertising products.

### Gallery assets
Fields: asset, altText, caption, category, locationLabel, permissionStatus, displayOrder, publishedAt.
Alt text and captions should describe what is actually visible. Specific location labels and publication permissions must be confirmed before launch.

## Publishing workflow

1. An authorised editor creates or updates a draft.
2. Required fields and source evidence are checked.
3. A designated approver confirms accuracy and permissions.
4. The record is published with an audit timestamp and approver identity.
5. Time-sensitive records can be expired or archived without deleting their history.
6. Corrections preserve an audit trail.

## Demo-to-production boundary

The current HTML pages are presentation prototypes. They are not a secure content management system. Production implementation will require a selected CMS/backend, API contracts, authentication, role-based permissions, validation, audit logging, media storage, backups and deployment configuration. Those decisions are intentionally deferred until the client approves the demo and confirms operational requirements.