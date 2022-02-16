import React, {ChangeEvent, useState} from "react"
import {getPacks, setPage, setPageCount} from "../../../bll/packReducer";
import {AppRootStateType} from "../../../bll/store";
import s from "./Paginator.module.css"

type PaginatorPropsType = {
    totalCount: number
    pageCount: number
    onPageChanged: (page: number) => void
    currentPage: number
    selectedPageSize: number
    changePageSize: (option: number) => void
    pageSizes: number[]
}

export const Paginator = ({
                              totalCount, pageCount, onPageChanged,
                              currentPage, pageSizes, selectedPageSize,
                              changePageSize
                          }: PaginatorPropsType) => {

    let pagesCount = Math.ceil(totalCount / pageCount);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 5
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNumber = portionNumber * portionSize

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const option = +e.currentTarget.value
        changePageSize(option)
    }
    const mappedOptions = pageSizes.map((o, i) => (
        <option key={i} value={o}>
            {o}
        </option>
    ))
    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <span className={s.paginatorBtn} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>{`<`}</span>}
        {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map(p => <span className={currentPage === p ? s.active : s.pageNumber}
                            key={p}
                            onClick={() => {
                                onPageChanged(p)
                            }}
            >{p}</span>)}
        {portionCount > portionNumber &&
        <span className={s.paginatorBtn} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>{`>`}
        </span>}

        <span className={s.selectPageSize}>Показывать
            <select onChange={onSelectChange} value={selectedPageSize}>
                {mappedOptions}
            </select> колод на странице
        </span>

    </div>
}