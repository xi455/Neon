const can = document.querySelector('.can')
const put = document.querySelector('.put')
const bord = document.querySelector('.bord')

const ctx_can = can.getContext('2d')
const ctx_put = put.getContext('2d')


const img = new Image()
img.src = '123.jpg'
let x = 0
let y = 0
let x2 = 0
let y2 = 0
let isBool = false

img.onload = function () {
    ctx_can.drawImage(img, 0, 0, can.width, can.height)

    document.addEventListener('mousedown', function (e) {
        x = Math.abs(e.offsetX)
        y = Math.abs(e.offsetY)
        isBool = true

        bord.style.display = 'block'
        bord.style.left = `${x}px`
        bord.style.top = `${y}px`
        // console.log(x, y)

        ctx_put.clearRect(0, 0, put.width, put.height)
    })

    document.addEventListener('mousemove', function (event) {
        if (isBool) {
            x2 = Math.abs(event.offsetX)
            y2 = Math.abs(event.offsetY)
            // console.log(x2, y2)

            bord.style.width = `${x2 - x}px`
            bord.style.height = `${y2 - y}px`
        }
    })

    document.addEventListener('mouseup', function () {
        isBool = false

        // console.log(x2 - x, y2 - y)

        bord.style.display = 'none'
        bord.style.width = `${0}px`
        bord.style.height = `${0}px`

        let img_put = ctx_can.getImageData(x, y, x2 - x, y2 - y)
        console.log(img_put.width)
        console.log(img_put.height)
        ctx_put.putImageData(img_put, 0, 0, 0, 0, x2 - x, y2 - y)
        put.style.width = `${img_put.width}px`
        put.style.height = `${img_put.height}px`

        // var imgURL = put.toDataURL('image/jpeg', 1);
        // console.log(imgURL)

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
