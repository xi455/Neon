const can = document.querySelector('.can')
const put = document.querySelector('.put')

const ctx_can = can.getContext('2d')
const ctx_put = put.getContext('2d')

const test = document.querySelector('.test')
let isBool = false

const img = new Image()
img.src = '1.jpg'

img.onload = function () {
    ctx_can.drawImage(img, 0, 0, can.width, can.height)


    let StartX = 0
    let StartY = 0
    document.addEventListener('mousedown',(e)=>{
        test.style.width = '0px'
        test.style.height = '0px'
        StartX = e.clientX
        StartY = e.clientY

        isBool = true
        // console.log(StartX,StartY);
        test.style.top = `${StartY}px`
        test.style.left = `${StartX}px`

        ctx_put.clearRect(0, 0, put.width, put.height)
    })

    let mouseX = 0
    let mouseY = 0
    document.addEventListener('mousemove',(e)=>{
        if(isBool){
            mouseX = e.clientX
            mouseY = e.clientY
            // console.log(mouseX,mouseY);
            
            if(StartX < mouseX && StartY < mouseY){
                test.style.width = `${mouseX - StartX}px`
                test.style.height = `${mouseY - StartY}px`
                // test.style.top = `${StartX}px`
            }
            if(StartX > mouseX && StartY > mouseY){
                test.style.width = `${StartX - mouseX}px`
                test.style.height = `${StartY - mouseY}px`
                test.style.top = `${mouseY}px`
                test.style.left = `${mouseX}px`
            }
            if(StartX > mouseX && StartY < mouseY){
                test.style.width = `${StartX - mouseX}px`
                test.style.height = `${mouseY - StartY}px`
                test.style.top = `${StartY}px`
                test.style.left = `${mouseX}px`
            }
            if(StartX < mouseX && StartY > mouseY){
                test.style.width = `${mouseX - StartX}px`
                test.style.height = `${StartY - mouseY}px`
                test.style.top = `${mouseY}px`
                test.style.left = `${StartX}px`
            }
        }
    })

    document.addEventListener('mouseup',()=>{
        isBool = false
        // console.log(parseInt(test.style.width.replace("px",'')))

        let img_put = ctx_can.getImageData(parseInt(test.style.width.replace("px",'')), parseInt(test.style.width.replace("px",'')), parseInt(test.style.width.replace("px",'')), parseInt(test.style.width.replace("px",'')))
        // console.log(img_put.width)
        // console.log(img_put.height)
        ctx_put.putImageData(img_put, 0, 0)
        put.style.width = `${img_put.width}px`
        put.style.height = `${img_put.height}px`
    })

}