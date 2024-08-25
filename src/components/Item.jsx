import {useEffect, useRef, useState} from "react";
import {FiCheck, FiEdit, FiTrash2} from "react-icons/fi";
import {Tooltip} from "react-tooltip";

const Item = ({item, editItem, removeItem}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.name);
    const inputRef = useRef(null);

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
            className={`flex justify-between items-center p-2 border-b border-gray-300 cursor-pointer`}
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
                    className={`flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-2`}
                />
            ) : (
                <span className={`flex-grow ${item.checked && 'line-through text-gray-500'}`}>{item.name}</span>
            )}

            <span className={`flex space-x-2`}>
                {!item.checked && (
                    <button
                        onClick={handleEdit}
                        className={`text-indigo-600 text-xl`}
                        data-tooltip-id={`icons-tooltip`}
                        data-tooltip-content={isEditing ? 'Save Changes' : 'Edit item'}
                    >
                        {isEditing ? <FiCheck/> : <FiEdit/>}
                    </button>
                )}
                <button
                    onClick={() => removeItem(item.id)}
                    className={`text-red-600 text-xl`}
                    data-tooltip-id={`icons-tooltip`}
                    data-tooltip-content={`Delete item`}
                >
                    <FiTrash2/>
                </button>
            </span>
            <Tooltip id={`icons-tooltip`} />
        </li>
    )
}

export default Item;