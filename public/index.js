const init=()=>{
    let btn=document.querySelector("#mybtn")
    btn.addEventListener("click",()=>{
        var copyText = document.getElementById("copyText");
        console.log(copyText.innerHTML)
        copyText=copyText.innerHTML
        navigator.clipboard.writeText(copyText);
    })
}
init()