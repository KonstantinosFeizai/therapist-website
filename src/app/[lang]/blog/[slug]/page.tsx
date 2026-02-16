import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { calculateReadingTime } from "@/lib/utils";
import { Metadata } from "next";

// Αυτή η συνάρτηση δημιουργεί τα SEO tags δυναμικά
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEn = lang === "en";

  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    "title": ${isEn ? "title_en" : "title_el"},
    mainImage,
    // Εδώ τραβάμε πλέον το σωστό excerpt ανάλογα τη γλώσσα
    "description": ${isEn ? "excerpt_en" : "excerpt_el"}
  }`;

  const post = await client.fetch(query);

  if (!post) return { title: "Post Not Found" };

  const imageUrl = urlFor(post.mainImage).url();
  const description =
    post.description ||
    (isEn
      ? "Read more about this article..."
      : "Διαβάστε περισσότερα για αυτό το άρθρο...");

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `https://www.melissasite.gr/${lang}/blog/${slug}`, // Άλλαξε το domain με το δικό σου
      siteName: "Melissa - Therapist",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: lang === "el" ? "el_GR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}

async function getPost(slug: string, lang: string) {
  const isEn = lang === "en";
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    "title": ${isEn ? "title_en" : "title_el"},
    mainImage,
    publishedAt,
    "body": ${isEn ? "body_en" : "body_el"},
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->${isEn ? "title_en" : "title_el"}
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);
  const dict = await getDictionary(lang as "el" | "en");
  const readingTime = calculateReadingTime(post.body);

  if (!post) return <div className="pt-40 text-center">Post not found</div>;

  return (
    <main className="min-h-screen pt-10 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-light text-slate-800 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Categories Tags */}
          <div className="flex justify-center gap-2 mb-8">
            {post.categories?.map((cat: string) => (
              <span
                key={cat}
                className="px-4 py-1 text-xs border border-slate-200 rounded-full text-slate-500"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-[300px] md:h-[500px] w-full mb-16 rounded-[2rem] overflow-hidden shadow-sm">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
          {/* Sidebar Info (Contributor & Time) */}
          <aside className="flex flex-col gap-8 border-r border-slate-100 pr-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">
                {dict.blog.author}
              </p>
              <div className="flex items-center gap-3">
                {post.authorImage && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.authorImage).url()}
                      alt={post.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {post.authorName}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString(
                      lang === "el" ? "el-GR" : "en-US",
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                {dict.blog.readingTime}
              </p>
              <div className="flex items-center gap-2 text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-sm">
                  ~{readingTime} {dict.blog.minute}
                </span>
              </div>
            </div>

            <Link
              href={`/${lang}/blog`}
              className="text-sm text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-2 mt-4"
            >
              ← {dict.blog.backToBlog}
            </Link>
          </aside>

          {/* Article Body */}
          <article className="prose prose-slate prose-lg max-w-none">
            <PortableText value={post.body} />
          </article>
        </div>
      </div>
    </main>
  );
}
