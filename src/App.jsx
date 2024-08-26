import {AddItemForm, ItemsList} from "./components";
import {FiMoon, FiSun} from "react-icons/fi";
import {useTheme} from "./hooks/index.js";

function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <main
            className={`flex justify-center items-center min-h-[100svh] p-2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <div
                className={`container p-4 sm:p-6 rounded-lg shadow-lg max-w-xl w-full ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <h1 className={`text-2xl font-semibold text-center mb-4 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>Shopping
                    List</h1>
                <AddItemForm/>
                <ItemsList/>
            </div>

            <button
                onClick={toggleTheme}
                className="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
            >
                {theme === 'light' ? <FiMoon/> : <FiSun/>}
            </button>
        </main>
    );
}

export default App;
