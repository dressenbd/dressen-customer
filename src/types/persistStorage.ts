interface PersistStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const createNoopStorage = (): PersistStorage => ({
  getItem: async (): Promise<string | null> => null,
  setItem: async (): Promise<void> => {},
  removeItem: async (): Promise<void> => {},
});

const createBrowserStorage = (): PersistStorage => {
  // Server-side rendering (Next.js) - return no-op storage
  if (typeof window === "undefined") {
    return createNoopStorage();
  }

  // Client-side - use localStorage directly
  return {
    getItem: async (key: string): Promise<string | null> => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },

    setItem: async (key: string, value: string): Promise<void> => {
      try {
        window.localStorage.setItem(key, value);
      } catch {}
    },

    removeItem: async (key: string): Promise<void> => {
      try {
        window.localStorage.removeItem(key);
      } catch {}
    },
  };
};

const persistStorage: PersistStorage = createBrowserStorage();
export default persistStorage;
