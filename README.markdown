# A Multi-Criteria System for Recommending Taxi Routes with an Advance Reservation

A Multi-Criteria Taxi Route Recommendation System Using Spatial-Temporal Predictions.
(Only contains front-end files, back-end files are not included) This is my master degree research in NCKU institude of computer and communication engineering, and it has been accepted to ECML-PKDD in 2020.

  
### The architecture of demonstration system
![](https://i.imgur.com/i2XLL9g.png)

<br />

###  User interface
![](https://i.imgur.com/QcFH0No.png)
The first step of using this system is to input a taxi driver’s information and the reservation information, including time and location. This map is interactive that taxi drivers can choose locations by clicking on the map, and the system will automatically catch the corresponding coordinates. After inputting current time and reservation time, and clicking the “send” button, and these parameters will be sent to the back-end server for computing a recommended route.

<br />

### Showing complete recommended route 
![](https://i.imgur.com/u0bkJcH.png)

While the system return computed a result, as shown in Figure, the taxi driver can observe a complete route on the map including recommended pick-up/drop-off locations which are represented by an orange square and the recommended path between these locations. Moreover, on the left side of the interface, there has an information box showing the evaluation indicators (occupied, hit and success rate) of the recommended route.

<br />

### Showing selected sub-route 
![](https://i.imgur.com/jtavMnp.png)

A complete route displays a probable and profitable path for taxi drivers. However, showing a complete route is sometimes not required for taxi drivers because a driver perhaps wants to pick just a small number of passen- gers. Hence, as shown in Figure, our system can additionally show each single pick-up/drop-off pair in the route by clicking corresponding numbers on the right sidebar. For example, if taxi drivers want to know the first suggested location for picking up passengers, he/she can click the orange button with label “1” on the right sidebar. The map will show drivers a recommended pick-up and drop-off pair of loca- tions. Taxi drivers can then look for passengers based on the suggestion.

<br />

### Showing pick-up probabilities
![](https://i.imgur.com/1hWYlTX.png)

 the fourth function of this system is to show predicted pick-up probabilities in each time interval which are included in a search time. By clicking on the button of a specified time interval, the map will show the corresponding distribution of pick-up probabilities in Manhattan. We render probabilities by different darkness of the orange color. With this visualized information, taxi drivers can also directly observe where are the hot spots for picking up passengers for now or a few hours later.
