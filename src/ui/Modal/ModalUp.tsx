import React, {useEffect} from 'react';
import s from "./ModalUp.module.css";

type ModalUpPropsType = {
    active?: boolean
    setActive: (isSee: boolean) => void
    speed: number
}

interface IModalUp {
    speed?: number // 1 - fast; 100 - slow
}

export const ModalWindowUp = (props: ModalUpPropsType) => {
    const handleScroll = () => {
        debugger
        if (window.pageYOffset > 10) props.setActive(true);
        else props.setActive(false);
    };

    const scroll = () => {
        const step = window.pageYOffset / props.speed;
        let lastState = window.pageYOffset;

        const innerTimer = setInterval(() => {
            if (lastState < window.pageYOffset) clearInterval(innerTimer);
            lastState = window.pageYOffset;

            window.scroll(0, lastState - step);
            if (window.pageYOffset === 0) clearInterval(innerTimer);
        }, 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={s.modal}>

                <div className={s.modalContent} onClick={scroll}>
                    вверх
                </div>

            </div>
        </>
    )
}

// const ModalUp: React.FC<IModalUp> = ({speed = 10}) => {
//     const [active, setActive] = useState(false);
//
//     const handleScroll = () => {
//         if (window.pageYOffset > 300) setActive(true);
//         else setActive(false);
//     };
//
//     const scroll = () => {
//         const step = window.pageYOffset / speed;
//         let lastState = window.pageYOffset;
//
//         const innerTimer = setInterval(() => {
//             if (lastState < window.pageYOffset) clearInterval(innerTimer);
//             lastState = window.pageYOffset;
//
//             window.scroll(0, lastState - step);
//             if (window.pageYOffset === 0) clearInterval(innerTimer);
//         }, 50);
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//     }, []);
//
//     return (
//         <>
//             <div className={s.modal}>
//
//                 <div className={s.modalContent} onClick={scroll}>
//                     вверх
//                 </div>
//
//             </div>
//         </>
//     );
// };

// export default ModalUp;