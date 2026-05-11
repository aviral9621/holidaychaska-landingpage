export type Amenity = { icon: string; label: string };

export type TourPackage = {
  id: string;
  name: string;
  duration: string;
  price: string;
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
    id: "delightful-uttarakhand",
    name: "Delightful Uttarakhand Tour",
    duration: "7 Nights / 8 Days",
    price: "₹15,999/-",
    categories: ["Family", "Hill Station"],
    places: ["Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Jim Corbett"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Explore Uttarakhand's finest — Ganga Aarti at Haridwar, yoga capital Rishikesh, serene Naini Lake, misty Mussoorie, and a thrill-filled jungle safari at Jim Corbett in a perfectly paced 8-day journey.",
    image: "/packages/uk-pkg-1.jpg",
  },
  {
    id: "nainital-jim-corbett",
    name: "Nainital with Jim Corbett",
    duration: "4 Nights / 5 Days",
    price: "₹7,999/-",
    categories: ["Wildlife", "Hill Station"],
    places: ["Nainital", "Jim Corbett National Park", "Ramnagar", "Bhimtal"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "🏨", label: "Hotels" },
      { icon: "🐯", label: "Jungle Safari" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "A perfect short getaway combining the serene lake city of Nainital with thrilling jeep safaris at Jim Corbett — India's oldest national park, home to Royal Bengal Tigers and over 600 bird species.",
    image: "/packages/uk-pkg-2.jpg",
  },
  {
    id: "uttarakhand-family-tour",
    name: "Uttarakhand Family Tour",
    duration: "6 Nights / 7 Days",
    price: "₹18,999/-",
    categories: ["Family", "Adventure"],
    places: ["Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Dhanaulti"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "All Meals Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "A family-friendly 7-day journey through Uttarakhand's best — Ganga Aarti on the ghats, boating on Naini Lake, snow-capped views from Mussoorie's Gun Hill, and the apple orchards of Dhanaulti.",
    image: "/packages/uk-pkg-3.jpg",
  },
  {
    id: "uttarakhand-honeymoon",
    name: "Uttarakhand Honeymoon Package",
    duration: "7 Nights / 8 Days",
    price: "₹18,999/-",
    categories: ["Honeymoon", "Romantic"],
    places: ["Mussoorie", "Nainital", "Chopta", "Auli"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "🌄", label: "Scenic Views" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Begin your love story amidst snow-capped Himalayas — romantic stays in Mussoorie, sunrise over Naini Lake, tranquil meadows of Chopta, and sweeping glacier vistas from Auli in 8 blissful days.",
    image: "/packages/uk-pkg-4.jpg",
  },
  {
    id: "nainital-mussoorie",
    name: "Nainital and Mussoorie",
    duration: "5 Nights / 6 Days",
    price: "₹14,999/-",
    categories: ["Hill Station", "Family"],
    places: ["Nainital", "Bhimtal", "Mussoorie", "Dhanaulti", "Kempty Falls"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚡", label: "Cable Car" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "The perfect twin-hill-station escape — boat rides on Naini Lake, misty Mall Road in Mussoorie, thundering Kempty Falls, and serene pine forests of Dhanaulti. All in just 6 days.",
    image: "/packages/uk-pkg-5.jpg",
  },
  {
    id: "heavenly-uttarakhand",
    name: "Heavenly Uttarakhand",
    duration: "9 Nights / 10 Days",
    price: "₹20,999/-",
    categories: ["Comprehensive", "Pilgrimage", "Adventure"],
    places: ["Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Auli", "Badrinath"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "All Meals Included",
    amenities: [
      { icon: "✈", label: "Flights" },
      { icon: "🏨", label: "Hotels" },
      { icon: "🛕", label: "Char Dham" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "The ultimate Uttarakhand odyssey — 10 days covering sacred Char Dham shrines, skiing slopes of Auli, serene Naini Lake, misty peaks of Mussoorie, and the holy ghats of Haridwar and Rishikesh.",
    image: "/packages/uk-pkg-6.jpg",
  },
  {
    id: "mussoorie-dhanaulti",
    name: "Mesmerizing Mussoorie with Dhanaulti",
    duration: "3 Nights / 4 Days",
    price: "₹5,499/-",
    categories: ["Hill Station", "Weekend Getaway"],
    places: ["Mussoorie", "Dhanaulti", "Kempty Falls", "Landour"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚡", label: "Cable Car" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "Escape the city in 4 days — stroll Mussoorie's famous Mall Road, witness thundering Kempty Falls, explore the charming village of Landour, and breathe the crisp pine air of Dhanaulti's eco-park.",
    image: "/packages/uk-pkg-7.jpg",
  },
  {
    id: "auli-tour",
    name: "Auli Ski & Adventure Tour",
    duration: "5 Nights / 6 Days",
    price: "₹10,999/-",
    categories: ["Adventure", "Snow", "Pilgrimage"],
    places: ["Auli", "Joshimath", "Valley of Flowers", "Badrinath"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast & Dinner",
    amenities: [
      { icon: "⛷️", label: "Skiing" },
      { icon: "🚡", label: "Cable Car" },
      { icon: "🌺", label: "Valley of Flowers" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "India's premier ski destination at 2,519 m — experience Himalayan skiing at Auli, ride Asia's longest cable car, visit sacred Badrinath temple, and trek through the UNESCO Valley of Flowers.",
    image: "/packages/uk-pkg-8.jpg",
  },
  {
    id: "glimpse-uttarakhand",
    name: "Glimpse of Uttarakhand",
    duration: "5 Nights / 6 Days",
    price: "₹12,499/-",
    categories: ["Heritage", "Hill Station"],
    places: ["Haridwar", "Rishikesh", "Nainital", "Mussoorie"],
    accommodation: "Hotels (Double/Triple Sharing)",
    meals: "Breakfast Included",
    amenities: [
      { icon: "🏨", label: "Hotels" },
      { icon: "👁", label: "Sightseeing" },
      { icon: "🚣", label: "River Rafting" },
      { icon: "🚗", label: "AC Transfers" },
    ],
    description:
      "A 6-day snapshot of Uttarakhand's most iconic experiences — Ganga Aarti at Haridwar, white-water rafting in Rishikesh, boating on Naini Lake, and panoramic valley views from Mussoorie's Gun Hill.",
    image: "/packages/uk-pkg-9.jpg",
  },
];
