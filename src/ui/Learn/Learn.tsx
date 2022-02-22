import { FormControl, FormControlLabel, FormLabel, RadioGroup } from "@mui/material"
import Radio from "@mui/material/Radio"
import React, {ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { RequestStatusType } from "../../bll/appReducer"
import { changePageCount, getCards, gradeAnswer } from "../../bll/cardReducer"
import { AppRootStateType } from "../../bll/store"
import CancelButton from "../../componens/canсelButton/CancelButton"
import MainButton from "../../componens/mainButton/MainButton"
import { CardType } from "../../dal/cardsAPI"
import s from "./Learn.module.css"

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const Learn = () => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {name} = useParams()



    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [gradeNumber, setGradeNumber] = useState<number | null>(null);
    const [answer, setAnswer] = useState('')

    const gradeHandle = (card_id: string, grade: number) => {
        dispatch(gradeAnswer({card_id, grade}))
        cards.length > 0 && setCard(getCard(cards))
        setAnswer('')
        setIsChecked(false)
    }
    const onChangeRadioHandle = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        setAnswer(e.currentTarget.value)
        setGradeNumber(i)
        setIsChecked(true)

    };

    const [card, setCard] = useState<CardType>({
        answer: "",
        question: "",
        cardsPack_id: "",
        grade: 0,
        shots: 0,
        user_id: "",
        created: "",
        updated: "",
        _id: ""
    })

    useEffect(() => {
        if (first) {
            dispatch(changePageCount(150))
            dispatch(getCards())
            setFirst(false)
        }
        if (cards.length > 0) setCard(getCard(cards))
        return () => {}
    }, [dispatch, cards, first])

        const onNext = () => {
            gradeHandle(card._id, gradeNumber ? gradeNumber + 1 : 1)
        }

    if (!isLogged) {
        return <Navigate to="/login"/>
    }
    return <div>
        <h2> Изучать "{name}" </h2>
        <p className={s.title}> Вопрос:
            <span>"{card.question}"</span>
        </p>
        <p className={s.title}> Ответ:
            <span>
          "{card.answer}"
        </span>
        </p>

            <FormControl>
            <FormLabel>Оцени себя</FormLabel>
            <RadioGroup name="grade-buttons">
                {grades.map((grade, i) => (<FormControlLabel key={i}
                                                             value={grade}
                                                             control={
                                                                 <Radio checked={grade === answer}
                                                                        onChange={(e) => onChangeRadioHandle(e, i)}
                                                                 />}
                                                             label={grade}/>))

                }

            </RadioGroup>
            </FormControl>


        <div>
            <MainButton onClick={onNext} disabled={status === "loading"}> Next </MainButton>
            <CancelButton onClick={()=>{navigate('/packs', {replace: true})}}> Cansel </CancelButton>
        </div>
    </div>
}