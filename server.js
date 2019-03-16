'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: '71e0db94722386b9368d5b633dd52958',
  channelAccessToken: 'Su+mmNBHllLo8vzOL4SNqccbrlTst3zAFKl3fCEy7GRHN/fCk0eLS+y3wWPv1kDjuUshzpV1hj9y0xFVveObX2689uWVsMBInxXL7jrPZu3eMBW9nXs8x5Ylagex5d2+xZrIBCIYZ2lgn4GIAue7FAdB04t89/1O/w1cDnyilFU='
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
