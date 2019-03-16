'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: '046866981f38b1c5331045c9d2359473',
  channelAccessToken: 'HD2Jdce5vuO2vVePRwPEiyRt38PpqLW6TMgEjjYY8KuVZZIqYADk9AnCdY7qXBz2uUshzpV1hj9y0xFVveObX2689uWVsMBInxXL7jrPZu2DY3JXySS3/WulvUKQmBH3gOyJmzwErBs4uHy1u2DRswdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config),(req,res) => {
  console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=> res.json(result));
});

const client = new line.Client(config);

function handleEvent(event){
  if(event.type !== 'message' || event.message.type !== 'text'){
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
