import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const articlesDirectory = join(process.cwd(), "./articles");

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

function getRawArticleBySlug(slug) {
  const fullPath = join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  console.log("===", data);
  data.date = toTimestamp(data.date);
  return { content, ...data };
}

function getAllSlugs() {
  return fs.readdirSync(articlesDirectory);
}

function getArticleBySlug(slug, fields) {
  const realSlug = slug.replace(/\.md$/, "");
  const article = getRawArticleBySlug(realSlug);
  const items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = article.content;
    }
    if (field === "title") {
      items[field] = article.title;
    }
    if (field === "date") {
      items[field] = article.date;
    }
    if (field === "description") {
      items[field] = article.description;
    }
    if (field === "tags") {
      items[field] = article.tags ? article.tags.split(",") : [];
    }
  });

  return items;
}

function getAllArticles(fields = []) {
  return getAllSlugs()
    .map((slug) => {
      return getArticleBySlug(slug, fields);
    })
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
}

function getArticlesByTag(tag, fields = []) {
  return getAllArticles(fields).filter((article) => {
    const tags = article.tags ?? [];
    return tags.includes(tag);
  });
}

function getAllTags() {
  const articles = getAllArticles(["tags"]);
  const allTags = new Set();
  articles.forEach((article) => {
    const tags = article.tags;
    tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

export const api = {
  getRawArticleBySlug,
  getAllSlugs,
  getAllArticles,
  getArticlesByTag,
  getArticleBySlug,
  getAllTags,
};
