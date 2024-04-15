import React from "react";

export default function Group({children}:{
    children: React.ReactNode
}){
    return (
        <div className="grid grid-cols-2 gap-2">
            {children}
        </div>
    );
}