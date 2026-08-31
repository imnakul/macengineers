interface JsonLdProps {
  /** One or more schema.org nodes. Multiple nodes are emitted as a single array. */
  data: readonly Record<string, unknown>[];
}

/**
 * Emits schema.org JSON-LD.
 *
 * `<` is escaped to its unicode form before the payload reaches the document. Any
 * literal `</script>` inside a string would otherwise close this tag early and drop the
 * remainder of the JSON into the page as markup — content here comes from data files
 * today, but that is exactly the kind of assumption that stops being true later.
 */
export function JsonLd({ data }: JsonLdProps): React.JSX.Element {
  const payload = JSON.stringify(data.length === 1 ? data[0] : data).replace(/</g, "\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />
  );
}
