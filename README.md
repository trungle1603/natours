# Natours Application
# Run
### Install 
npm install

# Config
Create a config.env file and add some information
### Config database
NODE_ENV=development, PORT=3000, DATABASE (link cloud database), DATABASE_LOCAL, DATABASE_PASSWORD
### Config JWT
JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN
### Config test send email 
### With Mailtrap
EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT, EMAIL_FROM
### With Gmail
GMAIL_USERNAME, GMAIL_PASSWORD
### Payment With Stripe
STRIPE_SECRET_KEY

# Usge
### Start API 
npm run start:dev

## CRUD
Tour, User, Review, Booking includes CRUD

## Authentication
Login, logout, signup, forgotpassword, resetpassword
(You cannot add role admin at signup)

## Tour
With get all tours, you can add some fields: ?fields=-name,-duration,-price, ?page=2&limit=5, ?sort=price

## User
Get me, update infomation, update password, delete account (just disable state user)

## Booking
At backend side, you just recived a session of checkout, use some infomation to test checkout:
card: 4242 4242 4242 4242
date: 22 22 cvc: 222


