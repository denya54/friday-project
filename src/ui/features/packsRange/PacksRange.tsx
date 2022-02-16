import { Slider } from '@mui/material';
import React, {useEffect, useState} from 'react';


type PacksRangePropsType = {
    minCardsCount: number
    maxCardsCount: number
    handleRangeChange: (values: number[]) => void
    cardsValuesFromRange: number[]
}

export const PacksRange = ({ minCardsCount, maxCardsCount, handleRangeChange, cardsValuesFromRange}: PacksRangePropsType) => {

    const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])
    const rangeMarks = {
        [minCardsCount]: {label: minCardsCount},
        [maxCardsCount]: {label: maxCardsCount},
    }

    const onRangeChange = (values: number[]) => {
        if (values[0] === rangeValues[0] && values[1] === rangeValues[1]) return
        setRangeValues(values);
        handleRangeChange(values)
    };

    useEffect(() => {
        setRangeValues([cardsValuesFromRange[0], cardsValuesFromRange[1]])
    }, [cardsValuesFromRange])

    return (
        <Slider
            value={rangeValues}
            onChange={()=>{}}
            valueLabelDisplay="auto"
        />
    )
}