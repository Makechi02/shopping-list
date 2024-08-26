import {createContext, useEffect, useState} from "react";
import {clearAllItemsFromDB, deleteItem, getAllItems, saveItem, updateItem} from "../utils/database.js";

export const ItemsContext = createContext({});

const ItemsProvider = ({children}) => {

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
        <ItemsContext.Provider value={{items, addItem, editItem, removeItem, clearAllItems}}>
            {children}
        </ItemsContext.Provider>
    )
}

export default ItemsProvider;