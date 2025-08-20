// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
const { ProductCategory } = require('../../models');
const slugify = require('slugify');
const { Op } = require('sequelize');

const getAllCategories = async (req, res) => {
    if (req.query.nopagination === 'true') {
        const categories = await ProductCategory.findAll({
            order: [['name', 'ASC']],
        });
        return res.status(200).json(categories);
    }

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.search || '';

        let options = {
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
        };

        // NẾU CÓ TỪ KHÓA TÌM KIẾM
        if (searchTerm) {
            options.where = {
                name: {
                    [Op.like]: `%${searchTerm}%`, // Tìm các tên chứa từ khóa
                },
            };
            // Khi tìm kiếm, chúng ta sẽ trả về danh sách phẳng
            const { count, rows } = await ProductCategory.findAndCountAll(options);
            return res.status(200).json({
                data: rows,
                pagination: {
                    /* ... pagination logic ... */
                },
            });
        }

        // BƯỚC 1: Đếm và lấy ra các DANH MỤC GỐC cần phân trang
        const { count: rootCategoryCount, rows: paginatedRootCategories } = await ProductCategory.findAndCountAll({
            where: { parent_id: null }, // Chỉ lấy danh mục gốc
            limit: limit,
            offset: offset,
            order: [
                ['sort_order', 'ASC'],
                ['createdAt', 'DESC'],
            ],
        });

        // Nếu không có danh mục gốc nào ở trang này, trả về mảng rỗng
        if (paginatedRootCategories.length === 0) {
            return res.status(200).json({
                data: [],
                pagination: {
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: page,
                    limit: limit,
                },
            });
        }

        // BƯỚC 2: Lấy ID của các danh mục gốc vừa được phân trang
        const rootCategoryIds = paginatedRootCategories.map((cat) => cat.id);

        // BƯỚC 3: Tìm TẤT CẢ các danh mục con của những danh mục gốc đó
        // Đây là một truy vấn đệ quy phức tạp, cách đơn giản nhất là lấy hết các danh mục con
        // và xử lý ở phía ứng dụng.
        const allSubCategories = await ProductCategory.findAll({
            where: {
                parent_id: {
                    [Op.ne]: null, // Lấy tất cả các danh mục không phải là danh mục gốc
                },
            },
        });

        // Hàm helper để xây dựng cây con cho một danh sách cha mẹ
        const getDescendants = (parents, allChildren) => {
            let descendants = [];
            for (const parent of parents) {
                const children = allChildren.filter((child) => child.parent_id === parent.id);
                descendants.push(parent);
                descendants.push(...getDescendants(children, allChildren));
            }
            return descendants;
        };

        // BƯỚC 4: Tạo danh sách cuối cùng để gửi về frontend
        const finalCategoryList = getDescendants(paginatedRootCategories, allSubCategories);

        res.status(200).json({
            data: finalCategoryList, // Gửi về danh sách đã bao gồm cha và tất cả con cháu
            pagination: {
                totalItems: rootCategoryCount, // Tổng số item là tổng số DANH MỤC GỐC
                totalPages: Math.ceil(rootCategoryCount / limit),
                currentPage: page,
                limit: limit,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ.', error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const data = req.body;

        if (data.parent_id === '') {
            data.parent_id = null;
        }

        if (!data.slug && data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }

        const newCategory = await ProductCategory.create(data);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await ProductCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục.' });

        const data = req.body;

        if (data.parent_id === '') {
            data.parent_id = null;
        }

        await category.update(data);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadCategoryImage = async (req, res) => {
    try {
        const category = await ProductCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục.' });

        // Nếu có file được upload
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn một file ảnh.' });
        }

        // Xóa file ảnh cũ nếu có
        if (category.image) {
            const oldImagePath = path.join(__dirname, '../../../public', category.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Cập nhật đường dẫn ảnh mới
        const imagePath = req.file.path.replace('public/', '').replace(/\\/g, '/');
        category.image = imagePath;
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload file.', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục.' });

    await category.destroy(); // Sẽ là soft delete do đã cấu hình 'paranoid: true'
    res.status(204).send();
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    uploadCategoryImage,
    deleteCategory,
};
