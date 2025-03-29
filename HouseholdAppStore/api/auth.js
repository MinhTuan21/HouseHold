const API_URL = "http://172.16.55.134:4000/users";

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Phản hồi từ API đăng ký:", data);
        return data;
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return { success: false, message: "Không thể kết nối server! Kiểm tra đường truyền mạng." };
    }
};

export const loginUser = async (email, password) => {
    try {
        console.log("Gửi dữ liệu lên API:", { email, password });

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Kết quả từ server:", data);
        return data;
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return { success: false, message: "Lỗi server!" };
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        console.log("Phản hồi từ API:", data);
        return data;
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return { success: false, message: "Lỗi server!" };
    }
};
export const resetPassword = async (email, otp, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, newPassword }),
        });

        const data = await response.json();
        console.log("Phản hồi API:", response.status, data);

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Lỗi không xác định");
        }
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        return { success: false, message: error.message };
    }
};



