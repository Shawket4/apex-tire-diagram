import "@testing-library/jest-dom/vitest";

// Node 25+ ships its own `localStorage` global, which is undefined unless Node
// is started with --localstorage-file, and it hides jsdom's. Give the tests a
// plain in-memory one in that case.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();
  const memory: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (k) => store.get(k) ?? null,
    key: (i) => [...store.keys()][i] ?? null,
    removeItem: (k) => void store.delete(k),
    setItem: (k, v) => void store.set(k, String(v)),
  };
  Object.defineProperty(window, "localStorage", { value: memory, configurable: true });
}
