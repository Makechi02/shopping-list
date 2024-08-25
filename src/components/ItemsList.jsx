import Item from "./Item.jsx";

const ItemsList = ({items, editItem, removeItem, clearAllItems}) => {
    return (
        <div>
            <ul id={`shopping-list`} className={`space-y-2`}>
                {items?.map((item, index) => (
                    <Item
                        key={index}
                        index={index}
                        item={item}
                        editItem={editItem}
                        removeItem={removeItem}
                    />
                ))}
            </ul>

            <button
                onClick={clearAllItems}
                className={`w-full bg-red-600 text-white mt-4 px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600`}
            >
                Clear All
            </button>
        </div>
    )
}

export default ItemsList;