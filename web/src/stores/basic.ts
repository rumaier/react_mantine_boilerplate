import { create } from "zustand";
import { fetchLuaTable } from "../utils/fetchLuaTable";
import { addInitialFetch } from "../utils/initialFetch";

type BasicSettingsProps = {
  currency: string;
  costPerKey: number;
  allowManagers: boolean;
  costChangeLocks: number;
  groupAccess: boolean;
  transferOwnership: boolean;
  permissions: string[];
  accessGroups: string[];
} 


export const basic = create<BasicSettingsProps>(() => ({
  currency: '$',
  costPerKey: 100,
  costChangeLocks: 200,
  allowManagers: false,
  groupAccess: true,
  transferOwnership: true,
  accessGroups: [
    'Owner',
    'Manager',
    'Occupant',
  ],
  permissions: [
    'basic.name',
    'locks.operate',
    'locks.change',
    'locks.create',
    'upgrades.buy',
    'occupants.remove',
    'occupants.arm',
    'occupants.praise',
    'occupants.warn',
    'webhooks.edit',
    'sales.edit',
    'managers.remove',
    'managers.edit',
    'managers.add',
    'camera.view',
    'utility.pay',
  ],
}));

addInitialFetch('fetchBasic', () => {
  fetchLuaTable<Partial<BasicSettingsProps>>('basic')()
  .then((data) => {
    basic.setState((prev) => ({ ...prev, ...data }));
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
