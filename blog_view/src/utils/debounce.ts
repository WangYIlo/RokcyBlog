//节流函数
export function debounce(fn:Function,interval:number){
    let timer:any=null
    return function(this:any){
        let context=this
        let args=arguments
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
         fn.apply(context,args)
        },interval)
    }
}