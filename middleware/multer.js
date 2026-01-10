import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage })


// const storage = multer.diskStorage({
//     destination:(req, file, cb) => {
//         cb(null,"./public")
//     },
//     filename:(req,file,cb) => {
//         cb(null,file,orifinalname)
//     }
// })

// export const upload = multer({storage})