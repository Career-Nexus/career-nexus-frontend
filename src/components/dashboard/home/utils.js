export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = "anonymous"

    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext("2d")

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"))
          return
        }
        resolve(blob)
      }, "image/jpeg", 0.9)
    }

    image.onerror = (err) => reject(err)
  })
}