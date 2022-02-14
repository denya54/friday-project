import React, { useState } from "react"
import {useDispatch, useSelector } from "react-redux";
import {getPacks, setPage, setPageCount } from "../../bll/packReducer";
import { AppRootStateType } from "../../bll/store";
import s from "./Paginator.module.css"


export const Paginator = ()=> {
    const dispatch = useDispatch()

    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppRootStateType, number>(state=> state.packs.pageCount)
    const page = useSelector<AppRootStateType, number> (state => state.packs.page)

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 5
    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNumber = portionNumber * portionSize
    
    const onPageChanged = (p: number) => {
        dispatch(setPage(p))
        dispatch(getPacks())
    }
    const onSelectChanged = (pageCount: string) => {
        dispatch(setPageCount(Number(pageCount)))
        dispatch(getPacks())
    }
    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <span className={s.paginatorBtn} onClick={()=> {setPortionNumber(portionNumber-1)}}>{`<`}</span> }
        {pages
            .filter(p => p >= leftPortionNumber && p<=rightPortionNumber)
            .map(p => <span className={page === p ? s.active: s.pageNumber}
                            key={p}
                            onClick={() => {
                                onPageChanged(p)
                            }}
            >{p}</span> )}
        { portionCount > portionNumber &&
        <span className={s.paginatorBtn} onClick={()=> {setPortionNumber(portionNumber + 1)}}>{`>`}</span> }

        <span className={s.selectPageSize}>Показывать
            <select onChange={(e)=> onSelectChanged(e.currentTarget.value)}>
                <option value="4" selected={pageCount===4}>4</option>
                <option value="10" selected={pageCount===10}>10</option>
                <option value="20" selected={pageCount===20}>20</option>
                <option value="100" selected={pageCount===100}>100</option>
            </select> колод на странице</span>
    </div>
}