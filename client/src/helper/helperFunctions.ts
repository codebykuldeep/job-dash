export function nameFormatter(value:string){
    const arr = value.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('').split('_').join(" ");
}


export function dateFormatter(value:string){
    const date = new Date(value).toLocaleString('en-US',{
        day:'2-digit',
        month:'2-digit',
        year:'numeric'
    })
    return date;
}


