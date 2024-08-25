import {useState} from "react";

const AddItemForm = ({addItem}) => {

    const [inputValue, setInputValue] = useState('');

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
                className={`flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            />
            <button
                type={`submit`}
                className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            >
                Add
            </button>
        </form>
    )
}

export default AddItemForm;