import React, {useState} from 'react'
import { GoSearch } from 'react-icons/go'
import { useStateContext } from '../Contexts/ContextProvider';
import Table from './Table'

const SearchBar = ({placeHolder, data, searchClass, inputClass}) => {
    const {currentColor} = useStateContext();
    const [query, setQuery] = useState('');
    const Search = (data) => {
        const arr = Object.keys(data.data[0])
        return data.filter((item) => 
        arr.some(key => item[key].toLowerCase().include(query)) )
    };
    console.log(data);
    return (
            <div className={`flex relative bg-white dark:bg-gray-900 rounded-md  items-center focus-within:outline focus-within:outline-blue-600 focus-within:outline-2 ${searchClass}`}>
                <button className='absolute inset-y-0 left-0 flex items-center pl-2 bg-transparent' style={{color: currentColor }}><GoSearch/></button>
                <input type='text' placeholder={placeHolder} 
                onChange={(e) => setQuery(e.target.value)}
                className={`text-sm rounded-md w-full focus:outline-none focus:shadow-outline dark:text-white text-gray-900 bg-transparent ${inputClass}`} />
                {/*{data ? (
                    <Table data={data} />
                ): (<>Halo</>)}*/}
                
            </div>
    )
}

export default SearchBar;