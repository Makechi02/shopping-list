import {createContext, useEffect, useState} from "react";
import {clearAllItemsFromDB, deleteItem, getAllItems, getItemById, saveItem, updateItem} from "../utils/database.js";

export const ItemsContext = createContext({});

const ItemsProvider = ({children}) => {

    const [items, setItems] = useState([]);
    const [units ] = useState([
        {unit: "n/a", name: "No Unit"},
        {unit: "kg", name: "kilograms"},
        {unit: "g", name: "grams"},
        {unit: "L", name: "litres"},
        {unit: "ml", name: "millilitres"},
        {unit: "pcs", name: "pieces"},
        {unit: "pkt", name: "packets"},
    ]);

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

    const getItem = async (id) => {
        return await getItemById(id);
    }

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
        <ItemsContext.Provider value={{items, units, addItem, editItem, removeItem, clearAllItems, getItem}}>
            {children}
        </ItemsContext.Provider>
    )
}

export default ItemsProvider;