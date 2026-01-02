# 🚀 Future Tasks: SaaS_Plataforma

This project is in its core infrastructure phase. Below are the prompts to resume development:

## 1. Wallet & Transactions
**Prompt**: "Initialize the financial module. Create migrations for \`wallets\` (linked to users), \`transactions\` (type, amount, balance_after), and \`credits_packages\` (price, credits). Implement the Domain logic to handle credit purchases and service deductions using the Repository Pattern."

## 2. Stripe PIX Integration
**Prompt**: "Integrate Stripe for PIX payments. 1. Add \`stripe/stripe-php\` via composer. 2. Implement a Controller to create a PaymentIntent with \`payment_method_types: ['pix']\`. 3. Create a Webhook handler to listen for \`payment_intent.succeeded\` and automatically update the user's wallet."

## 3. Order System & WhatsApp API
**Prompt**: "Build the service order flow. 1. Create a CRUD for Services. 2. Create an Order model with statuses [Pending, Processing, Completed, Failed]. 3. Integrate a WhatsApp API (like Evolution API or similar) to send a PDF/Image receipt/result to the customer when an order is completed."

## 4. Admin Dashboard
**Prompt**: "Build the Admin Panel using Inertia + Vue. Implement stats cards for Total Revenue, Active Orders, and New Users. Add a management view for all transactions and orders."
