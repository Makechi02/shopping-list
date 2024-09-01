import {FaArrowLeft} from "react-icons/fa6";
import {Link} from "react-router-dom";

const BackBtn = ({theme}) => {
    return (
        <Link
            to={`/`}
            className={`btn ${theme === "dark" ? "bg-indigo-300 text-black hover:bg-indigo-400 focus:ring-indigo-300" : "bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-300"}`}
        >
            <FaArrowLeft />
        </Link>

    )
}

export default BackBtn;