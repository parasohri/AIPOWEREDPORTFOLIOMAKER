import {create} from 'zustand';
interface DataStore {
  data: Record<string, any>;
  fetchdata: (id: string) => Promise<void>;
}
export const useDataStore=create<DataStore>((set) => ({
    data:{},
  fetchdata:async(id)=>{
    
    const res=await fetch(`/api/fetchdata?id=${id}`);
     const result = await res.json();
    if (result?.project) {
      set({ data: result.project });
    } else {
      console.warn("Project not found or invalid response.");
    }
  
}}));