idea

# 📦 QR Product Info Assistant – Plan

## 🎯 Problem
Finding accurate, tailored product information is often difficult for users at physical or digital touchpoints. Manuals are too long, support is scattered, and most bots aren’t contextual.

---

## 🏗️ What We’re Building
A platform where users can:
1. Upload a **CSV** with product-specific information
2. Provide a **prompt** (e.g., tone, instructions)
3. Generate a **contextual chatbot** based on that data
4. Deploy via a **QR code** linking to a unique assistant page (`/bot/:id`)

---

## 📂 Inputs (Per Assistant)

- ✅ `product.csv`  
  Structured data for the specific product (e.g., features, specs, FAQs)

- ✅ `userPrompt.txt`  
  Custom prompt describing how the bot should respond (e.g., "Act like a friendly tech rep")

- ✅ `tone`  
  Predefined or custom tone: `Friendly`, `Professional`, `Concise`, `Playful`, etc.

---

## 🧠 Output

- 🔗 Unique chatbot ID (`/bot/:id`)
- 📄 Web page with contextual chatbot interface
- 📎 QR Code linking directly to the bot
- 🧾 Config file (stored for reloading or versioning)

---

## 💻 Example Flow

> 1. User uploads:
>
> - `product.csv` for the new Model X Vacuum Cleaner
> - Prompt: "Explain things clearly, like you’re talking to a beginner"
> - Tone: `Friendly`
>
> 2. System parses and builds structured context
>
> 3. Bot is assigned ID: `vacuum-527q9b`
>
> 4. Page is created: `https://localhost:3000/bot/vacuum-527q9b`
>
> 5. QR code is generated and embedded in packaging

---

## 🔧 Key Features

- [ ] CSV parser for structured product info
- [ ] Prompt + tone compiler into system message
- [ ] Contextual bot runtime (OpenAI / LLM backend)
- [ ] Auto-generated unique page per bot ID
- [ ] QR code generation + downloadable
- [ ] Bot config + history stored per ID

---

## ✅ Today's Goals

- [ ] Define CSV schema (fields like `Feature`, `Value`, `FAQ`)
- [ ] Build CSV upload handler
- [ ] Implement simple `/bot/:id` route with hardcoded UI
- [ ] Generate system prompt using prompt + tone + CSV summary
- [ ] Generate & render QR to `/bot/:id`

---

## 🔄 Tomorrow’s Focus

- [ ] Make chat interface dynamic with loaded context
- [ ] Add styling/themes per tone (optional)
- [ ] Build simple dashboard for viewing all bots
- [ ] Add export options (PDF/QR/HTML)


## example csv 

```csv 

Field,Value
ProductName,Model X Smart Vacuum
ModelNumber,VAC-102X
Brand,CleanTech
Category,Home Appliance
ReleaseDate,2024-08-10
BatteryLife,90 minutes
ChargingTime,3 hours
DustbinCapacity,0.6 L
Connectivity,Wi-Fi; App Control; Alexa Compatible
MainFeatures,Auto-scheduling; Obstacle avoidance; HEPA filter
Warranty,2 years
IncludedInBox,Vacuum unit; Docking station; Extra filter; Manual
SupportURL,https://cleantech.com/support/modelx


SetupStep1,Unbox all components: vacuum, dock, extra filter, manual.
SetupStep2,Place the charging dock on a flat surface near a power outlet.
SetupStep3,Plug in the dock and wait for the indicator light to turn solid.
SetupStep4,Attach the brush roller to the vacuum base (click to lock).
SetupStep5,Download the CleanTech app from the App Store or Google Play.
SetupStep6,Create an account and select "Model X Vacuum" from the product list.
SetupStep7,Connect the vacuum to Wi-Fi using the in-app setup wizard (2.4GHz only).
SetupStep8,Charge the vacuum fully before first use (approx. 3 hours).
SetupStep9,Run a test clean from the app to complete setup.
SetupStep10,Optional: Link to Alexa for voice control.

CommonIssue1,Doesn't return to dock
Solution1,Check dock placement and power.
Steps1,"1. Ensure the charging dock is plugged in. 2. Place dock against a flat wall with 2 ft clearance. 3. Restart vacuum. 4. Press 'Return to Dock' in app."

CommonIssue2,Low suction power
Solution2,Filter or dustbin may be clogged.
Steps2,"1. Turn off vacuum. 2. Remove and empty dustbin. 3. Rinse filter under cold water. 4. Let it dry fully before reinserting."

CommonIssue3,Wi-Fi won't connect
Solution3,Weak signal or wrong credentials.
Steps3,"1. Move vacuum closer to router. 2. Re-enter Wi-Fi password in app. 3. Restart the vacuum. 4. Ensure 2.4GHz network is used."

CommonIssue4,Vacuum gets stuck often
Solution4,Obstacle avoidance needs clear floor path.
Steps4,"1. Remove cords and small objects. 2. Enable 'No-Go Zones' in app. 3. Clean sensors with dry cloth."

CommonIssue5,Doesn’t start on schedule
Solution5,Check schedule settings and battery.
Steps5,"1. Open the app > Schedule tab. 2. Confirm scheduled time. 3. Ensure battery is above 30%. 4. Update firmware if needed."

CommonIssue6,App not syncing
Solution6,Connectivity issue or app needs update.
Steps6,"1. Force-close the app and reopen. 2. Check phone's Wi-Fi. 3. Ensure Bluetooth is on. 4. Update app via Play Store/App Store."

CommonIssue7,Noisy operation
Solution7,Roller or brush may be clogged.
Steps7,"1. Flip vacuum upside down. 2. Remove main brush. 3. Clean hair/debris. 4. Reinsert and lock brush."

CommonIssue8,Dustbin full alert even when empty
Solution8,Dustbin sensors may be dirty.
Steps8,"1. Remove dustbin. 2. Wipe sensor area inside with a microfiber cloth. 3. Restart vacuum."

CommonIssue9,Not detecting carpet properly
Solution9,Sensor calibration may be off.
Steps9,"1. Run a manual clean cycle. 2. Reset floor detection via app. 3. Update firmware."

CommonIssue10,Short runtime
Solution10,Battery degradation or high power mode.
Steps10,"1. Check if 'Turbo Mode' is enabled in app. 2. Reduce suction setting. 3. Fully charge vacuum before use. 4. Replace battery if over 2 years old."
``