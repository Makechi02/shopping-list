import {useContext} from "react";
import {ItemsContext} from "../context";

export const useItems = () => useContext(ItemsContext);