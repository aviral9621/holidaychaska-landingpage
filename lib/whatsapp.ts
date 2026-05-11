export const WA_NUMBER = "919717580259";
export const PHONE_DISPLAY = "+91 97175 80259";
export const PHONE_TEL = "+919717580259";
export const SUPPORT_EMAIL = "enquiry@holidaychaska.com";

export const WA_DEFAULT_MSG =
  "Hi! I'm interested in Uttarakhand Tour Packages. Please share details.";

export function waUrl(message: string = WA_DEFAULT_MSG): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Compact WA message for a specific package — used by the chip on each package card.
 */
export function waPackageUrl(opts: { name: string; duration: string; places: string[] }): string {
  const msg = `Hi! I'd like details for the *${opts.name}* package (${opts.duration}). Places: ${opts.places.join(", ")}. Please share itinerary, pricing & next available dates.`;
  return waUrl(msg);
}
