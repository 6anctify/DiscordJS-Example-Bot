# Discord Bot Setup Guide

This guide will walk you through the process of setting up the Discord bot from scratch, including creating the bot on the Discord Developer Portal, installing dependencies, and running the bot.

---

## 1. **Create a Discord Bot**

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on the **"New Application"** button.
3. Enter a name for your bot and click **"Create"**.
4. Navigate to the **"Bot"** tab on the left sidebar.
5. Click **"Add Bot"** and confirm.
6. Under the **"Token"** section, click **"Reset Token"** and copy the token.  
    > **Important:** Keep this token private. Do not share it with anyone.

---

## 2. **Set Up Your Local Environment**

1. Ensure you have [Node.js](https://nodejs.org/) installed (version 16.9.0 or higher is recommended for Discord.js v14).
2. Clone or download the bot's codebase to your local machine.
3. Open a terminal and navigate to the bot's root directory:
    ```bash
    cd c:/Users/db180/Documents/DiscordBotExample
    ```

---

## 3. **Install Dependencies**

Run the following command to install the required dependencies:
```bash
npm install
```

---

## 4. **Configure Environment Variables**

1. Rename the `.env` file in the root directory if it doesn't already exist.
2. Open the `.env` file and replace the placeholders with your bot's credentials:
    ```
    DISCORD_TOKEN=YOUR_DISCORD_TOKEN
    CLIENT_ID=YOUR_CLIENT_ID
    GUILD_ID=YOUR_GUILD_ID # Optional: Only needed for guild-specific commands
    ```
    - Replace `YOUR_DISCORD_TOKEN` with the token you copied earlier.
    - Replace `YOUR_CLIENT_ID` with the **Application ID** from the Discord Developer Portal.
    - Replace `YOUR_GUILD_ID` with the ID of your test server (optional).

---

## 5. **Register Commands**

To register the bot's commands with Discord, run the following command:
```bash
node commands/sync.js
```
- This will register both global and guild-specific commands.

---

## 6. **Start the Bot**

Run the following command to start the bot:
```bash
node src/index.js
```
- If everything is set up correctly, you should see a message in the terminal: `Bot logged in!`

---

## 7. **Invite the Bot to Your Server**

1. Go to the **OAuth2** tab in the Discord Developer Portal.
2. Under **OAuth2 URL Generator**, select the following scopes:
    - `bot`
    - `applications.commands`
3. Under **Bot Permissions**, select the permissions your bot needs (e.g., `Send Messages`, `Manage Messages`, etc.).
4. Copy the generated URL and paste it into your browser.
5. Select your server and click **"Authorize"**.

---

## 8. **Test the Bot**

- Use the `/avatar` command (or any other command you’ve implemented) in your server to test the bot.
- Check the terminal for logs to ensure the bot is functioning correctly.

---

## 9. **Optional: Add More Features**

- Add more commands by creating new files in the `commands/globalCommands` or `commands/guildCommands` directories.
- Add event handlers in the `events` directory.
- Add button handlers in the `buttonHandlers` directory.

---

Congratulations! Your Discord bot is now set up and running.