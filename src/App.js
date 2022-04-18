import React, {useCallback, useEffect, useState} from "react";
import _debounce from 'lodash/debounce';
import "./App.css";
import Form from "./components/Form/Form";
import axios from "axios";


const App = () => {
    const initialArray = ['A', 'B', 'C', 'D', 'E']
    const [list, setList] = useState(initialArray);

    const handleDebounceFn = (inputValue) => {
        axios.get("https://itunes.apple.com/search?term=" + inputValue.toLowerCase())
            .then((response) => {
                const songs = response.data.results.map((item) => {
                    return item.collectionName;
                }).sort().slice(0, 5)
                setList(songs)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
    function onChangeHandler (event) {
        debounceFn(event.target.value);
    };

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
                            <div
                                className="item__container"
                            >
                                {item}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default App;
