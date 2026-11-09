# SPTA Website Design Blueprint v1.0

## 1. Product objective

Create a polished, mobile-first public website demonstration for the Seshego Polokwane Taxi Association (SPTA). The site must serve four audiences:

- Commuters seeking route and association information.
- Taxi operators and association stakeholders.
- Community members seeking official announcements and contact details.
- Local businesses seeking visibility through the association's business directory.

The reference is SANTACO's website, but this is not a visual clone. The SPTA site should be more locally useful, easier to navigate, visually coherent and more useful on mobile.

## 2. Brand direction

Use the supplied SPTA logo as the identity source. The logo's dominant colours are red, white and black, with rainbow accents. Use:

- SPTA red as the primary brand colour.
- Near-black/charcoal for strong text and navigation contrast.
- White and warm light-grey surfaces.
- Rainbow colours only as restrained accents drawn from the logo.

Design character: modern premium corporate, grounded in the local transport environment. Avoid excessive gradients, decorative splatter effects, generic template styling and animation that competes with content.

Typography should be highly legible and use a modern sans-serif family with a clear hierarchy. Use strong photography, generous spacing, restrained borders and consistent card geometry.

## 3. Information architecture

### Global navigation
Home | About SPTA | Routes | News | Businesses | Gallery | Contact

Every page shares:
- Responsive header and mobile navigation.
- Consistent logo treatment.
- Clear page title and breadcrumb treatment where appropriate.
- Footer with verified contact information and quick links.
- Accessible focus states and keyboard operation.

### Page 1 — Home
Purpose: establish identity and guide visitors to the most useful tasks.

Sections:
1. Hero using an authentic client-supplied local transport/community photograph, a concise headline and two clear actions.
2. Short SPTA introduction grounded in researched facts.
3. Commuter shortcuts to routes, announcements and contact.
4. Featured route information, with a link to the complete routes page.
5. Latest verified announcements.
6. Business partner preview linking to the business directory.
7. Strong contact strip and footer.

Proposed headline: "Together as One. Moving Our Community Forward."
This is proposed marketing copy, not a claim about a formal strategic programme.

### Page 2 — About SPTA
Purpose: explain the association's identity and local transport role.

Sections:
- Association overview.
- SPTA's documented role in the Polokwane public transport environment.
- Mission, vision and values only when confirmed by the client. Until then, do not invent official statements.
- Leadership only after current names and positions are confirmed.
- Contact details.

### Page 3 — Routes and commuter information
Purpose: help commuters understand documented route information.

Sections:
- Introductory explanation.
- Search/filter interface for documented destinations.
- Route cards or grouped route information.
- Taxi-rank and destination references.
- Fare notices only where a current, dated source exists.
- Clear caveat that the published Gazette route material is a documentary reference and must be checked with SPTA before being presented as current operating guidance.

Do not infer schedules, fares, operating hours, live vehicle positions or complete route coverage.

### Page 4 — News and announcements
Purpose: provide an organised place for official updates.

Sections:
- Featured announcement.
- Dated announcement cards.
- Category filters (association, commuter information, safety/community, industry).
- Article detail view or readable expanded content.

Only publish SPTA-specific items supported by reliable sources or client approval. Third-party reporting must be attributed and dated.

### Page 5 — Business directory
Purpose: provide the commercial showcase requested by the client.

Two listing types:
- Directory listing: standard company card.
- Featured/sponsored listing: visibly distinguished promotional placement.

Each listing may contain:
- Company logo.
- Business name.
- Category.
- Short description.
- Website or social link.
- Telephone/email, if supplied and approved.

Required interactions:
- Search by business name.
- Filter by category.
- Clear filters.
- Responsive card grid.
- Distinct featured placement treatment.

Do not fabricate real businesses, logos, endorsements, advertising rates, package terms or claims that SPTA has approved an advertiser. Until real advertiser information is provided, use clearly labelled demonstration entries or an explicit "Business listings coming soon" state.

### Page 6 — Gallery
Purpose: showcase client-approved association and local imagery.

Use the supplied client photographs, with accurate captions only. Provide responsive image grid and accessible lightbox. Do not identify buildings, facilities or people beyond what can be reliably established.

### Page 7 — Contact
Purpose: make it easy to contact the association.

Use the contact details visible in the client-supplied logo:
- 64A Dahl Street, Polokwane, 0699
- Telephone/Fax: 015 291 3981
- Email: spta@telkomsa.net

Treat these as client-supplied details pending confirmation. Provide click-to-call and email links. An enquiry form in the static demo can validate fields and show a demonstration confirmation, but must state that it does not transmit messages until a backend or form service is connected.

