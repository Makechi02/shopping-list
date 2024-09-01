import {useTheme} from "./hooks/index.js";
import {Route, Routes} from "react-router-dom";
import {AddItemForm, EditItemForm, Home} from "./components";
import {FiMoon, FiSun} from "react-icons/fi";

function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <main className={`flex justify-center items-center min-h-[100svh] p-2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <Routes>
                <Route path={`/`} element={<Home/>}/>
                <Route path={`/add-item`} element={<AddItemForm/>}/>
                <Route path={`/edit-item/:id`} element={<EditItemForm/>} />
            </Routes>

            <button
                onClick={toggleTheme}
                className={`fixed bottom-8 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700`}
            >
                {theme === 'light' ? <FiMoon/> : <FiSun/>}
            </button>
        </main>
    );
}

export default App;
