import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getCards } from "../../bll/cardReducer"
import { AppRootStateType } from "../../bll/store"
import { CardType } from "../../dal/cardsAPI"
import s from "./Learn.module.css"

export const Learn = () => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

    const [card, setCard] = useState<CardType>({
        answer: "",
        question: "",
        cardsPack_id: "fake",
        grade: 0,
        shots: 0,
        user_id: "fake",
        created: "",
        updated: "",
        _id: "fake"
    })

    if (!isLogged) {
        return <Navigate to="/login"/>
    }
    return <div>
        <h2>Learn </h2>
        <p className={s.title}>Question:
            <span>"{card.question}"</span>
        </p>
        <p className={s.title}>Answer:
            <span>
          "{card.answer}"
        </span>
        </p>
    </div>
}