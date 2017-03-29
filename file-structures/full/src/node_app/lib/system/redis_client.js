const redis   = require("redis");

const redisClient = redis.createClient(
    process.env.APP_REDIS_PORT,
    process.env.APP_REDIS_HOST,
    require('redis.config.json')["options"][ global.environment ]
);

redisClient.on("error", function(err) {
    global.logger.emerg("Error connecting to redis", err, {"source_type": "redis", "source": "upstart"});
});

redisClient.on("connect", function() {
    global.logger.alert("Redis non-secure connection established", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("secureConnect", function() {
    global.logger.info("Redis secure connection established", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("close", function() {
    global.logger.warning("Redis connection closed", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("end", function() {
    global.logger.emerg("Redis connection lost", {"source_type": "redis", "source": "upstart"});
});

module.exports = redisClient;
