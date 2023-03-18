import fs from "fs";
import RSS from "rss";
import { getSortedPostsData } from "./posts";

export default async function generateRssFeed() {
  const site_url = "localhost:3000";

  const feedOptions = {
    title: "RSS Feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  const allPosts = await getSortedPostsData();
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/post/${post.id}`,
      date: post.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}