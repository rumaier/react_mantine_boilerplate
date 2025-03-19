import { create } from "zustand";
import { fetchLuaTable } from "../utils/fetchLuaTable";
import { addInitialFetch } from "../utils/initialFetch";


export type UpgradeTier = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  [key: string]: unknown; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type UpgradeProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tiers: UpgradeTier[];
  [key: string]: unknown; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type UpgradeCategory = {
  name: string;
  icon: string;
  description: string;
}

type UpgradeSettingProps = {
  options: UpgradeProps[];
  categories: UpgradeCategory[];
} 


export const upgrades = create<UpgradeSettingProps>(() => ({
  options: [
    {
      id: 'electricSupply',
      name: 'Electric Supply',
      description: 'This is how your traphouse will recieve electricity, choose to go the dodgy route and risk a fire or police intervention, or go the legit route and pay a premium',   
      
      icon: 'fas fa-bolt',
      category: 'Utilities',
      tiers: [
        {
          id: 'dodgySupply',
          name: 'Dodgy Supply',
          description: 'You have got that ghetto electrician friend of yours to hook you up with some free electricity, but be careful, you might get caught',  
          price: 0,
          icon: 'fas fa-fire',
        },
        {
          id: 'legitSupply',
          name: 'Legit Supply',
          description: 'You have paid the premium to the power company to get a legit supply of electricity, no more worrying about fires or police',  
          price: 1000,
          icon: 'fas fa-bolt',
        },
        {
          id: 'industrialSupply',
          name: 'Industrial Supply',
          description: 'You have paid the premium to the power company to get a legit supply of electricity, no more worrying about fires or police',
          price: 1000,
          icon: 'fas fa-industry',
        }

      ],

    },

    {
      id: 'waterSupply',
      name: 'Water Supply',
      description: 'This is how your traphouse will recieve water, choose to go the dodgy route and risk a flood or police intervention, or go the legit route and pay a premium',
      
      icon: 'fas fa-tint',
      category: 'Utilities',
      tiers: [
        {
          id: 'dodgySupply',
          name: 'Dodgy Supply',
          description: 'You have a hose running from the fire hydrant to your house, but be careful, you might get caught', 
          price: 0,
          icon: 'fas fa-fire',
        },
        {
          id: 'legitSupply',
          name: 'Legit Supply',
          description: 'You have paid the premium to the water company to get a legit supply of water, no more worrying about floods or police', 
          price: 1000,
          icon: 'fas fa-tint',
        },
        {
          id: 'industrialSupply',
          name: 'Industrial Supply',
          description: 'You have paid the premium to the water company to get a legit supply of water, no more worrying about floods or police',
          price: 1000,
          icon: 'fas fa-industry',
        },
      ],
    },

    {
      id: 'internetSupply', 
      name: 'Internet Supply',
      description: 'This is how your traphouse will recieve internet, choose to go the dodgy route and risk a raid or police intervention, or go the legit route and pay a premium',
      
      icon: 'fas fa-wifi',
      category: 'Utilities',
      tiers: [
        {
          id: 'dodgySupply',
          name: 'Dodgy Supply',
          description: 'You are stealing the internet from your neighbour, but be careful, you might get caught', 
          price: 0,
          icon: 'fas fa-fire',
        },
        {
          id: 'legitSupply',
          name: 'Legit Supply',
          description: 'You have paid the premium to the internet company to get a legit supply of internet, no more worrying about raids or police', 
          price: 1000,
          icon: 'fas fa-wifi',
        },
        {
          id: 'industrialSupply',
          name: 'Industrial Supply',
          description: 'You have paid the premium to the internet company to get a legit supply of internet, no more worrying about raids or police',
          price: 1000,
          icon: 'fas fa-industry',
        },
      ],
    }, 

    {
      id: 'securityCamera',
      name: 'Camera',
      description: 'Keep scumbags and the law out of your traphouse with these security systems. Choose between a simple lock or a full on security system',  
      icon: 'fas fa-lock',
      category: 'Security',
      tiers:[
        {
          id: 'basicCamera',
          name: 'Basic Camera',
          description: 'You have installed security cameras around your traphouse, you can now see who is at your door',
          price: 1000,
          icon: 'fas fa-video',
        },
        {
          id: 'advancedCamera',
          name: 'Advanced Camera',
          description: 'You will get alerts for people coming/going from your traphouse',
          price: 2000,
          icon: 'fas fa-video',
        },
      ]
    },

    {
      id: 'stashSize',
      name: 'Stash Size',
      description: 'Increase the size of your stash to store more items',
      
      icon: 'fas fa-box',
      category: 'Generic',
      tiers: [
        {
          id: 'smallStash',
          name: 'Small Stash',
          description: 'You have a small stash to store items',
          price: 1000,
          icon: 'fas fa-box',
        },
        {
          id: 'mediumStash',
          name: 'Medium Stash',
          description: 'You have a medium stash to store items',
          price: 2000,
          icon: 'fas fa-box',
        },
        {
          id: 'largeStash',
          name: 'Large Stash',
          description: 'You have a large stash to store items',
          price: 3000,
          icon: 'fas fa-box',
        },
      ],
    },

    {
      id: 'doorShop',
      name: 'Door Shop',
      description: 'You can use this to have a store at your traphouse door that other players can buy from',
      owned: 0,
      icon: 'fas fa-store',
      category: 'Generic',
      tiers: [
        {
          id: 'basicShop',
          name: 'Basic Shop',
          description: 'You have a basic shop at your door',
          price: 1000,
          icon: 'fas fa-store',
        },
      ],
    }

  ],
  categories: [
    {
      name: 'Generic',
      icon: 'fas fa-lock',
      description: 'Security is how you keep your traphouse safe from scumbags and the law'
    },
    {
      name: 'Utilities',
      icon: 'fas fa-plug',
      description: 'Utilities are the services that your traphouse will use to function, choose wisely as some options may be more risky than others'
    },
    {
      name: 'Security',
      icon: 'fas fa-lock',
      description: 'Security is how you keep your traphouse safe from scumbags and the law'
    },

  ],
}));



addInitialFetch('fetchUpgrades', () => {
  fetchLuaTable<Partial<UpgradeSettingProps>>('extras/upgrades')()
  .then((data) => {
    upgrades.setState((prev) => ({ ...prev, ...data }));
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
