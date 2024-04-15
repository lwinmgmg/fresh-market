"use client";
import { Many2OneParams } from "./field-params.type";
import DropDown from "./drop-down";
import { useEffect, useState } from "react";
import FieldPara from "./field-para";
import FieldLabel from "./field-label";

export default function Many2One(params: Many2OneParams){
    const [currentItem, setCurrentItem] = useState<[number, string] | undefined>();
    const onSelect = (idx: number)=>{
        if (params.setFun){
            const data: any = {};
            data[params.code] = idx;
            params.setFun({...params.payload, ...data})
        }
    }
    const getData = async ()=>{
        let items: Array<[number, string]> = [];
        try{
            const resp = await fetch(params.path, {
                method: "GET"
            })
            if (resp.status === 200){
                const data = await resp.json();
                items = data.data.map((res:any)=>[res["id"], res[params.childCode]])
            }
        }catch (err){
            console.log(err);
        }
        return items
    }
    useEffect(()=>{
        if (params.payload[params.code]){
            const path = params.path + "/" + params.payload[params.code];
            fetch(path).then(resp=>resp.json()).then((data)=>{
                setCurrentItem([data["id"], data[params.childCode]]);
            })
        }else{
            setCurrentItem(undefined);
        }
    }, [params.payload[params.code]]);
    return (
        <div className="grid grid-cols-2 relative w-full">
            <FieldLabel>{params.name}</FieldLabel>
            {
                params.isEdit ?
                (<div className="mx-2"><DropDown getData={getData} currentValue={currentItem} onSelect={onSelect} /></div>)
                : (<FieldPara value={currentItem ? currentItem[1] : ""} />)
            }
        </div>
    );
}