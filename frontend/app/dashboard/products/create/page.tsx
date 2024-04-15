"use client";

import FormViewButtons from "@/app/ui/components/form-view/buttons";
import Group from "@/app/ui/components/group";
import Sheet from "@/app/ui/components/sheet";
import StrField from "@/app/ui/components/str-field";
import TextField from "@/app/ui/components/text-field";
import { useState } from "react";

export default function Product({ params: {slug} }:{
    params: {
        slug: string
    }
}){
    const path = "http://10.10.10.50:5000/api/rest/products"
    var [oldPayload, setOldPayload] = useState({});
    const [payload, setPayload] = useState({});
    const [isEdit, setIsEdit] = useState(true);
    const changeEdit = ()=>{
        setIsEdit(!isEdit);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-20">
        <FormViewButtons path={path} payload={payload} oldPayload={oldPayload} changeEdit={changeEdit} method="POST" isEdit={isEdit} />
        <Sheet>
            <Group>
                <div className="space-y-2">
                    <StrField name="Product Name" code="name" payload={payload} setFun={setPayload} isEdit={isEdit}/>
                </div>
                <div className="space-y-2">
                    <TextField name="Description" code="description" payload={payload} setFun={setPayload} isEdit={isEdit}/>
                </div>
            </Group>
        </Sheet>
        </main>
    )
}