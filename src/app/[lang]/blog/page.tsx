import { client } from "@/lib/sanity";
import { getDictionary } from "@/lib/dictionary";
import BlogList from "@/components/BlogList";

// Το Query που "ρωτάει" το Sanity για τα άρθρα
async function getPosts(lang: string) {
  const isEn = lang === "en";
  const query = `*[_type == "post"] | order(publishedAt desc) {
  "title": ${isEn ? "title_en" : "title_el"},
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->${isEn ? "title_en" : "title_el"},
  "excerpt": ${isEn ? "excerpt_en" : "excerpt_el"} // <- Αλλαγή εδώ
}`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");
  const posts = await getPosts(lang);

  return (
    <main className="min-h-screen pt-10 pb-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-slate-800 sm:text-5xl mb-6">
            {dict.blog?.title || "Blog"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-light">
            {dict.blog?.subtitle || "Discover our latest news and insights"}
          </p>
        </div>

        {/* Εδώ καλούμε το νέο Component και του δίνουμε τα posts */}
        <BlogList posts={posts} lang={lang} />
      </div>
    </main>
  );
}
