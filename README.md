# Rutgers Combat Robotics redesign

A complete static website ready for GitHub Pages. No build step or framework is required.

## Getting started

1. Extract the ZIP.
2. Open index.html in a browser, or serve the folder with `python3 -m http.server 8000` and visit http://localhost:8000.
3. To update your existing GitHub Pages site, upload the contents of this folder into the publishing folder of your RutgersCombatRoboticsTest repository. Keep index.html at the publishing root. Preserve filename capitalization.
4. The original GitHub Pages site has not been changed by this redesign.

## Edit team information

Open content.js in a text editor. Empty strings are deliberately left for unknown information. Empty optional details and buttons are hidden instead of linking to unfinished pages.

- meetingDay, meetingTime, meetingLocation: shown in the home page join section when filled in.
- sponsorshipEmail: adds an email button on the Sponsors page.
- sponsorshipPacket: local path to the existing sponsorship PDF. Replace that PDF or change the path when updating it.
- joinUrl, instagram, linkedin: shared social and joining links.
- nextEvent: fill in name, date, location, and url. The event appears once its name is filled in. Enter a human-readable date, including the year.
- board: existing public roster grouped into three sections. Update names and roles here; image is the local filename. major, bio, and link are optional.
- robots: starts empty. Add objects with name, image, and description to show a robot roster on the Competitions page. Example: { name: "", image: "NoTexture.png", description: "" }. Fill the name before publishing.
- merch.price, merch.sizes, merch.orderUrl: remain empty until confirmed; no checkout is simulated.
- merch.quarterZipImage: replace the NoTexture placeholder when a graphic is available.

Use quotes around text values, separate fields with commas, and retain the surrounding JavaScript structure. Avoid trailing text outside quotes.

## Images

Three missing portraits and the quarter zip use NoTexture.png. Replace an empty portrait image field in content.js with your chosen filename. Missing image files also fall back to NoTexture.png. Portraits are shown at a 4:5 ratio with the crop aligned to the top; use portrait images where possible.

NHRLFight.jpg is the home hero, NHRLGroup.jpg is the team photo, and NHRLPit1.jpg is the competition feature. Replace them in place to retain the layout. Change HTML image paths if using new filenames.

Sponsor logo copies prefixed logo- are cropped to remove transparent margins; the unmodified original files are also included. The dark sponsor panels preserve the white sponsor lettering. Sponsor names, links, and logo order can be edited in sponsors.html and index.html.

## Page copy and visual style

- index.html: home page, about, join section, sponsor strip.
- sponsors.html: sponsor logos immediately below the page heading; packet and contact section.
- competitions.html: event announcement, leagues, photos, optional robot roster.
- merch.html: merchandise gallery and updates.
- eboard.html: roster loaded from content.js; names and roles stay visible on touchscreens.
- style.css: colors, fonts, layouts, and responsive breakpoints. Change --red, --paper, and --ink near the top for the main palette.
- script.js: shared navigation and optional content rendering. Usually no editing is needed.

The typefaces are Barlow and Barlow Condensed from Google Fonts with local system fallbacks. An internet connection is needed to load those webfonts. The site does not require external JavaScript or an icon library.

## Before replacing the live site

Confirm the roster and roles, Discord invitation, sponsorship packet, sponsor links, merchandise details, and event information. All known factual content is from the supplied site and uploads; no event dates, prices, biographies, meeting details, or results have been invented.

Accessibility features include a skip link, keyboard focus outlines, meaningful image descriptions, reduced-motion support, a keyboard-operable mobile menu, and visible roster labels. Layouts adapt from four-column desktop portraits to two-column phone portraits.
