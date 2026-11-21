export function readLocalStorage(key, fallback, isValid) {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue === null) return fallback;

    const value = JSON.parse(storedValue);
    if (!isValid(value)) {
      throw new Error(`Stored value for "${key}" has an invalid format.`);
    }

    return value;
  } catch (error) {
    console.error(`Unable to read "${key}" from local storage.`, error);
    return fallback;
  }
}

export function writeLocalStorage(key, value) {
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to write "${key}" to local storage.`, error);
  }
}
