export interface FieldParams {
    name: string,
    code: string,
    readOnly?: boolean,
    setFun?: (data: any)=>void,
    isEdit?: boolean,
    children?: React.ReactNode,
    payload: any
}

export interface Field {
    (params: FieldParams): React.ReactNode
}

export interface TextFieldParams extends FieldParams{
    isSecret?: boolean
}

export interface Many2OneParams extends FieldParams{
    path: string,
    childCode: string
}