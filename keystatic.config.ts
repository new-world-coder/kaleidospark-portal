import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        publishedAt: fields.date({ label: "Published" }),
        author: fields.text({ label: "Author", defaultValue: "KaleidoSpark" }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    research: collection({
      label: "Research",
      slugField: "title",
      path: "content/research/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        publishedAt: fields.date({ label: "Published" }),
        gated: fields.checkbox({ label: "Email gate for full PDF", defaultValue: true }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    newsroom: collection({
      label: "Newsroom",
      slugField: "title",
      path: "content/newsroom/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        publishedAt: fields.date({ label: "Published" }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    events: collection({
      label: "Events",
      slugField: "title",
      path: "content/events/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        eventDate: fields.date({ label: "Event date" }),
        location: fields.text({ label: "Location", defaultValue: "Online" }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
  },
});
