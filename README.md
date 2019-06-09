**Heroku App** https://swapi-yordar-challenge.herokuapp.com/
# Stage one

- Generated new Rails application starwarsapi. Decided to add HTTParty as a dependency for easier api calls
- Created Services folder. Created swapi_service
- Generated films controller and set root to "films#index"
- Learning how to interact with swapi. Pulled all data from swapi and used an each loop to display each film title in an array on the home page

# Stage Two 
- Created table for home page to display Title, Producers, Release Date and Favourite Preference
- Added Favourite Button that when clicked fires an event listener that formats the color, text and changes row position by favourite selection
- Added local storage functionality. Films can be added to it and removed upon favouriting/unfavouriting
- Used Regex to remove HTML tag from table cell elements
- Added function for rows to move upon page load, dependent on preferences selected beforehand in local storage
- Added custom modal that displays title on favourite selection

# Stage Three
- Rows change green on hover to indicate they are clickable
- Added show method on films controller
- Used threads to handle multiple API calls
- Added tooltip that displays character bio on hover

# Stage Four 
- Added search function that filters table based on Title name
- Refactored Javascript
- Launched on Heroku
