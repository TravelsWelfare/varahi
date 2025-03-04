interface PackageItinerary {
  packageId: number;
  days: {
    title: string;
    description: string;
    location: string;
    activities: string[];
    overnight?: string;
  }[];
}

export const packageItineraries: PackageItinerary[] = [
  {
    packageId: 1, // Kedarnath Helicopter Package
    days: [
      {
        title: "Arrival in Dehradun",
        description: "Welcome to your spiritual journey. Arrive in Dehradun and transfer to Guptkashi.",
        location: "Dehradun → Guptkashi",
        activities: [
          "Airport pickup and welcome orientation",
          "Scenic drive to Guptkashi (7-8 hours)",
          "Evening aarti at Ardh Narishwar Temple",
          "Briefing about tomorrow's helicopter journey"
        ],
        overnight: "Hotel in Guptkashi"
      },
      {
        title: "Kedarnath Darshan",
        description: "Early morning helicopter ride to Kedarnath followed by VIP darshan.",
        location: "Guptkashi → Kedarnath → Guptkashi",
        activities: [
          "Early morning helicopter ride to Kedarnath",
          "VIP darshan at Kedarnath Temple",
          "Guided temple tour and history explanation",
          "Free time for meditation and photography",
          "Return helicopter ride to Guptkashi"
        ],
        overnight: "Hotel in Guptkashi"
      }
    ]
  },
  {
    packageId: 2, // Complete Char Dham Yatra
    days: [
      {
        title: "Arrival & Journey to Barkot",
        description: "Begin your sacred journey with a drive to Barkot, gateway to Yamunotri.",
        location: "Dehradun → Barkot",
        activities: [
          "Welcome at Dehradun airport/station",
          "Scenic drive through Mussoorie",
          "Visit to Kempty Falls en route",
          "Evening preparation for tomorrow's yatra"
        ],
        overnight: "Hotel in Barkot"
      },
      {
        title: "Yamunotri Temple Visit",
        description: "First dham of your yatra - the divine Yamunotri temple.",
        location: "Barkot → Yamunotri → Barkot",
        activities: [
          "Early morning drive to Janki Chatti",
          "Trek/pony ride to Yamunotri Temple",
          "Holy dip in Surya Kund",
          "Cook rice in the hot springs",
          "Temple darshan and puja"
        ],
        overnight: "Hotel in Barkot"
      },
      {
        title: "Journey to Gangotri",
        description: "Travel to the sacred source of River Ganga.",
        location: "Barkot → Gangotri",
        activities: [
          "Scenic drive to Gangotri",
          "Visit Gangnani hot springs en route",
          "Evening aarti at Gangotri Temple",
          "Meditation by the Bhagirathi River"
        ],
        overnight: "Hotel in Gangotri"
      },
      {
        title: "Gangotri Temple & Uttarkashi",
        description: "Morning darshan and journey to Uttarkashi.",
        location: "Gangotri → Uttarkashi",
        activities: [
          "Early morning Gangotri Temple darshan",
          "Visit to Bhagirath Shila",
          "Drive to Uttarkashi",
          "Visit Vishwanath Temple"
        ],
        overnight: "Hotel in Uttarkashi"
      },
      {
        title: "Journey to Guptkashi",
        description: "Travel through the heart of Uttarakhand to Guptkashi.",
        location: "Uttarkashi → Guptkashi",
        activities: [
          "Scenic drive along Mandakini River",
          "Visit to Kashi Vishwanath Temple",
          "Evening aarti participation"
        ],
        overnight: "Hotel in Guptkashi"
      },
      {
        title: "Kedarnath Darshan",
        description: "The divine darshan of Lord Kedarnath.",
        location: "Guptkashi → Kedarnath",
        activities: [
          "Early morning drive to Sonprayag",
          "Trek/pony ride to Kedarnath",
          "Temple darshan and puja",
          "Visit Adi Shankaracharya Samadhi",
          "Evening aarti"
        ],
        overnight: "Hotel in Kedarnath"
      },
      {
        title: "Return & Journey to Badrinath",
        description: "Return from Kedarnath and proceed to Badrinath.",
        location: "Kedarnath → Badrinath",
        activities: [
          "Morning temple visit",
          "Return trek to Sonprayag",
          "Drive to Badrinath via Joshimath",
          "Evening Maha Aarti at Badrinath"
        ],
        overnight: "Hotel in Badrinath"
      },
      {
        title: "Badrinath Temple & Mana Village",
        description: "Experience the divine aura of Badrinath and visit the last Indian village.",
        location: "Badrinath",
        activities: [
          "Early morning temple darshan",
          "Visit Mana Village",
          "See Vyas Gufa and Ganesh Gufa",
          "Visit Bheem Pul",
          "Evening meditation session"
        ],
        overnight: "Hotel in Badrinath"
      },
      {
        title: "Journey Back to Rishikesh",
        description: "Begin your return journey with holy stops en route.",
        location: "Badrinath → Rishikesh",
        activities: [
          "Morning temple visit",
          "Drive to Rishikesh",
          "Visit Narsimha Temple en route",
          "Evening Ganga Aarti at Triveni Ghat"
        ],
        overnight: "Hotel in Rishikesh"
      },
      {
        title: "Departure",
        description: "Conclude your spiritual journey with morning activities in Rishikesh.",
        location: "Rishikesh → Dehradun",
        activities: [
          "Morning yoga session (optional)",
          "Visit Beatles Ashram",
          "Shopping for spiritual items",
          "Transfer to Dehradun airport/station"
        ]
      }
    ]
  },
  {
    packageId: 3, // Kedarnath & Badrinath Package
    days: [
      {
        title: "Arrival in Haridwar",
        description: "Welcome to the land of Gods. Begin your journey from Haridwar.",
        location: "Haridwar",
        activities: [
          "Airport/station pickup",
          "Visit Har Ki Pauri",
          "Evening Ganga Aarti",
          "Trip briefing and preparation"
        ],
        overnight: "Hotel in Haridwar"
      },
      {
        title: "Journey to Guptkashi",
        description: "Travel through scenic mountains to Guptkashi.",
        location: "Haridwar → Guptkashi",
        activities: [
          "Early morning departure",
          "Visit Dhari Devi Temple en route",
          "Drive along Alaknanda River",
          "Evening aarti at local temple"
        ],
        overnight: "Hotel in Guptkashi"
      },
      {
        title: "Kedarnath Darshan",
        description: "The divine darshan of Lord Kedarnath.",
        location: "Guptkashi → Kedarnath",
        activities: [
          "Early start to Sonprayag",
          "Trek/pony ride to Kedarnath",
          "Temple darshan and puja",
          "Explore temple surroundings"
        ],
        overnight: "Hotel in Kedarnath"
      },
      {
        title: "Kedarnath to Badrinath",
        description: "Journey from Kedarnath to Badrinath via scenic routes.",
        location: "Kedarnath → Badrinath",
        activities: [
          "Morning temple visit",
          "Return trek to Sonprayag",
          "Drive to Badrinath",
          "Evening aarti at Badrinath Temple"
        ],
        overnight: "Hotel in Badrinath"
      },
      {
        title: "Badrinath Temple & Local Sights",
        description: "Full day exploration of Badrinath and nearby attractions.",
        location: "Badrinath",
        activities: [
          "Early morning darshan",
          "Visit Mana Village",
          "Explore Vyas & Ganesh Caves",
          "Hot spring bath at Tapt Kund"
        ],
        overnight: "Hotel in Badrinath"
      },
      {
        title: "Return Journey",
        description: "Return journey with stops at significant places.",
        location: "Badrinath → Rishikesh",
        activities: [
          "Final temple darshan",
          "Drive to Rishikesh",
          "Visit Devprayag en route",
          "Evening rest and reflection"
        ],
        overnight: "Hotel in Rishikesh"
      },
      {
        title: "Departure",
        description: "Concluding day of your spiritual journey.",
        location: "Rishikesh → Departure",
        activities: [
          "Morning yoga session (optional)",
          "Visit local ashrams",
          "Souvenir shopping",
          "Transfer to departure point"
        ]
      }
    ]
  }
];