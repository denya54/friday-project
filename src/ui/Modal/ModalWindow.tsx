import s from './Modal.module.css'
import {useState} from "react";

type ModalPropsType = {
    active: boolean
    setActive: (isSee: boolean) => void
    children: any
}

export const ModalWindow = (props: ModalPropsType) => {

    //const [modalActive, setModalActive] = useState(false)
    // const changeModalActive = (isSee: boolean) => setModalActive(isSee)

    return (
        <>
        {props.active &&
        <div className={s.modal} onClick={() => props.setActive(false)}>

            <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>

        </div>}
        </>
)
}