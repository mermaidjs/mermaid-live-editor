export const upload = (svgImage) => {
  var url = uploadFile(svgImage)
  console.log('Secure url is: ' + url)

  // const url = cloudinaryCore.url('couple');

  return url.replace('.svg', '.png').replace('/upload/', '/upload/b_white/l_cloudinary_icon,w_0.2,g_south_east,o_70/')
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile (svgImage) {
  var url = 'https://api.cloudinary.com/v1_1/mermaid/upload'

  var xhr = new XMLHttpRequest() // eslint-disable-line

  var fd = new FormData() // eslint-disable-line
  xhr.open('POST', url, false)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  // fd.append('public_id', publicId)
  fd.append('upload_preset', 'mermaid')
  fd.append('tags', 'Mermaid') // Optional - add tag for image admin in Cloudinary
  fd.append('file', svgImage)
  xhr.send(fd)

  var cldUrl = ''

  if (xhr.status === 200) {
    // File uploaded successfully
    var response = JSON.parse(xhr.responseText)
    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
    cldUrl = response.secure_url
    // Create a thumbnail of the uploaded image, with 150px width
    console.log('File uploaded: ' + cldUrl)
  }

  return cldUrl
}
