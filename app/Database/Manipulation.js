import * as db from 'expo-sqlite';

const file = db.openDatabase('data.db');

export async function createThemeTable() {
  file.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS theme (activeTheme BOOL PRIMARY KEY);
      INSERT INTO theme (activeTheme) VALUES (TRUE); 
      `,
      null,
      () => console.log('theme table active'),
      (e) => console.error('err in createThemeTable', e)
    );
  });
}

export async function saveTheme(themeValue) {
  file.transaction((tx) => {
    tx.executeSql(
      'UPDATE theme SET activeTheme = ?',
      [themeValue],
      () => console.log('activeTheme was updated to', themeValue),
      (e) => console.error('err in saveTheme ', e)
    );
  });
}

export async function readTheme() {
  return new Promise((resolve, reject) => {
    file.transaction((tx) => {
      tx.executeSql(
        'SELECT activeTheme FROM theme',
        null,
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (e) => {
          console.error('err in readTheme ', e);
          reject(e);
        }
      );
    });
  });
}
