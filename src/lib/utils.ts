export function calculateReadingTime(body: any[]): number {
  if (!body) return 0;

  // Μετατρέπουμε το PortableText σε απλό κείμενο
  const text = body
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join(" ");
    })
    .join(" ");

  const wordsPerMinute = 200; // Μέσος όρος λέξεων ανά λεπτό
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return readingTime > 0 ? readingTime : 1;
}
