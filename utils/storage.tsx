import AsyncStorage from '@react-native-async-storage/async-storage';

export const prefix = 'kikeva';

export const Storage = {
  setItem: async (key: string, value: string) => {
    try {
      const k = `${prefix}:${key}`;
      const v = {data: value};

      await AsyncStorage.setItem(k, JSON.stringify(v));

      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: async (key: string, defaultValue = false) => {
    try {
      const value = await AsyncStorage.getItem(`${prefix}:${key}`);
      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value).data;
    } catch (error) {
      return defaultValue;
    }
  },
};