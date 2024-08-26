import {useState} from "react";
import {useTheme} from "../context/ThemeContext.jsx";

const AddItemForm = ({addItem}) => {
    const [inputValue, setInputValue] = useState('');
    const {theme} = useTheme();

    const handleAddItem = (e) => {
        e.preventDefault();

        if (inputValue.trim() !== '') {
            addItem({name: inputValue.trim(), checked: false});
            setInputValue("");
        }
    }

    return (
        <form className={`input container flex space-x-2 mb-4`} onSubmit={handleAddItem}>
            <input
                type={`text`}
                placeholder={`Add a new Item`}
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                className={`flex-grow p-2 border rounded focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 focus:ring-indigo-400" : "bg-white text-black border-gray-300 focus:ring-indigo-600"}`}
            />
            <button
                type={`submit`}
                className={`px-4 py-2 rounded focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-indigo-400 text-black hover:bg-indigo-500 focus:ring-indigo-400" : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600"}`}
            >
                Add
            </button>
        </form>
    )
}

export default AddItemForm;