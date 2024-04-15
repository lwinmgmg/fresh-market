import React from "react";

export default function Sheet({children}:{
    children: React.ReactNode
}){
    return (
        <div className="flex flex-col max-w-5xl p-10 rounded-md ring-1 space-y-5">
            {children}
        </div>
    );
}