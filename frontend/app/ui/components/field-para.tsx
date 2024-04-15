
function ValueBr({
    value,
    isBr = true,
}: {
    value: string,
    isBr?: boolean
}){
    return (<>
    {value}
    {isBr ? <br/>:null}
    </>);
}

export default function FieldPara({
    value
}: {
    value?: string
}){
    const vals = value?.split("\n") || [];
    const valLength = value?.split("\n").length || 0;
    return <p className="ml-2 px-2 py-2 text-sm">
        {
            vals.map((val, idx)=>{
                if (idx + 1 === valLength){
                    return <ValueBr key={idx.toString()+val} value={val} isBr={false} />
                }
                return <ValueBr key={idx.toString()+val} value={val} isBr />
            })
        }
    </p>
}