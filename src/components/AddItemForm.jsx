import {useState} from "react";
import {useItems, useTheme} from "../hooks";
import {useNavigate} from "react-router-dom";
import BackBtn from "./BackBtn.jsx";
import {toast} from "react-toastify";

const AddItemForm = () => {
    const {theme} = useTheme();
    const {addItem, units} = useItems();

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [unit, setUnit] = useState('n/a');

    const navigate = useNavigate();

    const handleAddItem = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            toast.error("Item name can't be blank");
            return;
        }

        if (quantity?.trim() === '' || isNaN(quantity) || quantity <= 0) {
            toast.error("Please enter a valid item quantity");
            return;
        }

        addItem({name: name.trim(), quantity: quantity.trim(), unit, checked: false});

        setName("");
        setQuantity("");
        setUnit('n/a');
        toast.success("Item added successfully");
        navigate("/");
    }

    return (
        <div className={`page-container container ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <div className={`flex items-center mb-6`}>
                <BackBtn theme={theme}/>
                <h1 className={`heading text-center flex-grow ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>
                    Add Item
                </h1>
            </div>

            <form className={`flex flex-col space-y-3 mb-4`} onSubmit={handleAddItem}>
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    className={`input ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 focus:ring-indigo-400" : "bg-white text-black border-gray-300 focus:ring-indigo-600"}`}
                    aria-label="Item name"
                />

                <input
                    type="number"
                    placeholder="Enter item quantity"
                    value={quantity}
                    onChange={event => setQuantity(event.target.value)}
                    className={`input ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 focus:ring-indigo-400" : "bg-white text-black border-gray-300 focus:ring-indigo-600"}`}
                    aria-label="Item quantity"
                />

                <select
                    value={unit}
                    onChange={event => setUnit(event.target.value)}
                    className={`input ${theme === "dark" ? "bg-gray-800 text-white border-gray-600 focus:ring-indigo-400" : "bg-white text-black border-gray-300 focus:ring-indigo-600"}`}
                    aria-label="Item unit"
                >
                    {units.map(unit => (
                        <option key={unit.unit} value={unit.unit}>{unit.name}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className={`btn ${theme === "dark" ? "bg-indigo-400 text-black hover:bg-indigo-500 focus:ring-indigo-400" : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600"}`}
                    aria-label="Add item"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}

export default AddItemForm;
