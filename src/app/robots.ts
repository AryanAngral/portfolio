import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/FLAG{robots_dot_txt_never_lies}",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
