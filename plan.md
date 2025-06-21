# Build AI Health Agents

## 🎯 Problem Statement

Health professionals lack low-effort tools to deploy **customized AI check-ins or support bots** that:

- Respect user privacy
- Tailor responses to specific patient needs or questions

---

## 🏗️ What We’re Building

A **platform** for health professionals to **create personalized AI assistants** using:

- **CSV Context** (e.g., anonymized patient notes, journaling patterns)
- **Prompt Shaping** (e.g., tone: calm, motivational)

**Deployment:** Via sharable **link** or **QR code**.

It will take in a CSV of anonymized patient data and allow therapists to create a custom AI assistant that can:
- Respond to daily check-ins
- Help in case of emergencies or mediical questions
- Provide motivational support
- Offer journaling prompts
- Maintain boundaries and safety protocols
---

## 🧩 Key Features

- [ ] **CSV Context Imports**  
      ⤷ Upload anonymized patient data (e.g., notes, goals, journaling patterns)

- [ ] **Prompt Control** (Empathy, Boundaries, Safety)  
      ⤷ Customize tone (gentle, neutral, motivating)  
      ⤷ Define safe topics and boundary exclusions

- [ ] **Speech/Text Input**  
      ⤷ Enable both voice and chat input for accessibility

- [ ] **QR Code Deployment**  
      ⤷ Generate QR to access daily check-in or mental health bot

- [ ] **3D Graph View**  
      ⤷ Visualize emotional states/goals covered by the assistant

---

## 🧠 Example Use Case

> A therapist designs an assistant for clients with anxiety.
>
> - They upload a CSV of anonymized patterns and preferences
> - Customize tone via prompts (e.g., calm, encouraging)
> - Use XY Flow to limit negative triggers
> - Deploy it via QR code for anytime check-ins

---

## 💻 Today’s Goals

- [ ] Load and parse **patient CSVs** (de-identified)
- [ ] Build **prompt empathy filters** (calm tone, safe boundaries)
- [ ] Test **voice input**
- [ ] Implement mental-health–specific **XY flow presets**  
      ⤷ E.g., calm tone + escalation rules
- [ ] Generate **public QR code** + **assistant graph**

---

## 📊 Example CSV FORMAT FOR EACH PATIENT:

```csv
Field,Value
PatientID,006
FullName,Anonymous A.
Age,42
Sex,Female
BloodType,O+
ChronicConditions,Asthma;Type 2 Diabetes
MedicalAllergies,Penicillin
CurrentMedications,Metformin;Albuterol
RecentSurgeries,Appendectomy (2021)
PrimaryDoctor,Dr. James L.
DoctorContact,Encrypted
EmergencyContactName,Encrypted
EmergencyContactRelation,Sibling
EmergencyInstructions,Call emergency contact; Do not administer penicillin
VaccinationStatus,Up to date
MobilityAssistance,None
HearingImpairment,No
VisionImpairment,Yes (corrected with glasses)
LastCheckupDate,2024-12-10
```

## ✅ Expected Outputs

- [ ] Assistant **link + QR code**
- [ ] Exportable **config ID** for clinic record use
- [ ] Visual **graph**: Covered domains (e.g., "Stress", "Journaling", "Affirmation")

---

## 🔄 Tomorrow's Focus

- [ ] Add **image input** support (e.g., for mood boards)
- [ ] Timeline-based **check-ins** using CSV updates
- [ ] Prototype **escalation triggers**  
      ⤷ e.g., “Would you like to speak to someone?”

---

> _Maintained by the Mental Health AI Tools Team — v0.1_
