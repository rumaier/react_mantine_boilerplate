import { create } from "zustand";
import { fetchLuaTable } from "../utils/fetchLuaTable";
import { addInitialFetch } from "../utils/initialFetch";

type OccupantSettingProps = {
  invSlots: number;            // How many slots should an occupant have in their inventory (DEFAULT 10)
  maxOccupants: number;        // How many occupants can a traphouse have at once (DEFAULT 10)
  recruitRange: number;        // How close does a player have to be to recruit an occupant (DEFAULT 50.0)
  permaDeath: boolean;         // If an occupant dies should they be removed from the traphouse? (DEFAULT true)
  loseRespectOnRob: number;    // How much respect should an occupant lose when they are robbed (DEFAULT 10)
  onlyLoseWithoutWep: boolean; // Should an occupant only lose respect if they are robbed when they aren't equipped with a weapon? (DEFAULT true)
  recruitChance: number;       // The chance of recruiting a new occupant (DEFAULT 50)
  stats: Array<{
    id: string;
    min: number;
    max: number;
    maxOnRecruit: number;
    icon: string;
  }>;
  restrictedItems: string[];   // Weapons or items that cannot be handed to your occupants
  names: {
    first: {
      male: string[];
      female: string[];
    };
    last: string[];
  };
  randomAnimations: string[];   // List of animation dicts for random animations
};

export const occupants = create<OccupantSettingProps>(() => ({
  invSlots: 12, 
  maxOccupants: 10,
  recruitRange: 150.0,
  permaDeath: true,
  loseRespectOnRob: 10,
  onlyLoseWithoutWep: true,
  recruitChance: 100,
  stats: [
    { id: "streetSmart", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-fist-raised" },
    { id: "shooting", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-crosshairs" },
    { id: "mechanic", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-car" },
    { id: "chemistry", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-user-secret" },
    { id: "herbology", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-leaf" },
    { id: "strength", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-dumbbell" },
    { id: "stamina", min: 1, max: 100, maxOnRecruit: 25, icon: "fas fa-running" }
  ],
  restrictedItems: [
    // Add restricted items here
  ],
  names: {
    first: {
      male: [
        "Liam", "Jackson", "John", "Jake", "William", "James", "Ethan", "Benjamin", "Henry", "Alexander",
        "Daniel", "Matthew", "David", "Andrew", "Joseph", "Logan", "Ryan", "Noah", "Samuel", "Christopher",
        "Nathan", "Isaac", "Elijah", "Caleb", "Mason", "Michael", "Aiden", "Jayden", "Dylan", "Evan",
        "Nicholas", "Brandon", "Tyler", "Jacob", "Zachary", "Gavin", "Connor", "Aiden", "Luke", "Cameron",
        "Owen", "Jackson", "Gabriel", "Carter", "Jayce", "Hunter", "Adrian", "Jonathan", "Nolan", "Christian",
        "Cole", "Dominic", "Colton", "Ezra", "Jordan", "Justin", "Levi", "Landon", "Jaxon", "Asher",
        "Bentley", "Xavier", "Tristan", "Sebastian", "Wyatt", "Julian", "Jase", "Leo", "Brayden", "Silas"
      ],
      female: [
        "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Amelia", "Harper", "Evelyn", "Abigail",
        "Emily", "Elizabeth", "Mila", "Ella", "Scarlett", "Grace", "Chloe", "Lily", "Aria", "Aubrey",
        "Layla", "Zoe", "Hannah", "Avery", "Sofia", "Camila", "Eleanor", "Aurora", "Victoria", "Penelope",
        "Nora", "Addison", "Stella", "Bella", "Natalie", "Zara", "Luna", "Savannah", "Maya", "Aaliyah",
        "Autumn", "Hailey", "Gianna", "Isabelle", "Eliana", "Ariana", "Mackenzie", "Peyton", "Claire",
        "Skylar", "Aubree", "Kylie", "Madison", "Lillian", "Nova", "Eva", "Leah", "Hazel", "Alyssa",
        "Annabelle", "Kinsley", "Sadie", "Willow", "Piper", "Naomi", "Alice", "Stella", "Rose", "Arianna"
      ]
    },
    last: [
      "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
      "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
      "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
      "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
      "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
      "Stewart", "Cooper", "Howard", "Reed", "Bailey", "Reynolds", "Harrison", "Fisher", "Pearson", "Gibson",
      "Warren", "Crawford", "Porter", "Payne", "Wheeler", "Dixon", "Morton", "Gardner", "Stokes", "Obrien"
    ]
  },
  randomAnimations: [
    "WORLD_HUMAN_SMOKING",
    "WORLD_HUMAN_DRINKING",
    "WORLD_HUMAN_SIT_UPRIGHT",
    "WORLD_HUMAN_PICNIC",
    "WORLD_HUMAN_BUM_STANDING",
    "WORLD_HUMAN_SEAT_WALL",
    "WORLD_HUMAN_CAR_PARK_ATTENDANT",
    "WORLD_HUMAN_MEDITATE",
    "WORLD_HUMAN_TOURIST_MAP",
    "WORLD_HUMAN_GUARD_STAND",
    "WORLD_HUMAN_LEANING",
    "WORLD_HUMAN_STAND_MOBILE",
    "WORLD_HUMAN_STAND_WATCHING",
    "WORLD_HUMAN_PARTYING",
    "WORLD_HUMAN_HANG_OUT_STREET",
    "WORLD_HUMAN_DRINKING_COFFEE",
    "WORLD_HUMAN_YOGA",
    "WORLD_HUMAN_SEAT_BENCH",
    "WORLD_HUMAN_CROSS_ROAD",
    "WORLD_HUMAN_BAND_STANDING",
    "WORLD_HUMAN_SUNBATHE"
  ]
}));



addInitialFetch('fetchOccupants', () => {
  fetchLuaTable<Partial<OccupantSettingProps>>('basic')()
  .then((data) => {
    occupants.setState((prev) => ({ ...prev, ...data }));
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
