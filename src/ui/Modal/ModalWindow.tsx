import s from './Modal.module.css'

type ModalPropsType = {
    active: boolean
    setActive: (isSee: boolean) => void
    children: any
}

export const ModalWindow = (props: ModalPropsType) => {

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