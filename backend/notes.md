//To extract info from file use multer:

if mimetype is pdf, after parsing ->> extract data with as something like this (data.text)
if mimetype is docx, after parsing ->> extract data with as something like this (data.value)

//Dont Set Content Type in header if you want to send multipart/form-data. it will set by browser automatically.
