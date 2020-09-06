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