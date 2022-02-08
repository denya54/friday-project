import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './MainButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type MainButtonPropsType = DefaultButtonPropsType & {
    cansel?: boolean
    disabled?: boolean
}

const MainButton: React.FC<MainButtonPropsType> = (
    {
        cansel, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${cansel ? s.cansel : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default MainButton
