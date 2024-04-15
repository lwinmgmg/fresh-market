import getUpdatedValue from "@/app/lib/updated-value";
import { useRouter } from "next/navigation";

interface FormViewButtonIface{
    changeEdit: ()=>void,
    path: string,
    method?: string,
    payload: any,
    oldPayload: any,
    isEdit?: boolean,
}
export default function FormViewButtons({
    isEdit,
    path,
    method="PUT",
    payload,
    oldPayload,
    changeEdit
}:FormViewButtonIface){
    const router = useRouter();
    const onSave = () =>{
        const updatedData = getUpdatedValue(payload, oldPayload);
        if (Object.keys(updatedData).length > 0){
          fetch(path, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
          }).then(async (resp)=>{
            if (resp.status == 200){
                changeEdit();
                return resp.json()
            }
            throw await resp.json();
          }).then(data=>{
            if (method === "POST"){
                router.replace(location.pathname.replace("create", data.id));
            }
          }).catch(err=>{
            throw err
          })
        }else{
          changeEdit();
        }
      }
    return (
        <div className="flex flex-row space-x-2">
            <button hidden={isEdit} onClick={changeEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Edit</button>
            <button hidden={!isEdit} onClick={onSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Save</button>
            <button hidden={!isEdit} onClick={changeEdit} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Cancel</button>
        </div>
    );
}