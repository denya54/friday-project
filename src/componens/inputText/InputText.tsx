import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from './InputText.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    fieldName?: string
}

const InputText: React.FC<InputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        value, fieldName,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`

    const finalInputClassName = `${error ? s.errorInput : s.inputText} ${className}` // need to fix with (?:) and s.superInput

    return (
        <div className={s.inputText}>
            <div className={s.container}>
                <div className={s.input}>
                    <label className={s.title}>
                        <input
                            required
                            type={type}
                            placeholder="&nbsp;"
                            // {error ? 'error' : 'Email'}
                            onChange={onChangeCallback}
                            onKeyPress={onKeyPressCallback}
                            className={finalInputClassName}
                            value={value}
                            {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                        />
                        <span className={s.span}>{fieldName}</span>
                    </label>

                </div>
                <hr className={s.line}/>
            </div>
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>

    )
}

export default InputText