## 4. Client-supplied image inventory

The archive contains 12 JPEGs:

| File | Dimensions | Initial visual classification |
|---|---:|---|
| IMG-20261109-WA0013.jpg | 561 x 294 | Taxi fleet with SPTA-colour markings |
| IMG-20261109-WA0014.jpg | 680 x 510 | Local civic/commercial building |
| IMG-20261109-WA0015.jpg | 448 x 446 | Taxi fleet with SPTA "Together as One" sign |
| IMG-20261109-WA0016.jpg | 512 x 510 | Local landmark/monument |
| IMG-20261109-WA0017.jpg | 1022 x 575 | Aerial view of taxi rank/vehicle area at night |
| IMG-20261109-WA0018.jpg | 289 x 312 | Local building/landmark |
| IMG-20261109-WA0019.jpg | 1024 x 683 | Polokwane city skyline |
| IMG-20261109-WA0020.jpg | 287 x 510 | Roadside landmark/monument |
| IMG-20261109-WA0021.jpg | 638 x 480 | Shopping-centre sign directory |
| IMG-20261109-WA0022.jpg | 680 x 510 | Large public venue/stadium exterior |
| IMG-20261109-WA0023.jpg | 415 x 739 | Aerial view of local urban area |
| IMG-20261109-WA0024.jpg | 335 x 597 | Aerial Seshego image with visible title treatment |

These classifications are visual descriptions, not verified place names. Captions should be checked with the client.

Preferred usage:
- Home hero: WA0013 or WA0015, subject to image quality and crop.
- Local context/feature sections: WA0019, WA0023 and WA0024.
- Gallery: all approved images, with portrait-aware layouts.
- Business directory: actual advertiser logos must be supplied separately; the shopping-centre directory photograph is not a substitute for business logo assets.

The supplied association logo should be stored separately in `assets/logos/`.

## 5. Content provenance rules

Content labels used during development:
- VERIFIED — supported by an authoritative source or explicit client material.
- REPORTED — attributed to a third-party publication and given a date.
- CLIENT CONFIRMATION REQUIRED — plausible but not safe to publish as current fact.
- PROPOSED COPY — editorial/marketing language, not an official policy or claim.
- DEMONSTRATION DATA — invented only for interface testing and always labelled as such.

Known starting facts:
- Organisation name and abbreviation: from client-supplied logo.
- Address, telephone/fax and email: from client-supplied logo; confirm before launch.
- Slogan "Together as One": from client-supplied logo.
- SPTA's involvement in Polokwane's public transport environment: municipal documentation.
- Published route information: Government Gazette material dated 17 January 2025; current operational accuracy requires association confirmation.
- Leadership/fare reporting: third-party report dated 18 May 2026; confirm current status with SPTA.

No unsupported mission, vision, founding date, membership count, executive list, service promise, route frequency, current fare, project list or advertising policy may be invented.

## 6. Interaction and accessibility requirements

- All navigation links work between pages.
- Mobile menu supports keyboard and touch.
- Business search and category filters work client-side.
- Route search/filter works only on the included documented dataset.
- Gallery lightbox has close, previous/next and keyboard support.
- Forms have labels, inline validation and clear demo-only submission messaging.
- Use semantic landmarks, visible focus states, descriptive image alt text and sufficient colour contrast.
- Respect reduced-motion preferences.
- Avoid hover-only interactions.

## 7. Technical constraints

- Plain HTML5, CSS and vanilla JavaScript.
- No framework, backend, database, authentication or build system for the demo.
- Shared styles and scripts should be organised under `css/` and `js/`.
- Local assets should be referenced with relative paths.
- The site must be usable from a local static server and should not depend on external fonts or image hosts for core presentation.
- Keep production-stack decisions separate until client approval.

## 8. Acceptance criteria

1. Seven complete, interconnected pages.
2. Strong visual consistency and SPTA brand recognition.
3. Responsive desktop, tablet and mobile layouts.
4. Actual client photographs used appropriately.
5. Functional business search and category filters.
6. Functional route search/filter using documented data only.
7. Accessible gallery and mobile navigation.
8. Contact details and source-sensitive content clearly controlled.
9. No fake advertisers or unsupported organisational claims presented as real.
10. Demo limitations clearly documented.

## 9. Outstanding client inputs

- Confirm official contact details.
- Confirm current leadership and approved organisational description.
- Confirm which route information is current and publishable.
- Supply official mission, vision and values if these should appear.
- Supply actual business names, logos, categories, descriptions and links.
- Confirm whether featured business placement is paid, sponsored or allocated by another arrangement.
- Confirm permission to publish all supplied photographs and any captions/place identifications.
