export default {
    app: {
        name: "Cooking Notes",
        welcome: "Welcome to the Cooking Notes!"
    },
    common: {
        areYouSure: "Are you sure?",
        areYouSureProceed: "Are you sure you want to proceed?",
        back: "Back",
        cancel: "Cancel",
        confirm: "Confirm",
        logInToSave: "Log in or register to view recipes on any device.",
        notFoundPhrase: "Cannot find recipes under the phrase: \"{phrase}\"",
        notLoggedIn: "You're not logged in",
        search: "Search",
        submit: "Submit",
        unknown: "Unknown"
    },
    recipe: {
        add: 'Add new recipe',
        addFirstRecipe: "Add your first recipe",
        comment: "Comment",
        book: {
            authors: "Book author(s)",
            page: "Book page",
            title: "Book title",
        },
        dates: 'Dates of recipe use',
        delete: "Delete recipe",
        deleteRecipeText: 'Are you sure you want to delete this recipe?',
        details: "Recipe details",
        edit: "Edit recipe",
        ingredients: "Ingredients",
        lastUsed: "Last used",
        name: "Recipe name",
        notes: "Notes",
        source: {
            book: "Book",
            link: "Link",
            other: "Other"
        },
        sourceLabel: "Source",
        rating: "Rating",
        url: "Recipe url"
    },
    routes: {
        add: 'Add New Recipe',
        edit: "Edit Recipe",
        details: "Recipe Details"
    },
    toasts: {
        createdRecipe: {
            summary: "Successfully created recipe",
            detail: "Your recipe has been saved",
        },
        loggedIn: {
            summary: "Successfully logged in",
            detail: "Your has been logged in"
        },
        logInError: {
            'invalid-email': "Invalid email format",
            detail: 'Please check your credentials and try again',
            'wrong-password': "Invalid password",
            "user-not-found": "No user found with this email address"
        },
        registered: {
            summary: "Successfully registered",
            detail: "Your account has been created",
        },
        registerError: {
            'invalid-email': "Invalid email format",
            detail: 'Please check your credentials and try again',
            "email-already-in-use": "There is already an account with this email address",
            'weak-password': "The should have at least 6 characters",
        },
        removedRecipe: {
            summary: "Successfully removed recipe",
            detail: "Your recipe had been removed",
        },
        updatedRecipe: {
            summary: "Successfully updated recipe",
            detail: "Your recipe has been updated",
        }
    },
    user: {
        createAccount: "Create account",
        email: "Email",
        logIn: "Log in",
        logOut: "Log out",
        password: "Password",
        register: "Register"
    },
    validation: {
        invalidEmail: "Invalid email format",
        weakPassword: "Password should have at least 6 characters, at least one upper case letter, one lower case letter and one number"
    }
}