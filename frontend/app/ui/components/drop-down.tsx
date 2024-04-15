"use client";
import { checkIsChild } from "@/app/lib/check-is-child";
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";

export default function DropDown({
    currentValue,
    getData,
    onSelect
}:{
    currentValue?: [number, string],
    getData: ()=>Promise<Array<[number, string]>>,
    onSelect: (recordId: number)=>void
}){

    const parentDiv = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<Array<[number, string]>>([]);
    const removeEventListeners = ()=>{
        document.removeEventListener("keyup", watchEscEvent, true);
        document.removeEventListener("click", watchClick, true);
    }
    const addEventListeners = ()=>{
        document.addEventListener("keyup", watchEscEvent, true);
        document.addEventListener("click", watchClick, true);
    }
    
    const onClickItem = (e: MouseEvent<HTMLAnchorElement>, idx: number)=>{
        onSelect(idx);
        setIsOpen(false);
    }
    const changeIsOpen = async ()=>{
        setIsOpen(!isOpen);
        setItems(await getData());
        addEventListeners()
    }
    const onSeeMore = (e: MouseEvent<HTMLAnchorElement>)=>{
        console.log("On See More");
    }
    const watchEscEvent = (e: KeyboardEvent)=>{
        if (e.key === "Escape"){
            setIsOpen(false);
        }
    };
    const onSearch = (e: ChangeEvent<HTMLInputElement>)=>{

    }
    const watchClick = (e: any)=>{
        if (parentDiv.current){
            if (!checkIsChild(parentDiv.current, e.target)){
                setIsOpen(false);
            }
        }
    }
    useEffect(()=>{
        return ()=>{
            removeEventListeners()
        }
    }, [parentDiv])
    useEffect(()=>{
        if (!isOpen){
            removeEventListeners()
        }
    }, [isOpen])

    return (
    <div className="relative w-full" ref={parentDiv}>
        <button onClick={changeIsOpen} className="w-full ring-1 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center" type="button">
            <p className="truncate">
                {currentValue ? currentValue[1] : (<span className="text-gray-300">Select One</span>)}
            </p>
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>

        <div hidden={!isOpen} className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute top-full">
        <div className="p-3">
            <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={onSearch} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search" />
            </div>
            </div>
            <ul className="py-2 text-sm text-gray-700">
                {
                    items.map(([idx, name])=>{
                        return (
                        <li key={idx}>
                            <a onClick={(e)=>onClickItem(e, idx)} className="block px-4 py-2 hover:bg-gray-100 hover:cursor-pointer truncate">{name}</a>
                        </li>)
                    })
                }
            </ul>
            <div className="py-2">
            <a onClick={onSeeMore} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer">See More</a>
            </div>
        </div>
    </div>
    );
}