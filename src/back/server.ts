/* eslint-env node */

"use strict";
import * as express from "express"
import * as path from "path"

require('dotenv').config({
    path: path.resolve(process.cwd(), '.env')
})


// CODELAB: Change this to add a delay (ms) before the server responds.
const FORECAST_DELAY = 0;

// CODELAB: If running locally, set your Dark Sky API key here
const LISTEN_PORT = process.env.PORT || process.env.LISTEN_PORT || "8000";


type Request = express.Request;
type Response = express.Response;

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logging for each request
    app.use((req: Request, resp: Response, next: any) => {
        const now = new Date();
        const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
        const path = `"${req.method} ${req.path}"`;
        const m = `${req.ip} - ${time} - ${path}`;
        console.log(m);
        next();
    });

    // TEMP
    app.get("/service-worker.js", (req: Request, res: Response) => {
        const path = "_dist/client/client-worker/service-worker.js"
        var options = {
            root: "",
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }
        res.sendFile(path, options, console.error);
    });

    // Handle requests for static files
    app.use(express.static("public"));

    const set = (type: "get" | "post", path: string, handler: (req: Request, res: Response) => any) => {
        const sp = (str: string, len: number) => ("                    " + str).slice(-len);
        type === "get" && app.get(path, handler);
        type === "post" && app.post(path, /*check_jwt,*/ handler);
        console.log(sp(type, 5), sp(path, 15), sp(handler.name, -15))
    }

    process.on("SIGINT", () => {
        console.log("\nserver close << " + LISTEN_PORT)
        process.exit(0);
    })

    // Start the server
    return app.listen(LISTEN_PORT, () => {
        // eslint-disable-next-line no-console
        console.log("Local DevServer Started on port http://localhost:" + LISTEN_PORT);
    });
}

startServer();
