# Downer Grove Emergency Management

## Overview

This application is a build on top of the Village's Customer Response Center, which is a CRM system, that was built around the Village's Geographic Information System. The Emergency Management Application allows Village staff to provide a short list of relevant request types that call takers will typically handle during a weather event or emergency. This is necessary as their are over 100 different types of requests in the CRC.

Activating the emergency mode also turns off certain features of the CRC that include emailing requests directly to the responding employee. In addition, it sets query parameters to only show requests received since the time the Emergency Mode was activated. This is important as there are over 6,000 requests in the system.

In addition to customizing the Village's CRC, this application will can also provide information to those same call takers to inform of key items that they can relay back to the public. <i>This feature is currently in development.</i>

## Application Structure

While the original CRC was written using mainly Javascript and jQuery. This application was written using AngularJS to take advantage of the data binding it provides, which will help limit the amount of the code the Village would be required to maintain.

## Loading the application

After saving the repository locally, please run the commmand "npm start" in the command line. This is an internal application. So, you will not be able to perform any updates, but you can see exactly how easily the Village could customize the CRC in the event of an emergency.
