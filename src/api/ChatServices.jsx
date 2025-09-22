import api from "./ApiServiceThree";


export const ChatServices = {
    async getChatList(id) {
        try {
            console.log("Calling API with chat_id:", id);
            const response = await api.get(`/chats/messages/?chat_id=${id}`);
            console.log("API raw response:", response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching chat list:", error);
            return { success: false, data: [] };
        }
    },
    async getChats() {
        try {
            const response = await api.get('/chats/');
            console.log("API raw response:", response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching chat messages:", error);
            return { success: false, data: [] };
        }
    },

    async getNotifications() {
        try {
            const response = await api.get('/notification-chat/notifications/');
            console.log("Notification fetched:", response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return { success: false, data: [] };
        }
    },
    async clearNotifications(){
        try {
            const response = await api.delete('/notification-chat/notifications/');
            console.log("API raw response:", response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error clearing chat:", error);
            return { success: false, data: [] };
        }
    }
}
