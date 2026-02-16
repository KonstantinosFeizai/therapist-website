import { getDictionary } from "@/lib/dictionary";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");
  const p = dict.privacy; // Σύντομη αναφορά στο privacy section

  return (
    <main className="min-h-screen bg-[#fafaf9] py-10">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-light text-slate-800 mb-12 text-center">
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

          <section className="p-6 bg-rose-50/30 rounded-2xl border border-rose-100/50">
            <h2 className="text-lg font-semibold text-rose-700 mb-3 tracking-wide">
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
