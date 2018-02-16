
![alt text](https://i.imgur.com/L5ysbkC.png "Logo")
___
#####  Deal sharing community, where users find deals online from retailers and share them with the community
  **live demo**: https://snf-797523.vm.okeanos.grnet.gr 




Authentication & Authorization: **JWT**

DBMS: **MySQL**

Front-End: **Angular** 

Back-End: **Django**

Use Cases & Functionality:
------
* Register User
* Login User
* Post a deal
* Comment on a Deal
* Like/Dislike a Deal
* Pagination on Deals and Comments
* Interaction with an external API (linkpreview) where a link of the deal (link from the retailers webpage) is send in order to recieve in JSON format a printscreen (picture) and a description (there is a 100 api calls per day on the free account so if the limit is exceded the API sends nothing so if that happens I have inserted a default picture to replace the empty one)
* The main Page (deal_list) shows the Latests Deals which includes the title and the creation date of each deal sorted by Creation Date
* Each Specific Deal page (detail) includes a photo, a title, publication date, likes/dislikes, like/dislike buttons, previus comments sorted by creation date
* Method to check if JWT is still valid 
* If a user is not logged-in then forms are hidden (Post a Deal form and Comment) and a warning informs them that they have to log-in in order to post a Deal/Comment also like/dislike buttons are hidden 
* When a user clicks "logout" he is redirected to the login page and a success message is displayed that he has logged-out succesfully

**registered account**:

  username: user_test     
  password: 123456  
  *to see full functionality please register*

**By: Charalampos Panidis (AM 8140181)**

