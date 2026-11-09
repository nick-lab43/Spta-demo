# SPTA website requirements addendum — member notices and price updates

Source: additional client requirements relayed by the system owner on 9 November 2026.

## 1. Member memorial and funeral notices

Add a dedicated category to the public Notices & Updates page for deceased SPTA members and funeral arrangements.

Each notice may contain:
- Member's full name.
- Photograph, only where the family/association has permission to publish it.
- Date of passing.
- Funeral date and time.
- Funeral venue and relevant service details.
- Optional family or association tribute, approved for publication.
- Notice publication date and a contact point for corrections.

Publication safeguards:
- Publish only details confirmed by an authorised SPTA representative and/or the family.
- Obtain family consent before publishing personal details, photographs, or funeral arrangements.
- Do not publish identity numbers, private residential addresses, medical details, or unapproved family contact information.
- Clearly label unconfirmed details as pending and do not present them as final arrangements.
- After the funeral, move the notice to a dated memorial archive or mark it as past; do not silently leave obsolete arrangements appearing as upcoming.
- Provide a correction/removal contact route.

No deceased-member names or funeral arrangements have been supplied yet. Use an honest empty state in the demo, not invented names or dates.

## 2. Taxi fare announcements

Add a fare-adjustment category for SPTA-approved fare changes.

Each update should show:
- Route or service affected.
- Previous fare.
- New fare.
- Amount of increase/decrease.
- Effective date.
- Date announced.
- Issuing/approval authority (SPTA, if confirmed).
- Source or official notice.

Do not treat a media report as confirmation of the current fare. The reported Seshego–Polokwane R15-to-R20 adjustment effective 18 May 2026 is historical and must remain labelled as a third-party report until SPTA confirms its current validity.

## 3. Petrol and diesel price updates

Add a fuel-price update category. The official South African Department of Mineral and Petroleum Resources (DMPR) fuel-price page and Central Energy Fund (CEF) releases are the primary sources.

Official source: https://www.dmpr.gov.za/Services/Petroleum-Resources/Fuel-Prices

Display:
- Month and effective date.
- Geographic pricing zone applicable to Polokwane (verify the correct zone before publishing).
- Petrol 93 and Petrol 95 retail price, where published for the relevant zone.
- Diesel 0.05% and 0.005% sulphur wholesale price, where published.
- Previous price and new price.
- Change in cents per litre, clearly marked increase or decrease.
- Date last verified and link to the official DMPR/CEF announcement.

Important pricing distinction:
- Petrol prices are displayed as regulated retail prices for the applicable zone.
- Diesel published prices are wholesale prices; do not label them as the retail pump price at every filling station.
- Do not publish one national price as if it necessarily applies to Polokwane.
- Do not estimate future prices or present unverified figures as current.

The page should use manually verified monthly data in the static prototype. Automatic live updates require a future data source/API and a backend or scheduled content process; do not imply the static demo updates itself.

## 4. Public page and information architecture

Use a public-facing "Notices & Updates" page with clear categories:
1. Member memorials & funeral notices.
2. Taxi fare changes.
3. Petrol & diesel price updates.
4. General association announcements.

The page should support chronological ordering, clear effective/publication dates, category labels and archived notices. The static prototype may demonstrate filtering and sample layout, but it must not fabricate real notices or price values.

## 5. Production requirements to discuss after demo approval

- An authorised SPTA editor workflow for submitting and approving notices.
- Role-based permissions for publishing memorials and official fare notices.
- Audit trail recording who changed each notice and when.
- Expiry/archive controls for funeral notices and outdated prices.
- Source verification and effective-date checks for fuel data.
- Privacy and consent process for memorial content.
- Optional notifications for newly published fare/fuel updates.

## 6. Client information still required

- Memorial notices: actual approved member names, photos (if approved), passing dates, funeral details, and permission to publish.
- Fare changes: current approved fares, routes, announcement dates, effective dates, and supporting notices.
- Fuel updates: approval on whether SPTA wants manually curated monthly summaries or automated ingestion in the eventual production system.
- Confirmation of the DMPR/CEF geographic pricing zone to use for Polokwane.
