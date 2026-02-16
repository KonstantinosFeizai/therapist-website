import { createClient } from "next-sanity";
import imageUrlBuilder, { SanityImageSource } from "@sanity/image-url";
export const client = createClient({
  projectId: "p5js9iv9",
  dataset: "production",
  apiVersion: "2024-01-01", // Χρησιμοποιούμε μια τρέχουσα ημερομηνία API
  useCdn: false, // false για να παίρνουμε πάντα τα πιο φρέσκα δεδομένα
});

// Helper για να μετατρέπουμε τα image references του Sanity σε κανονικά URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}