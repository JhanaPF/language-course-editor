import dotenv from "dotenv";
import http, { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
//import * as serverUtil from "./utils/serverUtils";
const serverUtil = require('./utils/serverUtils');
import type { AddressInfo } from "net";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
	console.log("\x1b[31m%s\x1b[0m", "Development mode, default variables will be used");
	// Désactive la vérification SSL pour les dev env
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

// Vérification de la variable d’environnement DATABASE
if (!process.env.DATABASE) {
	throw new Error("DATABASE is not defined in your environment variables.");
}

const mongoParams: mongoose.ConnectOptions = {
	serverSelectionTimeoutMS: 1000,
	socketTimeoutMS: 2000,
};

// Connexion à MongoDB
mongoose
	.connect(process.env.DATABASE, mongoParams)
	.then(() => console.log("✅ Connected to MongoDB"))
	.catch((err: unknown) => {
		console.error(err);
		console.error("❌ Failed to connect to Mongo database");
		process.exit(1);
	});

// Vérification de la variable d’environnement PORT
if (!process.env.PORT) {
	throw new Error("PORT is not defined in your environment variables.");
}

// Normalisation du port
const port = serverUtil.normalizePort(process.env.PORT);
app.set("port", port);

// Création du serveur HTTP
const server: Server = http.createServer(app);

// Gestion des erreurs serveur
server.on("error", (err: NodeJS.ErrnoException) => serverUtil.errorHandler(err, port));

// Quand le serveur écoute
server.on("listening", () => {
	const address = server.address();
	const bind =
		typeof address === "string"
			? `pipe ${address}`
			: address
				? `port ${(address as AddressInfo).port}`
				: "unknown";
	console.log(`🚀 Listening on ${bind}`);
});

// Démarrage du serveur
server.listen(port);
