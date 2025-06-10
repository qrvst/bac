import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters = {}, sort = "newest" }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Початкове встановлення продуктів
    useEffect(() => {
        setFilteredProducts(popularProducts);
    }, []);

    // Фільтрація продуктів
    useEffect(() => {
        let filtered = popularProducts;

        // Фільтруємо по категорії, якщо вона вказана (через URL)
        if (cat && cat !== "Watches") {
            filtered = filtered.filter((item) =>
                item.categories && item.categories.includes(cat.toLowerCase())
            );
        }

        // Застосовуємо додаткові фільтри
        if (filters && Object.keys(filters).length > 0) {
            filtered = filtered.filter((item) =>
                Object.entries(filters).every(([key, value]) => {
                    if (!value || value === "") return true;

                    // Фільтр по типу (type) - перевіряємо categories
                    if (key === "type") {
                        if (value === "Smart") {
                            return item.categories && item.categories.includes("smart");
                        } else if (value === "Analog") {
                            return item.categories && item.categories.includes("analog");
                        } else if (value === "Electro") {
                            return item.categories && item.categories.includes("electronic");
                        }
                    }

                    // Фільтр по бренду
                    if (key === "brand") {
                        return item.brand && item.brand.toLowerCase() === value.toLowerCase();
                    }

                    // Фільтр по наявності
                    if (key === "inStock") {
                        return item.inStock === (value === "true");
                    }

                    return false;
                })
            );
        }

        setFilteredProducts(filtered);
    }, [cat, filters]);

    // Сортування продуктів
    useEffect(() => {
        if (sort && filteredProducts.length > 0) {
            const sorted = [...filteredProducts];

            if (sort === "newest") {
                // Сортуємо за _id (припускаємо, що більший _id = новіший)
                sorted.sort((a, b) => parseInt(b._id) - parseInt(a._id));
            } else if (sort === "asc") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sort === "desc") {
                sorted.sort((a, b) => b.price - a.price);
            }

            setFilteredProducts(sorted);
        }
    }, [sort]);

    return (
        <Container>
            {filteredProducts.map((item) => (
                <Product item={item} key={item._id} />
            ))}
        </Container>
    );
};

export default Products;