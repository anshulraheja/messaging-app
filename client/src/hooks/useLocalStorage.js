import {useEffect, useState} from 'react'

const PREFIX = 'messaging-app-'

const useLocalStorage = (key, initialValue) => {

    //get value from local storage and put in the state
    const prefixedKey = PREFIX+key    
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue!= null ) return JSON.parse(jsonValue);
        if(typeof jsonValue ==='function'){
            return initialValue();
        }
        else{
            return initialValue;
        }
    })

    //get value and save in the local storage
    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey,value])

    return [value, setValue];
}

export default useLocalStorage
