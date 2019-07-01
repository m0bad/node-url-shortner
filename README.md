# node-url-shortner
a Custom url shortner that detects device type an customize it's response based on it,
Built with Nodejs.

# Getting Started
` git clone https://github.com/m0bad/node-url-shortner.git`  
  `cd node-url-shortner`  
  `npm install`  

## Add env File
`touch .env`  
### open the file and add this  
`SECRET_KEY=<any string>`  
`DB_CONNECTION_URL=<mongo db url>`  
` PORT = <port number>`  

## finally , Run the server
`node app.js`  

# API Documentaion
## Please Note :
most routes require the user to be logged in and authorized.  
to disable this , you will need to edit **/routes/url.js** 
### to disable Authentication And Authorization
1. open the url routes file
2. remove the middleware from the route you want to disable 
3. save the file, and restart the server
### Example
turn `router.get("/", isLoggedIn, listShortlinks);` To `router.get("/", listShortlinks);` 

### Note that:  
if you didn't remove the Auth middlewares , then every request to a route that requires the user login should hava a header Called **Authorization**  
**this is how it looks** 'Authorization:Bearer {userToken}'  
**the user gets the userToken at signin/up**
  
 
# API Routes

## auth routes
* **POST** /auth/signup  
   **Request Body** 
  1. **email** [required]  
  2. **username** [required]  
  3. **password** [required]  
    
* **POST** /auth/signin  
   **Request Body** 
  1. **email** [required]  
  2. **password** [required]    
    

## shortlinks routes  
* **GET** /shortlinks/:{username}  
  returns all the user shortlinks , returns empty array if none exists  
    
    
* **POST** /shortlinks/:{username}
  creates a new shortlink and attach it with user creating it  
  **Request Body:** 
  1. **slug** [optional] short string to replace the long url, if it's not given, one is generated in the API
  2. **web**  [required] Working Url
  3. **android_primary**  [required] Working Url
  4. **android_fallback**  [required] Working Url
  5. **ios_primary**  [required] Working Url
  6. **ios_fallback**  [required] Working Url
    **example request by httpie: ** `http post http://localhost:port/shortlinks/username web=www.example.com android_primary=www.example.com android_fallback=www.example.com ios_primary=www.example.com ios_fallback=www.example.com`  
      Note that you will need to add the Authorization header to the request if you didn't remove the Auth middlewares  
        
        
* **PUT** /shortlinks/username/:{slug}  
  update an existing shortlink, Only sent attr will be updated, other will stay as is.   
    
    
  **Request Body:**  
    1. **web**  [optional] Working Url
    2. **android_primary**  [optional] Working Url
    3. **android_fallback**  [optional] Working Url
    4. **ios_primary**  [optional] Working Url
    5. **ios_fallback**  [optional] Working Url
  
 * **DELETE** /shortlinks/username/:{slug}  
   
  * **GET** /:{slug}  
    redirect to the original Url link (Desktop, Android, iphone) based on the request Device. 
    


