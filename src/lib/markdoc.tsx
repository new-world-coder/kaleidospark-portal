import React from "react";
import Markdoc from "@markdoc/markdoc";

type MarkdocBody = (() => Promise<unknown>) | { node?: unknown } | string | null | undefined;

export async function renderBody(body: MarkdocBody) {
  if (!body) return null;

  let doc: unknown = body;
  if (typeof body === "function") {
    doc = await body();
  }

  // Keystatic may return { node } or a Markdoc AST directly
  const node =
    doc && typeof doc === "object" && "node" in (doc as object)
      ? (doc as { node: unknown }).node
      : doc;

  if (!node || typeof node !== "object") {
    if (typeof doc === "string") {
      return <div className="prose-ks whitespace-pre-wrap">{doc}</div>;
    }
    return null;
  }

  try {
    const errors = Markdoc.validate(node as never);
    if (errors?.length) {
      console.warn("[markdoc] validation", errors);
    }
    const renderable = Markdoc.transform(node as never);
    return (
      <div className="prose-ks space-y-4 [&_h2]:mt-8 [&_h2]:text-3xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
        {Markdoc.renderers.react(renderable, React)}
      </div>
    );
  } catch (error) {
    console.error("[markdoc] render failed", error);
    return (
      <p className="text-sm text-[var(--muted)]">Content temporarily unavailable.</p>
    );
  }
}
