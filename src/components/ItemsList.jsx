import Item from "./Item.jsx";
import {useItems, useTheme} from "../hooks";

const ItemsList = () => {
    const {theme} = useTheme();
    const {items, clearAllItems} = useItems();

    return (
        <div>
            {items.length > 0 ? (
                <>
                    <ul id={`shopping-list`} className={`space-y-2`}>
                        {items?.map((item) => (
                            <Item key={item.id} item={item}/>
                        ))}
                    </ul>

                    <button
                        onClick={clearAllItems}
                        className={`btn w-full mt-4 ${theme === "dark" ? "bg-red-700 text-white hover:bg-red-800" : "bg-red-600 text-white hover:bg-red-700"} focus:outline-none focus:ring-2 focus:ring-red-600`}
                    >
                        Clear All
                    </button>
                </>
            ) : (
                <p className={`text-center `}>No Items in the list</p>
            )}
        </div>
    )
}

export default ItemsList;
