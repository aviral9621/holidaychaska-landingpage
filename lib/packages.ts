export type Amenity = { icon: string; label: string };

export type TourPackage = {
  id: string;
  name: string;
  duration: string;
  categories: string[];
  places: string[];
  accommodation: string;
  meals: string;
  amenities: Amenity[];
  description: string;
  image: string;
};

export const PACKAGES: TourPackage[] = [
  {
    id: "delightful-gujarat",
    name: "Delightful Gujarat Tour",
    duration: "5 Nights / 6 Days",
    categories: ["Family", "Pilgrimage"],
    places: ["Dwarka", "Somnath", "Ahmedabad", "Gandhinagar"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Daily Breakfast",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Explore Gujarat's iconic spiritual and scenic destinations — Dwarka's sacred ghats, Somnath's Jyotirlinga temple, and Ahmedabad's heritage gems in a perfectly paced 6-day journey.",
    image: "/packages/delightful-gujarat.webp",
  },
  {
    id: "majestic-gujarat",
    name: "Majestic Gujarat",
    duration: "6 Nights / 7 Days",
    categories: ["Heritage", "Family"],
    places: ["Dwarka", "Somnath", "Ahmedabad", "Gandhinagar"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "A week-long royal journey through Gujarat's majestic temples, coastline shrines, and vibrant heritage cities. Perfect for families seeking comfort and cultural enrichment.",
    image: "/packages/majestic-gujarat.webp",
  },
  {
    id: "gujarat-family-tour",
    name: "Gujarat Family Tour",
    duration: "7 Nights / 8 Days",
    categories: ["Family"],
    places: ["Dwarka", "Somnath", "Ahmedabad", "Gandhinagar"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "All Meals Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "An 8-day family-friendly package covering all of Gujarat's must-visit destinations with comfortable hotels, guided sightseeing, and wholesome vegetarian meals throughout.",
    image: "/packages/gujarat-family-tour.webp",
  },
  {
    id: "gujarat-temple-tour",
    name: "Gujarat Temple Tour",
    duration: "7 Nights / 8 Days",
    categories: ["Pilgrimage", "Spiritual"],
    places: ["Dwarka", "Somnath", "Ahmedabad", "Surat", "Gandhinagar"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "🛕", label: "Temple Darshans" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "A deeply spiritual 8-day pilgrimage through Gujarat's most revered temples — Somnath Jyotirlinga, Dwarkadheesh, Nageshwar, Ambaji, and Akshardham. Designed for devotees seeking blessings and peace.",
    image: "/packages/gujarat-temple-tour.webp",
  },
  {
    id: "gujarat-extravaganza",
    name: "Gujarat Extravaganza",
    duration: "8 Nights / 9 Days",
    categories: ["Comprehensive", "Group"],
    places: ["Dwarka", "Somnath", "Ahmedabad", "Surat", "Bhuj"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "All Meals Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "The ultimate Gujarat experience — 9 days covering spiritual heartland, cultural capitals, coastal gems, and the mystical desert landscapes of Kutch. Best for comprehensive group tours.",
    image: "/packages/gujarat-extravaganza.webp",
  },
  {
    id: "rann-of-kutch",
    name: "Rann of Kutch",
    duration: "2 Nights / 3 Days",
    categories: ["Adventure", "Cultural"],
    places: ["Ahmedabad", "Bhuj", "Rann of Kutch"],
    accommodation: "Hotels + Tent Accommodation",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "🏨", label: "Hotels" },
      { icon: "🏕", label: "Tent Stay" },
      { icon: "🎵", label: "Cultural Shows" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Experience the magic of the Great Rann — the world's largest salt desert. Enjoy stunning moonlit white desert nights, Kutchi folk music, local handicraft bazaars, and vibrant cultural performances.",
    image: "/packages/rann-of-kutch.webp",
  },
  {
    id: "gir-wildlife-safari",
    name: "Wildlife of Gujarat — Gir Safari",
    duration: "5 Nights / 6 Days",
    categories: ["Wildlife", "Adventure"],
    places: ["Ahmedabad", "Gir National Park", "Somnath", "Diu"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "🦁", label: "Jungle Safari" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "India's only Asiatic Lions roam the forests of Gir. Combine thrilling jeep safari rides through Gir National Park with a visit to Somnath's sacred shores and the sunny beaches of Diu Island.",
    image: "/packages/gir-wildlife-safari.webp",
  },
  {
    id: "bhuj-kutch-heritage",
    name: "Discover Bhuj — Kutch Heritage",
    duration: "5 Nights / 6 Days",
    categories: ["Heritage", "Cultural"],
    places: ["Somnath", "Dwarka", "Ahmedabad", "Bhuj"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "🏛", label: "Heritage Walk" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Discover the rich heritage of Bhuj and Kutch — ancient palaces, intricate Ajrakh embroidery, Aina Mahal Museum, and the extraordinary artisan villages that make Kutch a living cultural treasure.",
    image: "/packages/bhuj-kutch-heritage.webp",
  },
  {
    id: "saurashtra-diu",
    name: "Saurashtra & Diu Beach Tour",
    duration: "6 Nights / 7 Days",
    categories: ["Heritage", "Beach", "Family"],
    places: ["Rajkot", "Dwarka", "Somnath", "Gir", "Diu"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "🏖", label: "Beach Time" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Explore royal Saurashtra — Dwarkadheesh temple, Somnath Jyotirlinga, Gir Lion Reserve, and finally unwind on the sun-kissed Portuguese-heritage beaches of Diu Island.",
    image: "/packages/saurashtra-diu.webp",
  },
];
