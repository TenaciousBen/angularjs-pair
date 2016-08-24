# Frotend Pair Programming

## Process

1. Create your own branch
2. Do as much of the test as you can within the hour
3. Commit regularly, then push at the end
4. Run gulp from powershell/command line each time you make a change
5. Navigate to pair.luxtripper.co.uk to access your site! (We've already set up an IIS host for you; we're awesome like that.)

## Tasks

The following task has already been completed by one of your team members: 

1. Present a view of all hotels, sortable by city or price per night, and filterable by maximum price per night

Code review the commited code with your pair programming partner, then go on to complete as many of the following as you can:

2. Modify the hotels view to allow a new hotel to be created
3. Present a view of all people, sortable by their budget, and filterable by their maximum budget
4. Add a way for a user to navigate between views
5. Present a view of all of a given person's stays, with the ability to add or remove stays, and a warning if they're over budget

The following gulp tasks are pre-configured for you:

* gulp - transpiles and browserifies all ES6 code down to ES5
* gulp test - transpiles and runs all tests named *Spec.js in your ./tests/unit-tests directoy

We're particularly interested in seeing how you structure your angular code, and less interested in CSS and design. 

If you get stuck at any point, just hit up Google or ask your pairing partner for help! ... Seriously, we'd way prefer you ask for help than sit there toughing it out and making no progress over some small stumble.

## Endpoints

All endpoints are REST endpoints supporting the following verbs:

* Get (with optional parameter ID for specific value)
* Post (with a model in the data of the post)
* Put (with a parameter ID for the model to update, and data for the updated model)
* Delete (with a parameter ID for the model to delete)

The following endpoints are supported:

###localhost:12345/Api/Hotel

Model contains the following properties: `Id`, `Name`, `City`, `PricePerNight`

###localhost:12345/Api/People

Model contains the following properties: `Id`, `Name`, `Age`, `Budget`

###localhost:12345/Api/HotelStay

Model contains the following properties: `Id`, `PersonId`, `HotelId`, `CheckIn`, `CheckOut`