import { create, StateCreator } from 'zustand';
import { PergolaConfig } from '@/types';
import { materials, roofTypes } from '@/data/products';

interface ConfigState {
  config: PergolaConfig;
  setConfig: (newConfig: Partial<PergolaConfig>) => void;
}

const configStoreCreator: StateCreator<ConfigState> = (set) => ({
    config: {
        width: 3,
        length: 4,
        height: 2.5,
        material: materials[0].id,
        roofType: roofTypes[0].id,
        accessories: [],
      },
      setConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
});

const useConfigStore = create<ConfigState>(configStoreCreator);

export default useConfigStore; 