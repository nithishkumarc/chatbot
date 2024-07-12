async function chatbot(input) {
  let output = "";
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    output = "Hi there! How can I assist you today?";
  } else if (input.includes("how are you")) {
    output = "I'm doing fine, thank you for asking.";
  } else if (input.includes("what is your name")) {
    output = "My name is , I'm a chatbot.";
  } else if (input.includes("what can you do")) {
    output = "I can chat with you and answer some simple questions.";
  } else if (input.includes("tell me a joke")) {
    output = "Why did the chicken go to the seance? To get to the other side.";
  } else if (input.includes("what is fullform of ece") || input.includes("what is the fullform of ece") || input.includes("what is the fullform of ECE")) {
    output = "Electronics and Communication Engineering";
  } else if (input.includes("what is analog signal") || input.includes("what is analog") || input.includes("what is the analog signal")) {
    output = "An analog signal is any continuous-time signal representing some other quantity, i.e., analogous to another quantity. For example, in an analog audio signal, the instantaneous signal voltage varies continuously with the pressure of the sound waves.";
  } else if (input.includes("what is digital signal") || input.includes("what is the digital") || input.includes("what is the definition of digital signal") || input.includes("what is digital signal")) {
    output = "A digital signal is a type of signal that represents data as a sequence of discrete values. These values are typically binary, meaning they can only take on one of two possible values, often represented as 0 and 1";
  } else if (input.includes("what is DC Motor Principle of Operation") || input.includes("what are DC Motor Principle of Operation") || input.includes("what is DC Motor Principle")) {
    output = "Electric motor is a machine which converts electrical energy into mechanical energy. It is working based on the principle of Fleming’s Left hand rule.";
  } else if (input.includes("what is Data structure") || input.includes("what is data structure") || input.includes("explain data structure")) {
    output = "Data Structure can be defined as the group of data elements which provides an efficient way of storing and organizing data so that it can be used efficiently. Examples of Data Structures are arrays, Linked List, Stack, Queue, etc.";
  } else if (input.includes("what is Microprocessors") || input.includes("what is the Microprocessors") || input.includes("explain a Microprocessors")) {
    output = "A microprocessor is a programmable electronics chip that has computing and decision-making capabilities similar to the central processing unit of a computer.";
  } else if (input.includes("what is fullform of emf") || input.includes("what is fullform of EMF") || input.includes("what is the fullform of EMF")) {
    output = "EMF stands for electromotive force. This refers to the electric potential produced by either an electrochemical cell or by changing the magnetic field.";
  } else if (input.includes("What is the si unit of emf?") || input.includes("What is the SI unit of EMF") || input.includes("si unit of emf")) {
    output = "Like other measures of energy per charge, emf uses the SI unit volt, which is equivalent to a joule (SI unit of energy) per coulomb (SI unit of charge).";
  } else if (input.includes("what is Embedded System") || input.includes("what the Embedded System") || input.includes("define Embedded System")) {
    output = "It’s a combination of both software and hardware. It is designed to do a specific job or task to be completed within a specific time.";
  } else if (input.includes("what is features of embedded system") || input.includes("what is the features of Embedded System") || input.includes("features of Embedded System")) {
    output = "Embedded systems do a very specific task; they cannot be programmed to do different things. A specific job has to be completed within a specific time.";
  } else {
    // Fallback to ChatGPT API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer sk-proj-lVeOe1ibcrV4qc0rYadpT3BlbkFJ5a4fQB5aXfBSTlRnwd8Yecev` // Replace YOUR_API_KEY with your actual API key
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: input }],
        max_tokens: 150
      })
    });
    const data = await response.json();
    output = data.choices[0].message.content;
  }

  return output;
}

// Display the user message on the chat
function displayUserMessage(message) {
  let chat = document.getElementById("chat");
  let userMessage = document.createElement("div");
  userMessage.classList.add("message");
  userMessage.classList.add("user");
  let userAvatar = document.createElement("div");
  userAvatar.classList.add("avatar");
  let userText = document.createElement("div");
  userText.classList.add("text");
  userText.innerHTML = message;
  userMessage.appendChild(userAvatar);
  userMessage.appendChild(userText);
  chat.appendChild(userMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Display the bot message on the chat
function displayBotMessage(message) {
  let chat = document.getElementById("chat");
  let botMessage = document.createElement("div");
  botMessage.classList.add("message");
  botMessage.classList.add("bot");
  let botAvatar = document.createElement("div");
  botAvatar.classList.add("avatar");
  let botText = document.createElement("div");
  botText.classList.add("text");
  botText.innerHTML = message;
  botMessage.appendChild(botAvatar);
  botMessage.appendChild(botText);
  chat.appendChild(botMessage);
  chat.scrollTop = chat.scrollHeight;
}

// Send the user message and get the bot response
async function sendMessage() {
  let input = document.getElementById("input").value;
  if (input) {
    displayUserMessage(input);
    let output = await chatbot(input);
    setTimeout(function () {
      displayBotMessage(output);
    }, 1000);
    document.getElementById("input").value = "";
  }
}

// Add a click event listener to the button
document.getElementById("button").addEventListener("click", sendMessage);

// Add a keypress event listener to the input
document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    sendMessage();
  }
});
