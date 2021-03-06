import app from './app';
import { Logger } from './services/logger';
const port = 3000;

const LOGGER = Logger.getLogger();
Logger.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: process.env.LOG_LEVEL || 'debug'
        }
    }
});

LOGGER.info(`Version: ${process.version}`);
LOGGER.info(`Initializing server`);

app.listen(port, () => {
    LOGGER.info(`listening on http://localhost:${port}`);
});



// run docker application using docker: 
// docker run -d -p "3000:3000" --env-file .env jushita-rahman/plant-inventory-system-api