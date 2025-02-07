import { useEffect, useState } from "react";
import { fetchFromServer } from "../httpMethods";
import constant from "../../helper/constant";
import { ParamsType } from "../../types/formTypes";

export function useFetch<T>(url:string,params?:ParamsType):[T | null,boolean,boolean,()=>void]{
    const [data,setdata] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<boolean>(false);
    const [count,setCount] =useState(0);

    function update(){
        setCount(prev=>prev+1);
    }

    let fetchLink = constant.SERVER + '/' + url;
    
    if(params){
      const paramsArray = Object.entries(params!);
      fetchLink+='?';
      if(paramsArray.length > 0){
        for(let [key,val] of paramsArray){
          fetchLink+=`${key}=${val}&`
        }
      }
    }
    
    useEffect(()=>{
        async function getData() {
            setError(false);
            setLoading(true);
          try {
            const result = await fetchFromServer(fetchLink)
            if(Boolean(result.success)){
                setdata(result.data);
            }
            else{
                setError(true);
            }
          } catch (error) {
            setError(true);
          }
          setLoading(false);
        }
        getData();
    },[fetchLink,count])



    return [data,loading,error,update];
}