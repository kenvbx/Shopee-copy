// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Hàm xây dựng cây phân cấp (tương tự như bên admin)
const buildCategoryHierarchy = (categories, parentId = null, level = 0) => {
  const result = [];
  const children = categories.filter((cat) => cat.parent_id === parentId);
  for (const child of children) {
    result.push({ ...child, level });
    const grandChildren = buildCategoryHierarchy(
      categories,
      child.id,
      level + 1
    );
    result.push(...grandChildren);
  }
  return result;
};

function CategorySidebar() {
  const [displayCategories, setDisplayCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/public/categories"
        );
        const hierarchicalList = buildCategoryHierarchy(response.data);
        setDisplayCategories(hierarchicalList);
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      className="category-sidebar"
      style={{ border: "1px solid #eee", padding: "15px" }}
    >
      <h3>Danh Mục Sản Phẩm</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {displayCategories.map((cat) => (
          <li key={cat.id} style={{ paddingLeft: `${cat.level * 20}px` }}>
            <Link to={`/products?category=${cat.slug}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar;
