// Google'ın okuduğu yapısal veri (schema.org JSON-LD)
export function JsonLd({ veri }: { veri: object | object[] }) {
  const liste = Array.isArray(veri) ? veri : [veri];
  return (
    <>
      {liste.map((v, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(v).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
