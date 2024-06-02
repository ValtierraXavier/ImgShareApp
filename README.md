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

---
### Authenticated Users...
##### Home
---
The easiest way to tell that you are logged in is by looking in the top-left corner. Your username should be there with the first initial in a circle. 

<img src="https://i.imgur.com/uEWTAHE.png" alt="username in the navbar" width="400px"/>

You will also notice the "Make a Post!" button appear after authentication. You are now authorized to make posts, comments, follow and like posts. 

<img src="https://i.imgur.com/XmvjG5R.png" alt="authenticated homescreen" width="400px"/>

##### Making a post...
---

Clicking the "Make a Post!" button will open a modal that looks liek the image below. Fill out the fields hit "Submit" and you've just made a post!

<img src="Make a post modal: file upload view" alt="" width="400px"/>

There are two flavors of making a post on ImgShare. The first is through a file upload. Hit "choose file" and your computer's file browser will come into view pick the image  you wnt to use and post it. 
*Note: Uploading images this way, has a limit. The image should not exceed 5MB.

<img src="Make a post modal:  use a link view" alt="" width="400px"/>

The other way to save your image is through using an image link. Once you have found the image you want to post on the web, right click it and hit "copy image address" paste that link into the field and you're ready to make your post!

##### Post interactions...
---
Once youve made your post, you will see it appear on the home page. on the right side of your post will be a "thumbs-up" icon. This is for likes.
Clicking on this icon will like the post on your behalf. 

<img src="https://i.imgur.com/bxEfA3p.png" alt="post not liked state" width = "400px"/><img src="https://i.imgur.com/XqNSFVB.png" alt="post liked state" width="400px"/>

The icon will turn red and the number beside it will increment by one. Likewise, if you click the like icon while its in its "liked" state, it will turn grey and the number beside it will decrement by one.


##### Edit your posts...
---
If youre looking at your own post and you're logged in; you will be able to edit your post. Clicking the edit button below the like button in the modal will change the modal to look like the image below. Edit your post!

<img src="https://i.imgur.com/SLh9XLK.png" alt="post modal normal state" width="400px"/><img src="https://i.imgur.com/mmuZtdP.png" alt="post modal edit state" width="400px"/>

##### Commenting on posts...
---
So. You like the post...maybe you'd like to say something about it. ImgShare has a comments section for each post so long as you are logged in, you will be able to join the converstaion! 
Clicking on the post will open open a modal with more details. The comment section is off to the right of the post.

<img src="https://i.imgur.com/pKx8Tek.png" alt="post modal open" width="400px"/>

##### Liking posts...
---
There is also a like button for individual comments. Looks and functions in an identical way to the post like button. 

<img src="https://i.imgur.com/oR357yJ.png" alt="Comment unliked" width="400px"/> <img src="https://i.imgur.com/M40mo6h.png" alt="Comment liked" width="400px"/>


##### Edit your comments...
---
Editing your comments is just as simple. If the comment is yours, you will notice two extra buttons. "edit" and "delete".

<img src="https://i.imgur.com/gdtb5o2.png" alt="'your' comment" width="400px"/> 

Clicking the edit button will open a modal for editing the text of your comment. 

<img src="https://i.imgur.com/zJVFWi6.png" alt="Edit comment modal" width="400px"/>

Clicking delete will remove your comment from the pot and the database. This is irreversable.







<img src="" alt="" width="400px"/>
