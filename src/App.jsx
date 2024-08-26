import {AddItemForm, ItemsList} from "./components";
import {useEffect, useState} from "react";
import {clearAllItemsFromDB, deleteItem, getAllItems, saveItem, updateItem} from "./utils/database.js";
import {useTheme} from "./context/ThemeContext.jsx";
import {FiMoon, FiSun} from "react-icons/fi";

function App() {
    const [items, setItems] = useState([]);
    const {theme, toggleTheme} = useTheme();

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
        <main
            className={`flex justify-center items-center min-h-[100svh] p-2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <div
                className={`container p-4 sm:p-6 rounded-lg shadow-lg max-w-xl w-full ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <h1 className={`text-2xl font-semibold text-center mb-4 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>Shopping
                    List</h1>
                <AddItemForm addItem={addItem}/>
                <ItemsList items={items} editItem={editItem} removeItem={removeItem} clearAllItems={clearAllItems}/>
            </div>

            <button
                onClick={toggleTheme}
                className="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
            >
                {theme === 'light' ? <FiMoon/> : <FiSun/>}
            </button>
        </main>
    );
}

export default App;
