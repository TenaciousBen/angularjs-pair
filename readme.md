# Frotend Pair Programming

## Process

1. Clone this repository
2. Create your own branch
3. Do as much of the test as you can within the hour
4. Commit regularly, then push at the end

## Tasks

1. Present a view of all hotels, sortable by city or price per night, and filterable by maximum price per night
2. Present a view of all people, sortable by their budget, and filterable by their maximum budget
3. Present a view of all of a given person's stays, with the ability to add or remove stays, and a warning if they're over budget

A gulp task will be preconfigured to transpile any ES6 you've used, run any tests you've written, and host the frontend on node.js.

We're particularly interested in seeing how you structure your angular code, and less interested in CSS and design. 

If you get stuck at any point, just ask your pairing partner for help!

## Endpoints

All endpoints are REST endpoints supporting the following verbs:

* Get (with optional parameter ID for specific value)
* Post (with a model in the data of the post)
* Put (with a parameter ID for the model to update, and data for the updated model)
* Delete (with a parameter ID for the model to delete)

The following endpoints are supported:

###/Api/Hotel

Model contains the following properties: `Id`, `Name`, `City`, `PricePerNight`

###/Api/People

Model contains the following properties: `Id`, `Name`, `Age`, `Budget`

###/Api/HotelStay

Model contains the following properties: `Id`, `PersonId`, `HotelId`, `CheckIn`, `CheckOut`