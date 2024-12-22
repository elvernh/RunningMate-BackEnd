import winston from "winston"

//untuk mereturn pesan dari system
export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [new winston.transports.Console({})]
    //untuk nampilin error log
})