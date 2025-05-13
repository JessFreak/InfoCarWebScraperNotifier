# InfoCarWebScraperNotifier

**InfoCarWebScraperNotifier** is a web automation tool for [info-car.pl](https://info-car.pl/new/) that checks for available driving exam slots and automatically books the first available one matching your preferences. It also sends real-time Telegram notifications when a booking is made or a slot is found.

## 🛠️ Features

- Scrapes available driving exam slots from [info-car.pl](https://info-car.pl/new/)
- Sends Telegram notifications for available slots
- Customizable filters for exam times and locations
- Easily configurable to suit different user needs

## 🚀 Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (Node Package Manager)
- Telegram Bot Token (Create a bot via [BotFather](https://core.telegram.org/bots#botfather) on Telegram)
- Chat ID (You can get this from a Telegram chat using [this method](https://stackoverflow.com/questions/32553106/how-can-i-get-a-telegram-users-chat-id))

### Steps to Set Up

1. Clone the repository:

```bash
git clone https://github.com/JessFreak/InfoCarWebScraperNotifier.git
cd InfoCarWebScraperNotifier
```

2. Install dependencies:
```bash
npm install
```

3. Fill config.js with your data.
4. Run the app:
```bash
npm start
```

## Example Screenshots
Screenshot of the Telegram notification and the scraper in action

### Failed attempt: 
![image](https://github.com/user-attachments/assets/8df71723-c946-46b9-9e10-802c37bd7f8f)
### Successful attempt: 
#### Console output
![image](https://github.com/user-attachments/assets/ee33a5d3-fb72-4b6c-9f14-2e8c46b1f633)
#### Bot messages
![image](https://github.com/user-attachments/assets/1193a248-ef2a-428c-ae4d-00f4002eadf9)
