import { defineQuery } from "next-sanity";
import { LINK_TARGET_FILTER } from "../link-scope";

export const COMPATIBLE_LINK_TARGET_QUERY = defineQuery(
	`*[_id == $id && ${LINK_TARGET_FILTER}][0]._id`,
);

export const PUBLISHED_LINK_TARGETS_QUERY = defineQuery(`*[
  !(_id in path("drafts.**")) && !(_id in path("versions.**")) &&
  ((_type == "homePage" && _id == "homePage") || (_type == "page" && defined(slug.current)))
]{_id, _type, slug, publishingScope}`);
