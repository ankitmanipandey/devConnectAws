
The Problems that i have faced during this application build up....

1.User enters skills with spacing, used trim() to tackle this problem.

2.When photo was uploading to cloudinary to get url of that photo then it was taking some time, because of its asynchronous nature if 
the user instantly clicks on the sign up button the redux store will not get updated with the current Photo URL 
,so to tackle this problem i have disabled the signup button till the time url of the photo is stored in 
the State variable then only user would be able to press the sign up button.

3.What if the user uploads a video instead of an image ,to tackle this just add (accept:"image/*") in the input tag.


4.what if the user just clicks ont the profile save button without selecting any image ...it was setting it to null again and again ,so i have set ...(photoUrl && {photoUrl}) in api to ensure that if photoUrl is has truthy value then only add it to the api else not.



5.loader,responsive,toast


