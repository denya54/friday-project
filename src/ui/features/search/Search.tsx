import React from "react"
import { useDispatch, useSelector } from "react-redux";
import {getPacks, setSearchField } from "../../../bll/packReducer";
import { AppRootStateType } from "../../../bll/store";
import InputText from "../../../componens/inputText/InputText";
import MainButton from "../../../componens/mainButton/MainButton";
import { PacksGetParams } from "../../../dal/packsAPI";

type SearchPropsType = {
    fetchData: (payload?: PacksGetParams) => any
}
export const Search = ({fetchData}: SearchPropsType) => {
    const searchField  = useSelector((state: AppRootStateType) => state.packs.searchField);
    const dispatch = useDispatch();

    const onChange = (value: string) => {
        dispatch (setSearchField(value))
        dispatch (fetchData())
    }
    return (
        <div>
           <InputText
               type="text"
               value={searchField}
               onChangeText={onChange}
           />
        </div>
    )
}