import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Already exsits');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Been created');
    },
  });

// GET function
export const getDb = async (value) => {
  console.log('Getting data');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const store = tx.objectStore('jate');
  // use the .getAll() method to grab all the content in the DB
  const request =store.getAll()
  // confirm the data was fetched
  const response = await request;
  console.log('Saved data', response);
};

// PUT function
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const store = tx.objectStore('jate');
  // use the .add() method to pass in content
  const request = store.put({ id: id, value: value })
  // confirm the data was added
  const response = await request;
  console.log('n', response);
};


initdb();