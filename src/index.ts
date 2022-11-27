require('dotenv').config();

setInterval(() => {
    console.log(`howdido ${process.env.mychulesecret}, ${new Date().getTime()}`);
}, 1000);
