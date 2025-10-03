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
    async getChatSessions() {
        try {
            const response = await api.get("/notification-chat/chats/");
            console.log("Chat sessions fetched:", response);

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching chat sessions:", error);
            return { success: false, data: [] };
        }
    },
    async getChatHistory(chat_id) {
        try {
            const response = await api.get(`/notification-chat/chat/messages/?chat_id=${chat_id}`);
            console.log("Chat history fetched", response);
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error fetching chat history:", error);
            return { success: false, data: [] };
        }
    },
    async initiateChatSession(contributorId) {
    try {
        const response = await api.post(
            "/notification-chat/chats/initiate/",
            { user: contributorId } // must be in this shape
        );
        console.log("chat session initiated", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Couldn't initiate chat session", error.response?.data || error);
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
    async clearNotifications() {
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
