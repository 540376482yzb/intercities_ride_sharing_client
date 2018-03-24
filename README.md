## Ride Sharing App
 sharing is a great way to reduce the waste and create extra value for the society. Unlike Uber or Lyft, Ride Sharing is completely community driven and it aims to fill the gap where Uber and Lyft could not cover, that is city to city travel.
 
## Summerary of Ride Sharing App
  Sharing Ride aims to provide a platform for people to post their upcoming inter cities/state travel ahead of time so people who wants to go to the same destination can share the ride together. When a member found a match, he/she can start instant chat with the host to get more infomation about this upcoming trip.

***


## Technology stacks used in this app

   HTML | CSS | JavaScript | React | Express| Node | Mongo
 
   * used Redux for global state management
   
   ### Api used in this project

   * [google map place service api for address auto-complete](https://developers.google.com/places/javascript/)
   * [socket io for real-time communication](https://github.com/socketio/socket.io)
   
 
 
## Client React Component Structure tree
```
  *App* --- *Landing* --- *Landing Header*
       |             |
       |              --- *Landing Intro*
       |             |
       |              --- *SignUp / LogIn*
       |
       |
        --- *Board* --- *AppBar*
       |             |
       |             --- *Profile*     
       |             |                
       |             --- *Drawer*
       |
        --- *SingleBoard*
                     |
                      --- *EditForm*
                     |
                      --- *MatchRoom*
                     |
                      --- *Requests*
   ```                
   
 ## How does this app work
   ### After Sign up / Log in
   #### How to use this app as a passenger
   1. Log in / Sign up via landing page
   2. See All un-bias results in internal board
   3. Click Hamburg Icon On Top Left to pull out the Drawer
   4. Narrow search result based on your criterion. Search field is integrated with Google Place AutoComplete API which predicates the location you want to type, to improve user experience
   5. Click on an trip which you are interesed in joining and Click on Requst button to send request message
   6. After a Host has accepted your request, Click on Profile Icon to see an new Match Room link is in active.
   7. Join the Match Room to start instant chat with host
   
   #### How to use as an host
   1. Log in / Sign up via landing page
   2. See All un-bias results in internal board
   3. Click Hamburg Icon On Top Left to pull out the Drawer
   4. Click Host Button to will reveal an empty form needed to fill out. Fields integrated with location prediction services to improve accuracy and reduce error typing.
   5. When a request arrives, click the Profile Icon to see the number of upcoming requests and click on them to see in detail
   6. On accept an request, New Match room reveal on Profile Bar and Click it will allow you to communicate with the second person in real-time.
   
## How to Contribute to this Project
 * Clone or Fork the project to your local repo
 * *this app requires [back end server](https://github.com/540376482yzb/intercity_ride_share_server) to run in local*
 * npm install to download the dependencies in the app
 * Created your local `.env ` file and inside `.env` includes an jwt secrete `JWT_SECRET=[your secrete]` 
 * After an new feature was added, PR to development branch
  
