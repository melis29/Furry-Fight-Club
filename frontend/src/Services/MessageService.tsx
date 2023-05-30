import { httpClient } from "@/Services/HttpClient.tsx";

export const MessageService = {
	async send(id: number, matchee_id: number, the_message: string) {
		return httpClient.post("/messages", { sender_id: id, receiver_id: matchee_id, message: the_message});
	}
};
