import {useTheme} from "../hooks/index.js";
import {Link} from "react-router-dom";
import ItemsList from "./ItemsList.jsx";

const Home = () => {
    const {theme} = useTheme();

    return (
        <>
            <div className={`page-container container ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <div className={`flex items-center justify-between mb-6`}>
                    <h1 className={`heading ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>Shopping List</h1>

                    <Link
                        to={`/add-item`}
                        className={`btn ${theme === "dark" ? "bg-indigo-400 text-black hover:bg-indigo-500 focus:ring-indigo-400" : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600"}`}
                    >
                        Add Item
                    </Link>
                </div>
                <ItemsList/>
            </div>
        </>
    )
}

export default Home;