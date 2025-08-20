// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { Brand } = require("../../models");
const slugify = require("slugify");

// Lấy tất cả
const getAllBrands = async (req, res) => {
  if (req.query.nopagination === "true") {
    const brands = await Brand.findAll({
      order: [["name", "ASC"]],
    });
    return res.status(200).json(brands);
  }
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Brand.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ.", error: error.message });
  }
};

// Tạo mới
const createBrand = async (req, res) => {
  try {
    const data = req.body;
    if (data.parent_id === "") data.parent_id = null;
    if (!data.slug && data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }
    const newBrand = await Brand.create(data);
    res.status(201).json(newBrand);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Tên hoặc slug của thương hiệu đã tồn tại." });
    }
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand)
      return res.status(404).json({ message: "Không tìm thấy thương hiệu." });
    const data = req.body;
    if (data.parent_id === "") data.parent_id = null;
    await brand.update(data);
    res.status(200).json(brand);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Tên hoặc slug của thương hiệu đã tồn tại." });
    }
    res.status(400).json({ message: error.message });
  }
};

const uploadBrandLogo = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand)
      return res.status(404).json({ message: "Không tìm thấy thương hiệu." });
    if (!req.file)
      return res.status(400).json({ message: "Vui lòng chọn một file ảnh." });

    // Xóa logo cũ nếu có
    if (brand.logo_url) {
      const oldImagePath = path.join(
        __dirname,
        "../../../public",
        brand.logo_url,
      );
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    // Cập nhật đường dẫn logo mới
    const logoPath = req.file.path.replace("public/", "").replace(/\\/g, "/");
    brand.logo_url = logoPath;
    await brand.save();

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Lỗi upload file.", error: error.message });
  }
};

// Xóa
const deleteBrand = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  if (!brand)
    return res.status(404).json({ message: "Không tìm thấy thương hiệu." });
  await brand.destroy();
  res.status(204).send();
};

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  uploadBrandLogo,
  deleteBrand,
};
