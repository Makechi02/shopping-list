import {FiEdit, FiTrash2} from "react-icons/fi";
import {Tooltip} from "react-tooltip";
import {useItems, useTheme} from "../hooks";
import {Link} from "react-router-dom";

const Item = ({item}) => {
    const {theme} = useTheme();
    const {editItem, removeItem} = useItems();

    const handleCheckItem = () => {
        const checkedItem = {...item, checked: !item.checked};
        editItem(item.id, checkedItem);
    }

    return (
        <li
            onDoubleClick={handleCheckItem}
            className={`flex justify-between items-center p-2 border-b cursor-pointer ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
        >
            <input
                type={`checkbox`}
                className={`mr-4`}
                checked={item.checked}
                onChange={handleCheckItem}
            />

            <span className={`flex-grow ${item.checked && 'line-through text-gray-500'}`}>
                {item.name}: {item.quantity} {item.unit === 'n/a' ? '' : item.unit}
            </span>

            <span className={`flex space-x-2`}>
                {!item.checked && (
                    <Link
                        to={`/edit-item/${item.id}`}
                        data-tooltip-id={`icons-tooltip`}
                        data-tooltip-content={'Edit item'}
                        className={`text-xl ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
                    >
                        <FiEdit/>
                    </Link>
                )}

                <button
                    onClick={() => removeItem(item.id)}
                    data-tooltip-id={`icons-tooltip`}
                    data-tooltip-content={`Delete item`}
                    className={`text-xl ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
                >
                    <FiTrash2/>
                </button>
            </span>
            <Tooltip id={`icons-tooltip`}/>
        </li>
    )
}

export default Item;