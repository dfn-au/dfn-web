import { defineQuery } from "next-sanity";
import { HOME_PAGE_DOCUMENT_ID } from "../singletons";

// The homepage is shared. Legacy pages without scope are public on both sites,
// matching HOME_PAGE_QUERY and PAGE_QUERY. Drafts and releases are never URLs.
export const SITEMAP_QUERY = defineQuery(`*[
  !(_id in path("drafts.**")) && !(_id in path("versions.**")) && (
    (_type == "homePage" && _id == "${HOME_PAGE_DOCUMENT_ID}") ||
    (_type == "page" && defined(slug.current) && slug.current != "" &&
      (!defined(publishingScope) || $countrySite in publishingScope))
  )
]{"path": select(_type == "homePage" => "/", "/" + slug.current)}`);
