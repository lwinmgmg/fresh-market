"use client";

import FormViewButtons from "@/app/ui/components/form-view/buttons";
import Group from "@/app/ui/components/group";
import Sheet from "@/app/ui/components/sheet";
import StrField from "@/app/ui/components/str-field";
import TextField from "@/app/ui/components/text-field";
import Error from "next/error";
import { useEffect, useState } from "react";

export default function Product({ params: {slug} }:{
    params: {
        slug: string
    }
}){
    const path = "http://10.10.10.50:5000/api/rest/products"
    const onePath = path + "/" + slug;
    var [oldPayload, setOldPayload] = useState({});
    const [payload, setPayload] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [reqStatus, setReqStatus] = useState(200);
    const changeEdit = ()=>{
        setIsEdit(!isEdit);
    }
    useEffect(()=>{
        fetch(onePath).then(resp=>{
            setReqStatus(resp.status);
            return resp.json()
        }).then((data: any)=>{
            setPayload(data);
            setOldPayload({...data});
        }).catch(err=>{
        throw err
        })
    }, [isEdit]);
    return reqStatus ===200 ? (
        <main className="flex min-h-screen flex-col items-center p-20">
        <FormViewButtons path={onePath} payload={payload} oldPayload={oldPayload} changeEdit={changeEdit} isEdit={isEdit} />
        <Sheet>
            <Group>
                <div className="space-y-2">
                    <StrField name="Product Name" code="name" payload={payload} setFun={setPayload} isEdit={isEdit}/>
                    <TextField name="Description" code="description" payload={payload} setFun={setPayload} isEdit={isEdit}/>
                </div>
                <div className="space-y-2">
                    <StrField name="Created At" code="createdAt" payload={payload} setFun={setPayload} readOnly/>
                    <StrField name="Updated At" code="updatedAt" payload={payload} setFun={setPayload} readOnly/>
                </div>
            </Group>
        </Sheet>
        </main>
    ) : <Error statusCode={reqStatus} />;
}