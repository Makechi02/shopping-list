import Item from "./Item.jsx";
import {useTheme} from "../context/ThemeContext.jsx";

const ItemsList = ({items, editItem, removeItem, clearAllItems}) => {
    const {theme} = useTheme();

    return (
        <div>
            <ul id={`shopping-list`} className={`space-y-2`}>
                {items?.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        editItem={editItem}
                        removeItem={removeItem}
                    />
                ))}
            </ul>

            <button
                onClick={clearAllItems}
                className={`w-full mt-4 px-4 py-2 rounded ${theme === "dark" ? "bg-red-700 text-white hover:bg-red-800" : "bg-red-600 text-white hover:bg-red-700"} focus:outline-none focus:ring-2 focus:ring-red-600`}
            >
                Clear All
            </button>
        </div>
    )
}

export default ItemsList;
