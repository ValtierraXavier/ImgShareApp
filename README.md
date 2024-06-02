# [imgShare](https://imgshareapp-production.up.railway.app/)
---
<img src="https://i.imgur.com/Qh6QZgM.png" alt="homescreen screenshot" width="400px"/>
ImgShare is a social media app where you could make image abased posts feturing: comments, likes and authenticated users.

---
### Visiting the [site](https://imgshareapp-production.up.railway.app/) as a guest user...
ImgShare supports authentication, as such, you would need to sign-in and log-in in order to accest the core functionality of the site. 
You are allowed to browse content on the website without logging/signing-in. However, liking, commenting, following users, and posting, will not be available  to you as a guest user.

<img src = "https://i.imgur.com/ZxX0NWU.png" alt = "guest homepage" width = "400px"/>

### Creating a new account...
Creating a new account on ImgShare is quick and easy. its as simple as filling out four fields: Email, username, password and password verification.

<img src="https://i.imgur.com/zWHi8Sy.png" alt="sign-up form valid" width="400px"/>

*Note: The email field does not need to be a real email. Its simply used to differentiate users from eachother in the database. So long as the "email" follows traditional email conventions it will be valid. boop@email.com is a valid "email" to use.*

If the feilds are all filled out and valid (as in "passwords" match and "email" is in the proper format) the submit button will become active and password field labels will turn green. You will then be redirected to "Home".

<img src="https://i.imgur.com/uOb56t1.png" alt="sign-up form invalid" width="400px"/>

While filling in the password and password confirm fields; if your inputs do not match, the form will look like the image above. Password input labels will turn red and the "submit" button will be disabled. 

---
### logging-in...
<img src="https://i.imgur.com/GDW47ht.png" alt="log-in form" width="400px"/>

Logging-in to ImgShare is easy as well. If you have an account, simply enter your email and password, hit submit and you're in.
If everyting went well the log in form should look liek the image below:

<img src="https://i.imgur.com/KrKbAoD.png" alt="log-in form valid" width="400px"/>

If the password is wrong, the form will look like the image below:

<img src="https://i.imgur.com/YrGt7AP.png" alt="log-in form invalid" width="400px"/>

If the email does not exist in the database, the form will look like the image below:

<img src="https://i.imgur.com/Fj2JKUQ.png" alt="log-in form user not found" width="400px"/>

<img src="" alt="" width="400px"/>
