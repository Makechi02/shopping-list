import {useEffect, useRef, useState} from "react";
import {FiCheck, FiEdit, FiTrash2} from "react-icons/fi";
import {Tooltip} from "react-tooltip";
import {useTheme} from "../context/ThemeContext.jsx";

const Item = ({item, editItem, removeItem}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.name);
    const inputRef = useRef(null);
    const {theme} = useTheme();

    const handleEdit = () => {
        if (isEditing) {
            editItem(item.id, {name: editValue});
        }

        setIsEditing(prevState => !prevState);
    }

    const handleCheckItem = () => {
        const checkedItem = {...item, checked: !item.checked};
        editItem(item.id, checkedItem);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    }

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

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

            {isEditing ? (
                <input
                    ref={inputRef}
                    value={editValue}
                    onKeyDown={handleKeyPress}
                    onChange={event => setEditValue(event.target.value)}
                    className={`flex-grow p-2 border rounded focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white" : "bg-white border-gray-300 focus:ring-indigo-600 text-black"} mr-2`}
                />
            ) : (
                <span className={`flex-grow ${item.checked && 'line-through text-gray-500'}`}>{item.name}</span>
            )}

            <span className={`flex space-x-2`}>
                {!item.checked && (
                    <button
                        onClick={handleEdit}
                        data-tooltip-id={`icons-tooltip`}
                        data-tooltip-content={isEditing ? 'Save Changes' : 'Edit item'}
                        className={`text-xl ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}
                    >
                        {isEditing ? <FiCheck/> : <FiEdit/>}
                    </button>
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