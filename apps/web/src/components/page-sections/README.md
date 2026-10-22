# General content pages

In Studio, open **Pages**, create a Page and set its title, slug, optional search
summary and ordered **Sections**. Publishing makes it available at `/<slug>` without
a code change or rebuild. Slugs are single path segments; system paths are
reserved. Missing pages return 404. Studio Presentation supports draft preview.

The template shares the homepage's fonts, palettes, header, footer and office
information. Edit those shared items under **Home Page** for now. Pages contain
no copies of that content. Add the page's path to an authored navigation list
when ready. Homepage section links on other pages return to the homepage;
Contact targets the footer on the current page. Unfinished links remain `#`.

Start with a **Page title** or **Introduction with image**, followed by any mix
of **Rich text**, **Text with image**, **Statement**, **Numbered items**, **Values**,
**Call to action** and **On this page** sections. Each section retains its own
responsive design. Add a section navigation label to include it in an On this
page menu; menu links follow section order and stable section keys.

## AU and NZ sites

Each page's **Publishing Scope** chooses the sites that publish it; other sites
return 404 at its slug. Pages saved before Publishing Scope existed are published
to both until an editor chooses. A section's **Show only on** limits it to one of
the page's sites; the opening section can't be limited.

The browser title, search description, and each section's eyebrow, headline and
rich-text bodies can be shared or set separately for AU and NZ. Turn on
**separate AU and NZ values** for a field to fill in its AU and NZ versions. An
empty AU or NZ value shows nothing on that site; it never uses the other
country's value. The page title and slug are always shared.

Rich-text fields support paragraphs, two heading levels, bold, italic, quotes,
bullet and numbered lists, links and images with alt text/captions. Typography
and layout stay in the shared section components. The palette selector remains
available and its selection is carried between public-page navigation links.

## Content and development

About uses the reviewed design content. Privacy was imported unchanged from
https://dfn.org.au/privacy-policy/ on 2026-09-12, including its legacy donation-domain
reference. The authored content now lives in Sanity.

During development, keep one-off content imports and schema-iteration scripts in
ignored `tmp/` directories. Commit migrations when deployed content needs a
repeatable upgrade, rather than preserving each development step.
