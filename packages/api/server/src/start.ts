import server from "./index";

const defaultPort = 9000;

const port = Number(process.env.PORT || defaultPort);

const startServer = () => {
	const app = server.listen(port, () => {
		console.log(`Server running on port ${port}...`);
	});

	process.on("SIGINT", () => {
		console.log("Stopping server...");
		app.close(() => {
			console.log("Server stopped.");
			process.exit(0);
		});
	});
};

startServer();
