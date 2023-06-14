import { initializeApp } from 'firebase/app';
import fp from "fastify-plugin";
import {FastifyInstance} from "fastify";



const firebaseConfig = {
    apiKey: "AIzaSyACKbCVsllvX4E1ybV31_yCis8mX0kfMkk",
    authDomain: "furry-fight-club.firebaseapp.com",
    projectId: "furry-fight-club",
    storageBucket: "furry-fight-club.appspot.com",
    messagingSenderId: "105505183732",
    appId: "1:105505183732:web:b9f94f9d47b4c2185fcba1",
    measurementId: "G-5863E7VEF4"
};

declare module 'fastify' {
    interface FastifyInstance {
        firebase: any
    }
}

const fastifyFirebase = async function(app: FastifyInstance, _options) {
    const firebaseApp = initializeApp(firebaseConfig);

    app.decorate("firebase", firebaseApp);
}

export const FastifyFireBaseAuth = fp(fastifyFirebase, {
    name: "fastify-Firebase",
});
