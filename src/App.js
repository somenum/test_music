import React, {useEffect, useState} from "react";
import "./App.css";
import Form from "./components/Form/Form";
import axios from "axios";
import ElementItem from "./components/ElementItem/ElementItem";


const App = () => {
    const initialArray = ['A', 'B', 'C', 'D', 'E']
    const [list, setList] = useState(initialArray);

    const onChangeHandler = (e) => {
        axios.get("https://itunes.apple.com/search?term=" + e.target.value.toLowerCase())
            .then((response) => {
                const songs = response.data.results.map((item) => {
                    return item.collectionName;
                }).sort().slice(0, 5)
                console.log(songs);
                setList(songs)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changeArr = () => {
        let arr = [...list];
        const newArr = arr.concat(arr.shift());
        setList(newArr)
    }

    useEffect(() => {
        const interval = setInterval(changeArr, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [list])


    return (
        <div className="App">
            <Form onChange={onChangeHandler} placeholder="Search Band"/>
            <div className="content">
                <ol className="list">
                    {list.length && list.map((item) => (
                        <li key={item + Math.random()} className="list__item">
                            <ElementItem text={item}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default App;
