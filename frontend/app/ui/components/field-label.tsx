import React from "react";

export default function FieldLabel({ children }:{
    children: React.ReactNode
}){
    return (
        <>
            <div className="absolute left-1/2 font-bold my-1">:</div>
            <h6 className="font-bold py-2">{children}</h6>
        </>
    );
}