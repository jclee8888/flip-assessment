# README - Flip WISMO Gladly Automation

## 1️⃣ Overview

This project addresses Flip’s urgent need to retrieve **order details from Gladly** using only a **phone number**. Since Gladly does not offer a public API to directly fetch this data, the solution uses **web automation with Puppeteer** to replicate the steps a human agent would take:

1. Log into Gladly.
2. Search for the customer by phone number.
3. Extract customer details:  
   - Name  
   - Order Number  
   - Email (if present)

---

## 2️⃣ Tech Stack
| Tool | Purpose |
|---|---|
| **Node.js** | Main runtime environment |
| **Puppeteer** | Headless browser automation |
| **dotenv** | Environment variable management |

---

## 3️⃣ Why Puppeteer?
- Native JS support fits well into many modern tech stacks.
- Puppeteer supports modern SaaS apps like Gladly out of the box.
- Built-in Chromium browser allows interaction with web UIs.
- Fast iteration speed for time sensitivity.

---

## 4️⃣ Process Flow (High-Level)
1. **Login**: Log into Gladly using credentials stored in `.env`.
2. **Search**: Go directly to `/search`, input the phone number, and search.
3. **Extract**: Scrape customer details from the results page.
4. **Handle Missing Data**: If certain fields (like email) are missing, gracefully return `"N/A"` rather than failing.
5. **Results Formatting**: Return consistent JSON for every lookup, whether successful, partially successful (missing email), or failed (no customer found).

---

## 5️⃣ Project Structure
```
src/
├── auth/
│   └── login.js                # Handles login flow
├── browser/
│   └── createBrowser.js        # Initializes Puppeteer browser
├── search/
│   └── searchPhoneNumberAndExtract.js  # Full search & extraction logic
├── data/
│   └── phoneNumbers.json       # List of test phone numbers
runWISMO.js                      # Main script that ties it all together
```

---

## 6️⃣ Example Output
### Success with all fields:
```json
{
    "success": true,
    "phoneNumber": "12176333127",
    "data": {
        "customerName": "Diana Horne",
        "orderNumber": "12345",
        "phoneNumber": "12176333127",
        "email": "person1@email.com"
    }
}
```
### Success, but email missing:
```json
{
    "success": true,
    "phoneNumber": "14185438090",
    "data": {
        "customerName": "David Rodriguez",
        "orderNumber": "67890",
        "phoneNumber": "14185438090",
        "email": "N/A"
    }
}
```
### Failure (no customer found):
```json
{
    "success": false,
    "phoneNumber": "00000000000",
    "data": {
        "customerName": "N/A",
        "orderNumber": "N/A",
        "phoneNumber": "00000000000",
        "email": "N/A"
    },
    "error": "No customer found for this phone number."
}
```

---

## 7️⃣ Testing & Validation
- Sample phone numbers are stored in `data/phoneNumbers.json` for easy updates.
- Every number is processed individually, so failures don't break the app.
- Results (including errors) are logged for visibility and future debugging.
- Handling for missing customers and partial customer records (e.g., missing email).

---

## 8️⃣ How to Run
### Prerequisites
- Node.js installed
- Clone this repo
- Create a `.env` file at project root with:

```env
GLADLY_URL=https://your-gladly-instance.com
GLADLY_LOGIN_EMAIL=your-email@example.com
GLADLY_LOGIN_PASSWORD=your-password
```

- Populate `src/data/phoneNumbers.json` with phone numbers to search:
```json
[
    "14185438090",
    "12176333127",
    "77777777777"
]
```

### Install Dependencies
```bash
npm install
```

### Run
```bash
npm start
```

---

## 9️⃣ What Happens When You Run It?
- Puppeteer launches (headless by default, but could be toggled on/off in browser.js)
- Logs into Gladly
- Loops through phone numbers in `phoneNumbers.json`
- Search for each customer and extracts relevant data
- Return structured, machine-readable results for Flip
- Logs each outcome — both successes and failures — to the console

---

## 1️⃣0️⃣ How This Fits into FlipCX

This automation is designed to be modular and flexible, to fit existing voice automation architecture. Specifically:

### Input Flexibility
- While this demo ingests phone numbers from `data/phoneNumbers.json`, data ingestion is decoupled from lookup logic.
- In production, FlipCX could feed phone numbers directly from:
    - Live calls through Flip's telephony layer
    - Customer-provided batch files (e.g., CSV, JSON)
    - Webhook triggers from external systems (e.g., eCommerce platform, CRM)
- This makes the automation compatible with both real-time (in-call) and batch workflows.

### Output Ready for Downstream Processing
- The lookup result is returned as structured JSON. This format was chosen because it:
    - Aligns with common internal processing pipelines (Node services, Lambda functions, data lakes)
    - Allows for enrichment of voice prompts ("Hi [customerName], your order [orderNumber] is currently…")
    - Can be fed into Flip’s response engine to dynamically generate answers during live calls
- The JSON output can also be logged or archived into FlipCX’s analytics stack (e.g., S3, BigQuery).


### Summary Diagram
```text
[Inbound Call] --> [FlipCX IVR] --> [Gladly Lookup Automation] --> [Order Details Returned] --> [Dynamic Voice Response]
```

---

## A Few Assumptions Are Made:
- Gladly’s UI structure (attributes, classes, and selectors) will remain stable throughout the holiday season
- This process may be replaced by a direct API integration if Gladly exposes one in the future
- Gladly’s Terms of Use permit this type of automation. If this violates any specific terms, we assume that Gladly’s enforcement would focus on preserving service continuity for the customer rather than immediately cutting off access

---

## 💡 Conclusion
This solution balances speed to delivery with real-world robustness, ensuring:
- It works reliably under time pressure;
- It gracefully handles often messy customer data (missing fields, unexpected formats);
- It produces clean, predictable output for Flip to consume directly in their systems
