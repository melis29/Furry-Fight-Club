import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyACKbCVsllvX4E1ybV31_yCis8mX0kfMkk",
    authDomain: "furry-fight-club.firebaseapp.com",
    projectId: "furry-fight-club",
    storageBucket: "furry-fight-club.appspot.com",
    messagingSenderId: "105505183732",
    appId: "1:105505183732:web:b9f94f9d47b4c2185fcba1",
    measurementId: "G-5863E7VEF4"
};

async function fastifyFirebase(fastify, options) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    fastify.decorate('firebase', { app, auth });
}

export default fastifyFirebase;
