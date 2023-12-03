const init = () => {
    let btn = document.querySelector("#mybtn")
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
        if (flag == 0) {
            let div = document.createElement("div")
            div.innerHTML = "copied!"
            div.style.height = "50px"
            div.style.weight = "50px"
            div.style.fontSize = "10px"
            div.id = "mydiv"
            flag = 1
            btn.append(div)
            setTimeout(fade_out, 5000);
            var copyText = document.getElementById("copyText");
            console.log(copyText.innerHTML)
            copyText = copyText.innerHTML
            navigator.clipboard.writeText(copyText);
        }
    })
}
let flag = 0


function fade_out() {
    flag = 0
    document.querySelector("#mydiv").remove()
}
init()