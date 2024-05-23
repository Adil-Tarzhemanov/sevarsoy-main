import AppRouter from "./components/AppRouter";
import styles from './App.module.css'
import {useEffect, useState} from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки данных
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Замените это реальной загрузкой данных

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            {isLoading &&
                    <LoadingScreen />}
            <AppRouter />
        </div>
    )
}

export default App;
