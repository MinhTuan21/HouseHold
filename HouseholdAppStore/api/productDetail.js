const API_URL_DETAILS = "http://172.16.55.134:4000/productDs";
export const addProductDetails = async (productId, specifications, stock, manufacturer, warranty, additionalInfo) => {
    try {
        const response = await fetch(`${API_URL_DETAILS}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, specifications, stock, manufacturer, warranty, additionalInfo }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Chi tiết sản phẩm đã thêm:", data);
        return data;
    } catch (error) {
        console.error("Lỗi khi thêm chi tiết sản phẩm:", error);
        return { success: false, message: "Lỗi khi kết nối server!" };
    }
};
export const updateProductDetails = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL_DETAILS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Chi tiết sản phẩm đã cập nhật:", data);
        return data;
    } catch (error) {
        console.error("Lỗi khi cập nhật chi tiết sản phẩm:", error);
        return { success: false, message: "Lỗi khi kết nối server!" };
    }
};
export const deleteProductDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL_DETAILS}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        console.log(`Chi tiết sản phẩm ID ${id} đã bị xóa!`);
        return { success: true, message: "Chi tiết sản phẩm đã bị xóa!" };
    } catch (error) {
        console.error("Lỗi khi xóa chi tiết sản phẩm:", error);
        return { success: false, message: "Lỗi khi kết nối server!" };
    }
};
