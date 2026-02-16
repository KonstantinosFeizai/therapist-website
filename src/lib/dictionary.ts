import "server-only";

const dictionaries = {
  el: () => import("../dictionaries/el.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.el>>;

export const getDictionary = async (locale: "el" | "en") =>
  dictionaries[locale]();
