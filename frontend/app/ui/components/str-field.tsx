"use client";

import React, { ChangeEvent } from "react";
import { TextFieldParams } from "./field-params.type";
import FieldPara from "./field-para";
import FieldLabel from "./field-label";

export default function StrField(params: TextFieldParams): React.ReactNode{
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
            (<input className="mx-2 px-2 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" type={params.isSecret ? "password":"text"} onChange={onChange} readOnly={params.readOnly} value={params.payload[params.code] || ""} />)
            : (<FieldPara value={params.payload[params.code]} />)
        }
    </div>
    );
}
