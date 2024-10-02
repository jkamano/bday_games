# Birthday Games - React Webapp and Raspberry Pi Server

This project consists of a React webapp and a Node.js server designed to run on a Raspberry Pi 3 or higher.

## Setup and Deployment

### Development Environment

1. Clone the repository:
   ```
   git clone https://github.com/your-username/bday-games.git
   cd bday-games
   ```

2. Install dependencies for both the client and server:
   ```
   npm install
   cd server
   npm install
   cd ..
   ```

3. Start the development server for the React app:
   ```
   npm start
   ```

4. In a separate terminal, start the Node.js server:
   ```
   cd server
   node index.js
   ```

### Deploying on Raspberry Pi

1. Set up Node.js on your Raspberry Pi:
   ```
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Clone the repository on your Raspberry Pi:
   ```
   git clone https://github.com/your-username/bday-games.git
   cd bday-games
   ```

3. Install dependencies:
   ```
   npm install
   cd server
   npm install
   cd ..
   ```

4. Build the React app:
   ```
   npm run build
   ```

5. Start the server:
   ```
   cd server
   node index.js
   ```

6. The application should now be accessible at `http://raspberry-pi-ip:3000`

## Additional Configuration

- Update the `socket.io-client` connection URL in `src/App.js` to match your Raspberry Pi's IP address.
- Ensure that your Raspberry Pi's firewall allows incoming connections on port 3000.

## Security Considerations

- Implement HTTPS for secure communication between clients and the server.
- Add authentication mechanisms to prevent unauthorized access to the games.
- Regularly update all dependencies to patch any security vulnerabilities.

## Raspberry Pi Wi-Fi Hotspot Setup

1. Install required packages:
   ```
   sudo apt-get update
   sudo apt-get install hostapd dnsmasq
   ```

2. Configure hostapd:
   Create `/etc/hostapd/hostapd.conf` with the Wi-Fi network settings.

3. Configure dnsmasq:
   Edit `/etc/dnsmasq.conf` to set up DHCP and DNS.

4. Generate SSL certificate:
   ```
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/joaogames.key -out /etc/ssl/certs/joaogames.crt
   ```

5. Update the server code to use HTTPS and the SSL certificate.

6. Reboot the Raspberry Pi to apply all changes:
   ```
   sudo reboot
   ```

After rebooting, the Raspberry Pi will create a Wi-Fi network named "joaoGames" with the password "123456789". Connect to this network and access the application at https://joaogames.io.

Note: When using a self-signed certificate, you may need to accept security warnings in your browser.

## Raspberry Pi Setup and Remote Development

### Recommended Raspberry Pi Image

We recommend using the official Raspberry Pi OS (previously called Raspbian) for this project. You can download the latest version from the official Raspberry Pi website:

1. Download Raspberry Pi OS (64-bit) with desktop from: https://www.raspberrypi.com/software/operating-systems/
2. Use the Raspberry Pi Imager to write the image to your SD card: https://www.raspberrypi.com/software/

### Remote Development Setup

To develop and manage your project remotely, you can use Visual Studio Code or Cursor with the Remote SSH extension. Here's how to set it up:

1. Enable SSH on your Raspberry Pi:
   ```
   sudo raspi-config
   ```
   Navigate to "Interfacing Options" > "SSH" and enable it.

2. Find your Raspberry Pi's IP address:
   ```
   hostname -I
   ```

3. On your development machine, install Visual Studio Code or Cursor.

4. Install the "Remote - SSH" extension in VS Code or Cursor.

5. In VS Code or Cursor, open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and select "Remote-SSH: Connect to Host..."

6. Enter the SSH connection string: `pi@<raspberry-pi-ip-address>`

7. Enter the password for the 'pi' user when prompted.

8. Once connected, open the folder containing your project on the Raspberry Pi.

### Setting Up the Project Folder on Raspberry Pi

1. Connect to your Raspberry Pi via SSH:
   ```
   ssh pi@<raspberry-pi-ip-address>
   ```

2. Create a directory for your project:
   ```
   mkdir -p ~/projects/bday-games
   ```

3. Navigate to the project directory:
   ```
   cd ~/projects/bday-games
   ```

4. Clone your project repository:
   ```
   git clone https://github.com/your-username/bday-games.git .
   ```

5. Install project dependencies:
   ```
   npm install
   cd server
   npm install
   cd ..
   ```

Now you can use Visual Studio Code or Cursor to remotely develop and manage your project on the Raspberry Pi. This setup allows you to write code, run commands, and manage files directly on the Raspberry Pi from your development machine.
