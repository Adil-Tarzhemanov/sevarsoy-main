import styles from './styles.module.scss'
import React, {FC} from "react"

interface RoomTypesProps {
    setRoomType: (roomType: string) => void;
}

const RoomTypes: FC<RoomTypesProps> = ({ setRoomType }) => {

    return (
        <div className={styles.container}>
            <div className={styles.roomTypesHead}>Выберите номер:</div>
            <div className={styles.roomTypesList}>
                <button onClick={() => setRoomType('Standard')}>Стандартный</button>
                <button onClick={() => setRoomType('Luxe')}>Люкс</button>
                <button onClick={() => setRoomType('Deluxe')}>Делюкс</button>
            </div>
        </div>
    )
}

export default RoomTypes;