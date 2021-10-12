import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const endpoint = "https://api.telegram.org/";
const token = process.env.TOKEN;

var update = {};

//get update id
const get_update_id = async () => {
  try {
    const url = endpoint + "bot" + token + "/getUpdates";
    const res = await axios.get(url);
    const len = res.data.result.length;
    return res.data.result[len - 1].update_id;
  } catch (error) {
    console.log(error.message);
  }
};

//last update
const last_update = async () => {
  try {
    const url = endpoint + "bot" + token + "/getUpdates";
    const res = await axios.get(url);
    const len = res.data.result.length;
    update = res.data.result[len - 1];
  } catch (error) {
    console.log(error.message);
  }
};

//get chat id
const get_chat_id = (update) => {
  return update.message.from.id;
};

//get message text
const get_message_text = (update) => {
  return update.message.text;
};

//send message from bot to user
const send_message = async (chat_id, text) => {
  try {
    const url = endpoint + "bot" + token + "/sendMessage";
    await axios.post(url, { chat_id, text });
  } catch (error) {
    console.log(error.message);
  }
};

var update_id = await get_update_id();
while (true) {
  await last_update();
  if (update && update_id === update.update_id) {
    let text = await get_message_text(update);
    switch (text.toLowerCase()) {
      case "/start":
        await send_message(get_chat_id(update), "Welcome to Telegram bot!");
        break;
      case "hi":
      case "hello":
        await send_message(get_chat_id(update), "Hello User");
        break;
      case "good morning":
      case "good morning":
        await send_message(get_chat_id(update), "Good Morning :)");
        break;
      case "good night":
      case "good night":
        await send_message(get_chat_id(update), "Good night :)");
        break;
      case "hihi":
      case "huhu":
      case "haha":
      case "hihi":
      case /\[m+][a+]/:
        await send_message(get_chat_id(update), "Mmaaaa");
        break;
      case "sughalle mone":
        await send_message(get_chat_id(update), "pinnalla rand vattam");
        break;
      case "kurach kanji edukkate":
        await send_message(get_chat_id(update),"prabhaakaraa...");
        break;
      default:
        await send_message(get_chat_id(update), "Sorry, I didn't Understand");
        break;
    }
    update_id = update_id + 1;
  }
}
