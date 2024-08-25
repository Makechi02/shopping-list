import {AddItemForm, ItemsList} from "./components";
import {useEffect, useState} from "react";

function App() {

    const [items, setItems] = useState([]);

    const addItem = (newItem) => {
        setItems([...items, newItem]);
    }

    const editItem = (itemIndex, newItem) => {
        const updatedItems = items.map((item, index) => (index === itemIndex ? newItem : item));
        setItems(updatedItems);
    }

    const removeItem = (itemIndex) => {
        const updatedItems = items.filter((_, index) => index !== itemIndex);
        setItems(updatedItems);
    }

    const clearAllItems = () => {
        setItems([]);
    }

    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <main className={`flex justify-center items-center h-screen`}>
            <div className={`container bg-white p-6 rounded-lg shadow-lg max-w-md w-full`}>
                <h1 className={`text-2xl font-semibold text-center text-indigo-600 mb-4`}>Shopping List</h1>
                <AddItemForm addItem={addItem} />
                <ItemsList items={items} editItem={editItem} removeItem={removeItem} clearAllItems={clearAllItems} />
            </div>
        </main>
    );
}

export default App;
