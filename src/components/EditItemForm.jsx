import {useEffect, useState} from "react";
import {useItems, useTheme} from "../hooks";
import {useNavigate, useParams} from "react-router-dom";
import BackBtn from "./BackBtn.jsx";
import {toast} from "react-toastify";

const EditItemForm = () => {
    const {theme} = useTheme();
    const {getItem, units, editItem} = useItems();

    const {id} = useParams();

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [itemUnit, setItemUnit] = useState('');

    const navigate = useNavigate();

    const handleEditItem = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            toast.error("Item name can't be blank");
            return;
        }

        if (quantity?.trim() === '' || isNaN(quantity) || quantity <= 0) {
            toast.error("Please enter a valid item quantity");
            return;
        }

        editItem(Number(id), {name: name.trim(), quantity: quantity.trim(), unit: itemUnit, checked: false});

        setName("");
        setQuantity("");
        setItemUnit('n/a');
        toast.success("Item updated successfully");
        navigate("/");
    }

    useEffect(() => {
        const fetchItem = async () => {
            const fetchedItem = await getItem(id);
            setName(fetchedItem.name);
            setQuantity(fetchedItem.quantity);
            setItemUnit(fetchedItem.unit);
        }

        fetchItem();
    }, []);

    return (
        <div className={`page-container container ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <div className={`flex items-center mb-6`}>
                <BackBtn theme={theme}/>
                <h1 className={`heading text-center flex-grow ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>Edit
                    Item</h1>
            </div>

            <form className="container flex flex-col space-y-3 mb-4" onSubmit={handleEditItem}>
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
                    value={itemUnit}
                    onChange={event => setItemUnit(event.target.value)}
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
                    Update Item
                </button>
            </form>
        </div>
    );
}

export default EditItemForm;
