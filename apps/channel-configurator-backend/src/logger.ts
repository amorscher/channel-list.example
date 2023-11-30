import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: 'info',
    // Use timestamp and printf to create a standard log format
    format: format.combine(
        format.timestamp(),
        format.printf(
            (info) =>
                `${info.timestamp} ${info.level}: ${info.message} ${
                    info.payload ? JSON.stringify(info.payload) : ''
                }`
        )
    ),
    // Log to the console and a file
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }),
    ],
});
