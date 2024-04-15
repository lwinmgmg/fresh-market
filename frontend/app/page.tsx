"use client";

import TextField from "./ui/components/str-field";
import Group from "./ui/components/group";
import { useEffect, useState } from "react";
import Sheet from "./ui/components/sheet";
import Many2One from "./ui/components/many2one-field";
import FormViewButtons from "./ui/components/form-view/buttons";

export default function Home() {
  const path = "http://10.10.10.50:5000/api/rest/products" + "/2"
  var [oldPayload, setOldPayload] = useState({});
  const [payload, setPayload] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const changeEdit = ()=>{
    setIsEdit(!isEdit);
  }
  useEffect(()=>{
    fetch(path).then(resp=>resp.json()).then((data: any)=>{
      setPayload(data);
      setOldPayload({...data});
    }).catch(err=>{
      throw err
    })
  }, [isEdit]);
  return (
    <main className="flex min-h-screen flex-col items-center p-20">
      <FormViewButtons path={path} payload={payload} oldPayload={oldPayload} changeEdit={changeEdit} isEdit={isEdit} />
      <Sheet>
        <Group>
          <div className="space-y-2">
            <TextField name="Product Name" code="name" payload={payload} setFun={setPayload} isEdit={isEdit}/>
            <TextField name="Description" code="description" payload={payload} setFun={setPayload} isEdit={isEdit}/>
          </div>
          <div className="space-y-2">
            <TextField name="Created At" code="createdAt" payload={payload} setFun={setPayload} isEdit={isEdit} readOnly/>
            <TextField name="Updated At" code="updatedAt" payload={payload} setFun={setPayload} isEdit={isEdit} readOnly/>
            <Many2One path="http://10.10.10.50:5000/api/rest/products" childCode="name" name="Product" code="product_id" payload={payload} setFun={setPayload} isEdit={isEdit}/>
          </div>
        </Group>
      </Sheet>
    </main>
  );
}
