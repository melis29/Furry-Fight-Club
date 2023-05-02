import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Match } from "./db/entities/Match.js";
import { Message } from "./db/entities/Message.js";
import {User} from "./db/entities/User.js";
import {ICreateUsersBody} from "./types.js";
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	

	
	// Core method for adding generic SEARCH http method
	// app.route<{Body: { email: string}}>({
	// 	method: "SEARCH",
	// 	url: "/users",
	//
	// 	handler: async(req, reply) => {
	// 		const { email } = req.body;
	//
	// 		try {
	// 			const theUser = await req.em.findOne(User, { email });
	// 			console.log(theUser);
	// 			reply.send(theUser);
	// 		} catch (err) {
	// 			console.error(err);
	// 			reply.status(500).send(err);
	// 		}
	// 	}
	// });
	
	// CRUD
	// C
	app.post<{Body: ICreateUsersBody}>("/users", async (req, reply) => {
		const { name, email, petType} = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				petType
			});

			await req.em.flush();
			
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
	
	//READ
	app.search("/users", async (req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	// UPDATE
	app.put<{Body: ICreateUsersBody}>("/users", async(req, reply) => {
		const { name, email, petType} = req.body;
		
		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		userToChange.petType = petType;
		
		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
		
	});
	
	// DELETE
	app.delete<{ Body: {email, password}}>("/users", async(req, reply) => {
		const { email, password } = req.body;

		if(password !== process.env.PASSWORD){
			return reply.status(401).send("Unauthorized!");
		}

		try {
			const theUser = await req.em.findOne(User, { email });

			await req.em.remove(theUser).flush();
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	// CREATE MATCH ROUTE
	app.post<{Body: { email: string, matchee_email: string }}>("/match", async (req, reply) => {
		const { email, matchee_email } = req.body;

		try {
			// make sure that the matchee exists & get their user account
			const matchee = await req.em.findOne(User, { email: matchee_email });
			// do the same for the matcher/owner
			const owner = await req.em.findOne(User, { email });

			//create a new match between them
			const newMatch = await req.em.create(Match, {
				owner,
				matchee
			});

			//persist it to the database
			await req.em.flush();
			// send the match back to the user
			return reply.send(newMatch);
		} catch (err) {
			console.error(err);
			return reply.status(500).send(err);
		}

	});

	app.post<{Body: { sender: string, receiver: string, message:string }}>("/messages", async (req, reply) =>{
		const { sender, receiver, message } = req.body;

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const badWordPath = path.join(__dirname, "badwords.txt");
		const data = fs.readFileSync(badWordPath).toString();
		const badWordList = data.split(/\r?\n/);
		const words = message.split(' ');
		const badWordFlag = words.some(word => badWordList.includes(word));

		if (badWordFlag) {
			console.error("You tried to send a naughty message");
			return reply.status(500)
				.send( "You tried to send a naughty message");
		} else {
			try {
				const receiver_email = await req.em.findOne(User, {email: receiver});

				const sender_email = await req.em.findOne(User, {email: sender});

				const newMessage = await req.em.create(Message, {
					sender_email,
					receiver_email,
					message
				});

				await req.em.flush();
				return reply.send(newMessage);
			} catch (err) {
				console.error(err);
				return reply.status(500)
					.send(err);
			}
			
		}
	});

	app.search("/messages", async (req, reply) => {
		const { receiver } = req.body;

		const email = receiver;

		try {
			const theUser = await req.em.findOne(User, { email });
			const receiver_email = theUser.id;
			const messageList = await req.em.find(Message, {receiver_email});
			reply.send(messageList);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	app.search("/messages/sent", async (req, reply) => {
		const { sender } = req.body;

		const email = sender;

		try {
			const theUser = await req.em.findOne(User, { email });
			const sender_email = theUser.id;
			const messageList = await req.em.find(Message, {sender_email});
			reply.send(messageList);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	app.put<{Body: { messageId: number, message: string }}>("/messages", async(req, reply) => {
		const { messageId, message} = req.body;

		const id = messageId;

		try {

			const theMessage = await req.em.findOne(Message, {id});
			theMessage.message = message;

			// Reminder -- this is how we persist our JS object changes to the database itself
			await req.em.flush();
			reply.send(theMessage);
		} catch(err){
			console.error(err);
			console.error(id);
			reply.status(500).send(err);
		}

	});

	app.delete<{ Body: {messageId, password}}>("/messages", async(req, reply) => {
		const { messageId, password } = req.body;
		const id = messageId;

		if(password !== process.env.PASSWORD){
			return reply.status(401).send("Unauthorized!");
		}
		else {

			try {
				const theMessage = await req.em.findOne(Message, {id});

				await req.em.remove(theMessage)
					.flush();
				reply.send(theMessage);
			} catch (err) {
				console.error(err);
				reply.status(500)
					.send(err);
			}
		}
	});

	app.delete<{ Body: {sender, password}}>("/messages/all", async(req, reply) => {
		const { sender, password } = req.body;

		const email = sender;

		if(password !== process.env.PASSWORD){
			return reply.status(401).send("Unauthorized!");
		}


		try {
			const theUser = await req.em.findOne(User, { email });
			const sender_email = theUser.id;
			const theSender = await req.em.find(Message, { sender_email });

			await req.em.remove(theSender).flush();
			reply.send(theSender);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

}

export default DoggrRoutes;
