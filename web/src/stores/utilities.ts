import { create } from "zustand";
import { fetchLuaTable } from "../utils/fetchLuaTable";
import { addInitialFetch } from "../utils/initialFetch";



export type UtilityProps = {
  id: string;
  name: string;
  icon: string;
  unit: string;
}

export const utilities = create<UtilityProps[]>(() => ([
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'fas fa-bolt',
    unit: 'kWh'
  },
  {
    id: 'water',
    name: 'Water',
    icon: 'fas fa-tint',
    unit: 'L'
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: 'fas fa-wifi',
    unit: 'Mbps'
  }
]));

addInitialFetch('fetchUtilities', () => {
  fetchLuaTable<Partial<UtilityProps[]>>('extras/utilities')()
  .then((data) => {
    utilities.setState(data);
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
