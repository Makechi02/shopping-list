import {openDB} from 'idb';

const DB_NAME = 'ShoppingListDB';
const DB_VERSION = 1;
const STORE_NAME = 'items';

export async function initDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
}

export async function saveItem(item) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).add(item);
    await tx.done;
}

export async function getAllItems() {
    const db = await initDB();
    return db.getAll(STORE_NAME);
}

export async function updateItem(item) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).put(item);
    await tx.done;
}

export async function deleteItem(id) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).delete(id);
    await tx.done;
}

export async function clearAllItemsFromDB() {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).clear();
    await tx.done;
}
