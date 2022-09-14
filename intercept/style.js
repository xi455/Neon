const can = document.querySelector('.can')
const put = document.querySelector('.put')

const ctx_can = can.getContext('2d')
const ctx_put = put.getContext('2d')

const test = document.querySelector('.test')
let isBool = false

const img = new Image()
img.src = '123.jpg'

img.onload = function () {
    can.width = img.width
    can.height = img.height
    ctx_can.drawImage(img, 0, 0, img.width, img.height)

    let StartX = 0
    let StartY = 0
    document.addEventListener('mousedown', (e) => {
        test.style.width = '0px'
        test.style.height = '0px'
        StartX = e.clientX
        StartY = e.clientY

        isBool = true
        test.style.top = `${StartY}px`
        test.style.left = `${StartX}px`

        ctx_put.clearRect(0, 0, put.width, put.height)
    })

    let mouseX = 0
    let mouseY = 0
    document.addEventListener('mousemove', (e) => {
        if (isBool) {
            mouseX = e.clientX
            mouseY = e.clientY

            if (StartX < mouseX && StartY < mouseY) {
                test.style.width = `${mouseX - StartX}px`
                test.style.height = `${mouseY - StartY}px`
                test.style.top = `${StartY}px`
                test.style.left = `${StartX}px`
            }
            if (StartX > mouseX && StartY > mouseY) {
                test.style.width = `${StartX - mouseX}px`
                test.style.height = `${StartY - mouseY}px`
                test.style.top = `${mouseY}px`
                test.style.left = `${mouseX}px`
            }
            if (StartX > mouseX && StartY < mouseY) {
                test.style.width = `${StartX - mouseX}px`
                test.style.height = `${mouseY - StartY}px`
                test.style.top = `${StartY}px`
                test.style.left = `${mouseX}px`
            }
            if (StartX < mouseX && StartY > mouseY) {
                test.style.width = `${mouseX - StartX}px`
                test.style.height = `${StartY - mouseY}px`
                test.style.top = `${mouseY}px`
                test.style.left = `${StartX}px`
            }
        }
    })

    document.addEventListener('mouseup', () => {
        isBool = false

        let img_put = ctx_can.getImageData(parseInt(test.style.left.replace("px", '')),
            parseInt(test.style.top.replace("px", '')), parseInt(test.style.width.replace("px", '')),
            parseInt(test.style.height.replace("px", '')))
            
        put.width = `${img_put.width}`
        put.height = `${img_put.height}`
        ctx_put.putImageData(img_put, 0, 0)

    })

}

function download(put) {
    // console.log(put)
    let canvas = document.querySelector(put)
    let down = document.createElement('a')
    // console.log(imgURL)
    down.href = canvas.toDataURL()
    console.log(down.href)

    let name = ''
    for (let i = 0; i < 5; i++) {
        name += String(parseInt(Math.random() * 10))
    }
    console.log(name)

    down.download = `${name}.jpeg`

    down.click()
    // console.log(imgURL)
}