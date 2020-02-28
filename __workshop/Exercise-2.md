# Exercise 2

Take a look at the form that is available at [`/order-form`](http://localhost:8000/user-form). The form itself in in the `public` folder.

It is an order form for promotional products. Users need to fill out the complete form. All fields are required.

## Task

For this exercise, you will need to create the endpoint that this form submits to. You will need to validate the data you receive and respond to the request appropriately.

### Validation

1. Validate that the user has not yet placed an order. We cannot know this with 100% accuracy, but we can refuse users
    - whose name is already in our database.
    - whose address matches an address already in our database. Use only the street number and name for this.
2. Validate that delivery address is within Canada. We only ship to Canada!
3. Validate that the item selected is actually in stock.

If any of these validations fail, return an error as a response.

| Error Code | Description              |
| ---------- | ------------------------ |
| 450        | Item out of stock        |
| 550        | Existing user            |
| 650        | Outside of delivery zone |
| 000        | Missing information      |

_These are totally made up codes._

The form expects a an object as a response. This object should look like this:

```js
{
    'status': 'success | error',
    'error': '450 | 550 | 650 | 000'
}
```

You should only send an error code if there actually is an error.

## Details

Take a look at the `promo.js` in the `data` folder. This is your _database_. It containd current stock levels as well as past customers... Business isn't exactly booming.

You will need to import this data wherever you need to use it. At the top of the file you can require them with 

```js
const { stock, customers } = require('<PATH_TO_FILE>');
```

### Required endpoints

The form communicates with the following endpoints:

- `/order` (`POST` --> send the order details in an object.)
- `/order-confirmed` (`GET` --> displays an order confirmation page.)

## Extra

If you feel inclined, you could create a better order confirmation page. It would be cool for that page to render they're order information.

