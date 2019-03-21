# Quarry: A Dwayne "The Rock" Johnson Resource #

Scraping GQ to bring the best of Dwayne "The Rock" Johnson to you! :muscle:

## What this project does ## 

This web app lets users view ~~and leave comments on~~ the latest Dwayne Johnson news by scraping the GQ website with `Cheerio` and storing these articles in a `MongoDB` using `Mongoose`.

## How users can get started with this project ## 

1. **[Open Quarry](https://hidden-falls-36984.herokuapp.com)**.
    - The top 10 Dwayne Johnson news stories from GQ will be scraped and stored.
    - After the scrape and storage, the user is automatically redirected and is able to view all the scraped and stored stories!

## What is left to do ##

- [ ] Allow users to leave comments on the site
  - Comment routes are built and functional, verified in Postman. I need to figure out how to dynamically display the user form using Handlebars.
- [ ] Display all comments per story
  - Partial is built for this in Handlebars. I need to figure out how to dynamically set the the partial view based on user click. Something like `{{> comments id={{_id}}}}`...

## Who maintains this project ## 

This project is painstakingly maintained by me, @[fkakatie](https://github.com/fkakatie). Thanks for checking it out.
