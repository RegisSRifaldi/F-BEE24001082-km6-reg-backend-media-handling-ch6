const imageKit = require("../libs/imageKit");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // Mengunggah gambar bersama dengan judul dan deskripsi.
  storeImageKitUpload: async (req, res, next) => {
    try {
      const strFile = req.file.buffer.toString("base64");

      const uploadFile = await imageKit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const newImage = await prisma.gambar.create({
        data: {
          judul: req.body.judul,
          deskripsi: req.body.deskripsi,
          gambar_url: uploadFile.url,
        },
      });

      res.status(201).json({
        status: true,
        message: "berhasil membuat data gambar!",
        data: newImage,
      });
    } catch (error) {
      next(error);
    }
  },

  // Melihat daftar gambar yang telah diunggah beserta informasi terkait.
  indexImageKitUploaded: async (req, res, next) => {
    try {
      const uploadedImages = await prisma.gambar.findMany();

      if (!uploadedImages) {
        return res.status(400).json({
          status: false,
          message: `belum ada data, cobalah menbuat data terlebih dahulu!`,
        });
      }

      res.status(200).json({
        status: true,
        message: "berhasil menampilkan data gambar!",
        data: uploadedImages,
      });
    } catch (error) {
      next(error);
    }
  },

  // Melihat detail gambar beserta informasi terkait.
  showImageKitUploaded: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const showImage = await prisma.gambar.findUnique({
        where: { id },
      });

      if (!showImage) {
        return res.status(400).json({
          status: false,
          message: `id ${id} tersebut tidak ada, mohon masukan pencarian yang benar!`,
        });
      }

      res.status(200).json({
        status: true,
        message: "berhasil membuat data gambar!",
        data: showImage,
      });
    } catch (error) {
      next(error);
    }
  },

  // Menghapus gambar.
  destoryImageKitUploaded: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const showImage = await prisma.gambar.findUnique({
        where: { id },
      });

      if (!showImage) {
        return res.status(400).json({
          status: false,
          message: `id ${id} tersebut tidak ada, mohon masukan pencarian yang benar!`,
        });
      }

      const deletedImage = await prisma.gambar.delete({
        where: { id },
      });

      res.status(200).json({
        status: true,
        message: "berhasil menghapus data gambar!",
        data: deletedImage,
      });
    } catch (error) {
      next(error);
    }
  },

  // Mengedit judul dan deskripsi gambar yang telah diunggah.
  updateImageKitUploaded: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const dataImage = req.body;
      const showImage = await prisma.gambar.findUnique({
        where: { id },
      });

      if (!showImage) {
        return res.status(400).json({
          status: false,
          message: `id ${id} tersebut tidak ada, mohon masukan pencarian yang benar!`,
        });
      }

      const updatedImage = await prisma.gambar.update({
        where: { id },
        data: dataImage,
      });

      res.status(200).json({
        status: true,
        message: "berhasil update data gambar!",
        data: updatedImage,
      });
    } catch (error) {
      next(error);
    }
  },
};
