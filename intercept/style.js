const clip = document.querySelector('.clip')
const dv = document.querySelector('div')
const put = document.querySelector('.put')

const ctx_clip = clip.getContext('2d');
const ctx_put = put.getContext('2d');

let x = 0
let y = 0
let x2 = 0
let y2 = 0
let isBool = false

const img = new Image()
img.src = '123.jpg'

img.onload = function () {
    ctx_clip.drawImage(img, 0, 0, clip.width, clip.height)
}

document.addEventListener('mousedown', (e) => {
    x = e.offsetX
    y = e.offsetY
    isBool = true

    // dv.style.display = 'block'
    dv.style.left = `${x}px`
    dv.style.top = `${y}px`

    put.style.width = '0px'
    put.style.height = '0px'
    put.style.display = 'none'

    ctx_put.clearRect(0, 0, put.width, put.height)
})

document.addEventListener('mousemove', (event) => {
    if (isBool) {
        x2 = event.offsetX - x
        y2 = event.offsetY - y

        dv.style.width = `${Math.abs(x2)}px`
        dv.style.height = `${Math.abs(y2)}px`
    }
})

document.addEventListener('mouseup', () => {
    let clip_Img = ctx_clip.getImageData(x, y, x2, y2)
    ctx_put.putImageData(clip_Img, 0, 0)

    put.style.width = `${Math.abs(x2)}px`
    put.style.height = `${Math.abs(y2)}px`
    put.style.display = 'block'

    isBool = false
    x = 0
    y = 0
})