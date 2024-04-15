const getUpdatedValue = (newData: any, original: any)=>{
    const updatedData: any = {};
    Object.keys(newData).concat(Object.keys(original)).forEach(key=>{
        if (!newData[key] && !original[key]){
            return
        }else if ((!newData[key] && original[key]) || (newData[key] && !original[key])){
            updatedData[key] = newData[key]
            return
        }
        else if (newData[key] === original[key]){
            return
        }
        else if (newData[key].toString() != original[key].toString()){
            updatedData[key] = newData[key]
        }
    });
    return updatedData;
}

export default getUpdatedValue;
