import { create } from "zustand";
import { addInitialFetch } from "../utils/initialFetch";
import { fetchLuaTable } from "../utils/fetchLuaTable";
export type LogProps = {
  id: string;
  name: string;
  icon: string;
}

type LogsProps = {
  allowCustomLogs    : boolean;
  webhookColor       : number;
  webhookImage       : string;
  defaultThumbnail   : string;
  logChannels        : LogProps[];
}


export const logs = create<LogsProps>(() => ({
  allowCustomLogs    : true, 
  webhookColor       : 16711680, 
  webhookImage       : "https://cdn.discordapp.com/attachments/790854126056636496/1142152922558365706/blank.png",
  defaultThumbnail   : "https://cdn.discordapp.com/attachments/790854126056636496/1142152922558365706/blank.png", 
  logChannels        : [
    {id : "generic",   name : "Generic",    icon : "user"},
    {id : "breakIn",   name : "Break Ins",  icon : "door-open"},
    {id : "funds",     name : "Funds",      icon : "dollar-sign"},
    {id : "raid",      name : "Raids",      icon : "bomb"},
    {id : "lock",      name : "Locks",      icon : "lock"},
    {id : "doorStock", name : "Door Sales", icon : "door-closed"}, 
    {id : "doorState", name : "Door States",icon : "door-closed"},
  ],
}));


addInitialFetch('fetchLogs', () => {
  fetchLuaTable<Partial<LogsProps>>('extras/webhooks')()
  .then((data) => {
    logs.setState((prev) => ({ ...prev, ...data }));
  })
  .catch((error) => {
    console.error('Error fetching table:', error);
  });
});
