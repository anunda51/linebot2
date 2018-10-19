const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {
    channelAccessToken:"u/KbN38u2ks/vNhjrJGohdpZLePwPAinP8+AgrsT1sY1nBk6mRlJNrL2WaRE7vUCgJrHl0XXflvbezb47MRTVnUDF6i7Wh5sIWuPsXk0k9BOhn4Cf6a9PyI5wUWoReN4iLyDe9sdU0AJNiD6kMRAkAdB04t89/1O/w1cDnyilFU=",
    channelSecret:"05a7962f6e5a93899944ba12a83f4ea1"
}

const client = new line.Client(config);

app.get('/',(req, res) => {
    res.send("Hello world")
})



app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})

function handleEvent(event){
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }

    if(event.message.text == "ขอสติ๊กเกอร์หน่อย"){
        return client.replyMessage(event.replyToken, {
            type: 'sticker',
            packageId:"1",
            stickerId:"131"
            //text:event.message.text
        })
    }

    if(event.message.text == "บอส"){
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: "1-1ได้"
        })
    }

    return client.replyMessage(event.replyToken, {
        type:'text',
        text:event.message.text
    })
}



app.listen(port, () => console.log(`App running ${port}`))