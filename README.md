# flip-assessment


## Project Structure

src/
├── auth/
│   └── login.js                # Handles login to Gladly
├── browser/
│   └── createBrowser.js        # Initializes Puppeteer browser instance
├── data/
│   └── phoneNumbers.json       # List of phone numbers to search
├── searchPhoneNumberAndExtract.js  # Handles search and data extraction
runWISMO.js                      # Main script



## How to Run

1. Clone the repository.
2. Create a `.env` file in the root with these values:
    ```
    GLADLY_URL=https://your-gladly-instance.com
    GLADLY_LOGIN_EMAIL=your-email@example.com
    GLADLY_LOGIN_PASSWORD=your-password
    ```
3. Populate `src/data/phoneNumbers.json` with the list of phone numbers to search. Example:
    ```json
    [
        "5551234567",
        "5559876543"
    ]
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Run the process:
    ```bash
    npm start
    ```

---

## 📊 What Happens When You Run It?

- Launches a **Puppeteer browser** (visible if headless mode is off. Can be toggled on/off in browser.js)
- Logs into Gladly using the provided credentials
- Loops through each phone number in `phoneNumbers.json`
- For each phone number, searches Gladly for order history and extracts key details
- Collects results (both successful and failed lookups) into a structured JSON array
- Outputs the final results to the console

---

## ✅ Example Output (Success and Failure)

```json
[
  {
    "success": true,
    "phoneNumber": "14185438090",
    "data": {
      "customerName": "David Rodriguez",
      "orderNumber": "12345",
      "phoneNumber": "14185438090",
      "email": "n/a"
    }
  },
  {
    "success": true,
    "phoneNumber": "12176333127",
    "data": {
      "customerName": "Diana Horne",
      "orderNumber": "12345",
      "phoneNumber": "12176333127",
      "email": "person1@email.com"
    }
  },
  {
    "success": false,
    "phoneNumber": "00000000000",
    "data": {
      "customerName": "n/a",
      "orderNumber": "n/a",
      "phoneNumber": "00000000000",
      "email": "n/a"
    },
    "error": "No element found for selector: a.unstyled"
  }
]

