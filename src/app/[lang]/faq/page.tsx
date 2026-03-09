import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import FaqAccordion from "@/components/FaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isGreek = lang === "el";

  return {
    title: isGreek ? "Συχνές Ερωτήσεις | Melisa Tsela" : "FAQ | Melisa Tsela",
    description: isGreek
      ? "Συχνές ερωτήσεις για τις online συνεδρίες ψυχοθεραπείας με τη Melisa Tsela."
      : "Frequently asked questions about online psychotherapy sessions with Melisa Tsela.",
    alternates: {
      canonical: `/${lang}/faq`,
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="min-h-screen  py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-light text-[#183f80] mb-12 text-center">
          {dict.faq.title}
        </h1>

        {/* Εδώ καλούμε το Accordion περνώντας τις ερωτήσεις από το JSON */}
        <FaqAccordion questions={dict.faq.questions} />

        <div className="mt-16 text-center">
          <p className="text-slate-500 font-light mb-6">
            Έχετε περισσότερες ερωτήσεις;
          </p>
          <a
            href={`/${lang}/contact`}
            className="text-[#183f80] font-medium hover:underline"
          >
            Επικοινωνήστε μαζί μου απευθείας →
          </a>
        </div>
      </div>
    </main>
  );
}
