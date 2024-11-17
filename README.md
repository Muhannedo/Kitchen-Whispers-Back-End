## Title: Kitchen Wispers

## User Stories: 
- 	As a user, I want to sign up so that I can create an account and store my recipes.
- 	As a user, I want to log in so that I can access my recipes and comments securely.
- 	As a user, I want to create a new recipe with a title, ingredients, instructions, cook time, and difficulty level.
- 	As a user, I want to view my recipes and see their details.
- 	As a user, I want to edit my recipe to update ingredients, instructions, or other details.
- 	As a user, I want to delete my recipe if I no longer need it.
- 	As a user, I want to comment on a recipe to leave feedback or ask questions.
- 	As a user, I want to delete or update my comment after posting it
- 	As a guest user, I can only view recipes but not edit or create any data.
  

  ## Pusedo Code 
  
// LANDING PAGE
Display "Welcome to Recipe Manager"
Display navigation bar with "Sign In" and "Sign Up" options

IF user selects "Sign Up":
    user for registration details (username and  password)
Make a new token for the user 
    Save user details in the database
    Redirect to Home Page

IF user selects "Sign In":
    user for email and password
    Authenticate user(token)
    IF authentication is successful:
        Redirect to Home Page
    ELSE:
        Display "Invalid credentials" error message

// HOME PAGE
IF user is logged in:
    Display a personalized welcome message
    Display navigation bar with options: "Create Recipe", "My Recipes", "Log Out"
    
    // CREATE RECIPE
    IF user selects "Create Recipe":
        Prompt user to input: (changeable )
            - Title
            - Ingredients
            - Instructions
            - Cook Time
            - Difficulty Level
        Save recipe with user ID as the owner in the database
        Redirect to "My Recipes"

    // VIEW RECIPES
    IF user selects "My Recipes":
        Retrieve recipes created by the user from the database
        Display recipes with options to:
            - View Details
            - Edit
            - Delete
        
        // VIEW RECIPE DETAILS
        IF user selects a recipe:
            Display full recipe details
            
        // EDIT RECIPE
        IF user selects "Edit":
            Check if logged-in user is the recipe owner
            Allow user to update:
                - Title
                - Ingredients
                - Instructions
                - Cook Time
                - Difficulty Level
            Save updates to the database
            Redirect to "My Recipes"

        // DELETE RECIPE
        IF user selects "Delete":
            Check if logged-in user is the recipe owner
            Prompt user for confirmation
            IF confirmed:
                Remove recipe from the database
                Display success message


        // UPDATE OR DELETE COMMENT
        IF user selects their own comment:
            Allow user to either:
                - Edit comment and save updates
                - Delete comment

    // LOG OUT
    IF user selects "Log Out":
        Clear session
        Redirect to Landing Page

ELSE (user is a guest):
    Display all recipes in read-only mode
    Hide "Create Recipe" and "My Recipes" options
Allow guests to view recipe details but restrict commenting, editing, or creating recipes

    // COMMENTING
    IF user views another user's recipe:
        Allow user to add a comment
        Save comment to the database with user ID
        Display all comments for the recipe
