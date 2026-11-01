# Page references

Internal destinations use Sanity page references, resolved to the current slug
on the deployment's Country Site. A chosen reference takes precedence over any
old URL; an unavailable target is omitted instead of falling back to that URL.
The same fields serve menus, submenu links, page-section links and Give.

The Studio picker and publishing validation require the target to support every
site where the link appears. Country menus use their list's country; page-section
links inherit their page's publishing scope. Missing scope on an older page means
both sites. Validation checks the published target, so an unpublished target or
one that only becomes compatible in a draft cannot be linked yet.

## Rollout

1. Deploy the new code to **both** AU and NZ, including Studio. Existing URL links
   keep working, so there is no need to migrate before deploying.
2. From `apps/web`, inspect the dry run:

   ```sh
   node node_modules/sanity/bin/sanity migration run page-pickers --dry-run
   ```

3. After both deployments succeed, export a backup with the Sanity CLI and run:

   ```sh
   node node_modules/sanity/bin/sanity migration run page-pickers --no-dry-run
   ```

4. Check About and Privacy in the header/footer on both sites and in Studio.
   Rerunning the migration is safe. A concurrent edit causes a revision conflict;
   inspect a fresh dry run before retrying.

The migration converts only exact relative paths with one published, compatible
page target. Absolute URLs, anchors, query strings, missing targets, ambiguous
slugs and existing references remain untouched. Patches use array item keys and
document revision preconditions, and include both draft and published documents.

A read-only dry run on 1 November 2026 found six links to convert: About in header
and footer navigation, plus Privacy in legal navigation, in each of `homePage`
and `drafts.homePage`. No live migration was performed during implementation.

Do not roll back to a renderer that only reads URLs after migrating without first
restoring equivalent URLs. The migration removes the old URLs from converted
links so clearing a reference cannot silently resurrect a stale destination.

The legacy Give URL remains unchanged when no page is selected. Choosing the
AU/NZ donation destinations is separate work under issues #20 and #62.
