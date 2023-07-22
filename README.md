# Emotions Chat App

This project combines two other projects from GitHub to create a chat application that allows users to send messages and analyze their sentiments using the Emotions API or chat with a bot using the Chat API.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Emotions Chat App is a chat application that leverages the Emotions API and Chat API to provide users with the ability to send messages and receive sentiment analysis or chat with a bot. This project combines the functionalities of both APIs to create a seamless chat experience.

The project consists of three main components:

1. **Emotions API:** A service that analyzes text messages and provides sentiment analysis, returning emotional data for the messages.
   - GitHub Repository: [Emotions API](https://github.com/luiscostalf/emotions-api.git)

2. **Chat API:** A bot service that allows users to interact with an AI-powered chatbot.
   - GitHub Repository: [Chat API](https://github.com/luiscostalf/chat-api.git)

3. **Angular Chat Site:** A user interface built with Angular, which allows users to send messages and view the results from the Emotions API or chat with the Chat API.
   - GitHub Repository: [Angular Chat Site](https://github.com/luiscostalf/chat-app-docker.git)

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

### Installation

1. Clone this repository:

- git clone https://github.com/YourUsername/emotions-chat-app.git
- cd emotions-chat-app

2. Build the Docker image for the Emotions Chat App:

- docker build . -t emotions-chat


## Usage

1. Start the Docker containers using Docker Compose:

- docker network create -d bridge dev
- docker-compose up


2. Access the Angular Chat Site in your browser at: `http://localhost:4200 or http://127.0.0.1:4200`

3. Use the chat application to send messages and interact with the Emotions API or the Chat API.

## Features

- Send messages and receive sentiment analysis using the Emotions API.
- Chat with a bot powered by the Chat API.
- Real-time chat experience with Socket.io.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
