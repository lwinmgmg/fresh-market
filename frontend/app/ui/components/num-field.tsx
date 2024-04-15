"use client";

import React, { ChangeEvent } from "react";
import { FieldParams } from "./field-params.type";
import FieldPara from "./field-para";
import FieldLabel from "./field-label";

export default function NumberField(params: FieldParams): React.ReactNode{
    const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
        if (params.setFun){
            const data: any = {};
            data[params.code] = e.target.value;
            params.setFun({...params.payload, ...data})
        }
    }
    return (
    <div className="grid grid-cols-2 relative w-full">
        <FieldLabel>{params.name}</FieldLabel>
        {
            params.isEdit ?
            (<input className="ml-2 py-2" type="number" onChange={onChange} readOnly={params.readOnly} value={params.payload[params.code]} />)
            : (<FieldPara value={params.payload[params.code]} />)
        }
    </div>
    );
}
