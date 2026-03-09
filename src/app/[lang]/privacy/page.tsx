import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isGreek = lang === "el";

  return {
    title: isGreek
      ? "Πολιτική Απορρήτου | Melisa Tsela"
      : "Privacy Policy | Melisa Tsela",
    description: isGreek
      ? "Πολιτική απορρήτου και διαχείριση προσωπικών δεδομένων για τον ιστότοπο της Melisa Tsela."
      : "Privacy policy and personal data handling for Melisa Tsela website.",
    alternates: {
      canonical: `/${lang}/privacy`,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");
  const p = dict.privacy; // Σύντομη αναφορά στο privacy section

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-fixed py-10"
      style={{ backgroundImage: "url('/images/vecteezy_minimalist.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/80 -z-10"></div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-light text-[#183f80] mb-12 text-center">
          {p.title}
        </h1>

        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-slate-100 shadow-sm text-slate-600 leading-relaxed font-light space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
              {p.intro_title}
            </h2>
            <p>{p.intro_text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
              {p.data_collection_title}
            </h2>
            <p>{p.data_collection_text}</p>
          </section>

          <section className="p-6 bg-[#fef5ee] rounded-2xl border border-rose-100/50">
            <h2 className="text-lg font-semibold text-[#fea1a2] mb-3 tracking-wide">
              {p.confidentiality_title}
            </h2>
            <p className="text-slate-700">{p.confidentiality_text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
              {p.cookies_title}
            </h2>
            <p>{p.cookies_text}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
              {p.rights_title}
            </h2>
            <p>{p.rights_text}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
