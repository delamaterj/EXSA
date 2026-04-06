# Welcome to EXSA!

This is the open-source repo for the EXSA 850 web application

Currently, EXSA 850 is a front-end landing webpage containing information regarding the organization, executive members, activities, services, and much more

### The website has its own domain now! Go to exsa850.org

## To work on the repository locally

(This application uses React, Vite, Node.js, and MySQL - Ensure you have all of the updated features to run these things!)
(Depending on your device, you may also need to go into powershell as an administrator and update your permissions)

- Clone the repository locally onto your own device through the appropiate instructions
- Open the repository in VSCode or whatever appropiate platform

### For Back End
- open the terminal and cd into server
- type 'node index.js'

### For Front End
- open the terminal and cd into client
- type 'npm run dev'
- (To view application on multiple devices within same network, type 'npm run dev -- --host')

#### Environment variables have been added for protection. To work on this project locally, you will need to manually update these variables:
- SQL database credentials (host, user, password, name)
- localhost domain for both front end and back end (vite api url + origin name)
