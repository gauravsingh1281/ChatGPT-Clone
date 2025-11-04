import axiosInstance from "../../services/axiosInstance";

export const createChat = async (data) => {
    const response = await axiosInstance.post("chat/", data);
    return response;
};


