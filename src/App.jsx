import {AddItemForm, ItemsList} from "./components";
import {useEffect, useState} from "react";
import {clearAllItemsFromDB, deleteItem, getAllItems, saveItem, updateItem} from "./utils/database.js";

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getAllItems();
            setItems(allItems);
        }

        fetchItems();
    }, []);

    const addItem = async (newItem) => {
        await saveItem(newItem);
        setItems(await getAllItems());
    };

    const editItem = async (itemId, newItem) => {
        const updatedItem = {...newItem, id: itemId};
        await updateItem(updatedItem);
        setItems(await getAllItems());
    };

    const removeItem = async (itemId) => {
        await deleteItem(itemId);
        setItems(await getAllItems());
    };

    const clearAllItems = async () => {
        await clearAllItemsFromDB();
        setItems([]);
    };

    return (
        <main className={`flex justify-center items-center h-[100svh] p-2`}>
            <div className={`container bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xl w-full`}>
                <h1 className={`text-2xl font-semibold text-center text-indigo-600 mb-4`}>Shopping List</h1>
                <AddItemForm addItem={addItem}/>
                <ItemsList items={items} editItem={editItem} removeItem={removeItem} clearAllItems={clearAllItems}/>
            </div>
        </main>
    );
}

export default App;
