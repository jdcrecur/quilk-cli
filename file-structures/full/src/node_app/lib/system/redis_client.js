let redis   = require("redis"),
    logging = require('lib/logging_lib');

let redisClient = redis.createClient(
    process.env.APP_REDIS_PORT,
    process.env.APP_REDIS_HOST,
    require('redis.config.json')["options"][ global.environment ]
);

redisClient.on("error", function(err) {
    logging.emerg("Error connecting to redis", err, {"source_type": "redis", "source": "upstart"});
});

redisClient.on("connect", function() {
    logging.alert("Redis non-secure connection established", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("secureConnect", function() {
    logging.info("Redis secure connection established", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("close", function() {
    logging.warning("Redis connection closed", {"source_type": "redis", "source": "upstart"});
});

redisClient.on("end", function() {
    logging.emerg("Redis connection lost", {"source_type": "redis", "source": "upstart"});
});

module.exports = redisClient;
