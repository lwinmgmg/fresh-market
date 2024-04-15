export function checkIsChild(parent?: Element, child?: Element): boolean{
    let result = false;
    if (!parent || !child){
        return result;
    }
    if (parent.hasChildNodes() && parent.contains(child)){
        result = true;
    }else if (parent.hasChildNodes()){
        for (let i = 0; i< parent.childNodes.length; i++){
            result = checkIsChild(parent.children[i], child)
            if (result){
                break
            }
        }
    }
    return result;
}