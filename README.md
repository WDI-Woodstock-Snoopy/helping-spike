== README

#KINDLIES
This is the first version of Kindlies, a social media app for people who carry out random acts of kindness and wish to share.  Kindlies was built with Ruby on Rails and incorporates Backbone, geotags, and API technologies. Skeleton was employed to display a consistent polished look.

Kindlies allows users to log-in and record their acts of kindness.  Whether it's helping someone cross the street or serving a meal at the local soup kitchen, you can the world know what acts of kindness are happening around you.  There is a text box for a high level description as well as a message box to go into more detail.  But wait, there's more... you can even upload pictures of these acts and pot them on the site.


#Screenshots

![Log_in Page](/log_in.png)
![Post Page](/post.png)
![Map Page](/map.png)
#Challenges
Our biggest challenge was allowing users the ability to post images to our site.  At first we installed the Carrierwave gem but had complications when trying to communicate with the Backbone library.  Our solution was to write a JavaScript function and incorporate Base64 encoding to send the images to our database.

```javascript
    $('#file').on('focusout', function() {

    reader.onload = function (event) {
        try {
          console.log(event.target.result);
            dataToUpload.file = event.target.result;
        } catch (ex) {
            throw new Error("Error Error");
        }
      }

      var file = document.getElementById('file');

      reader.readAsDataURL(file.files[0]);
    });
    imageFile = dataToUpload.file;
```

Another complication was having the geotags in our maps display the text.  It took some configuration but the code below is how we accomplished it.

```javascript
    function submitData(){
      var imageData = dataToUpload.file;
      $.ajax({
        method: "post",
        url: "/hands",
        dataType: 'json',
        data: { hand: {title: summary, message: content, lat: latitude, long: longitude, image: imageData     }, authenticity_token: token },
        success: function(){
          console.log("data added successfully!");

        }
      });
      if(currentViewNew==false){
        getHotDeeds();
      }
      else {
        getNewDeeds();
      }
    }
```

Being able to count and rank votes was another area of concern.  Using the `gem 'acts_as_votable'` enabled us to track the votes.  That was then tied together with API calls to rank the most liked posts.


#Upcoming
Our updates will include a D3 graph comparing the different communities and their act of kindness.  Who knows maybe you live in a friendlier neighborhood than you thought.

Additionally,  profile pages tracking your own posts and friends' posts will be available.  Within this page you will also be able to star your favorites!


#Authors
The Kindlies app is a [Gaby Ruiz-Funes](https://github.com/mightyGaby), [Rodrigo Torres](https://github.com/rtone1), and [Tyler Geneva](https://github.com/ctylerg) collaboration.
