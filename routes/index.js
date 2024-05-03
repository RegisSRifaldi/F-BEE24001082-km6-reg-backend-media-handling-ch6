const express = require("express");
const router = express.Router();

const { image } = require("../libs/multer");
const {
  storeImageKitUpload,
  indexImageKitUploaded,
  showImageKitUploaded,
  destoryImageKitUploaded,
  updateImageKitUploaded,
} = require("../controllers/media.controllers");

// Mengunggah gambar bersama dengan judul dan deskripsi.
router.post(
  "/imagekit/upload/image",
  image.single("gambar_url"),
  storeImageKitUpload
);

// Melihat daftar gambar yang telah diunggah beserta informasi terkait.
router.get(
  "/imagekit/uploaded/images",
  image.single("gambar_url"),
  indexImageKitUploaded
);

// Melihat detail gambar beserta informasi terkait.
router.get(
  "/imagekit/uploaded/image/:id",
  image.single("gambar_url"),
  showImageKitUploaded
);

// Menghapus gambar.
router.delete(
  "/imagekit/uploaded/image/:id",
  image.single("gambar_url"),
  destoryImageKitUploaded
);
// Mengedit judul dan deskripsi gambar yang telah diunggah.
router.put(
  "/imagekit/uploaded/image/:id",
  image.single("gambar_url"),
  updateImageKitUploaded
);

module.exports = router;
