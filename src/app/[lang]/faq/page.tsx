import { getDictionary } from "@/lib/dictionary";
import FaqAccordion from "@/components/FaqAccordion";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");

  return (
    <main className="min-h-screen bg-[#fafaf9] py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-light text-slate-800 mb-12 text-center">
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
            className="text-sky-500 font-medium hover:underline"
          >
            Επικοινωνήστε μαζί μου απευθείας →
          </a>
        </div>
      </div>
    </main>
  );
}
