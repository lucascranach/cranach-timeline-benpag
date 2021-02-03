# Testing

For testing the [Vue test utils](https://vuejs.org/v2/guide/testing.html) are used. These utils are based on Chai and provide a wide range of Vue-specific testing functions.

## Usage
The tests are executed in each commit and deployment. To test by yourself you can use the following command in the frontend folder:  

`npm run test:unit`

## Write tests
To write tests by yourself, you should first learn about [testing in Vue](https://vuejs.org/v2/guide/testing.html#Introduction). Tests are only written frontend-side and are separated in [Unit Tests](https://vuejs.org/v2/guide/testing.html#Unit-Testing) and [Integration Tests](https://vuejs.org/v2/guide/testing.html#Component-Testing).

### Unit tests
Unit tests are covered for every unit at this stage. They are located in `/frontend/tests/unit` and represent the folder structure in `/frontend/src/`. The [Chai BDD Syntax](https://devhints.io/chai) is used for the tests.

### Integration tests
Integration tests are not covered at this stage, but the infrastructure is available. They are located in `/frontend/tests/integration` and represent the folder structure in `/frontend/src/`. The [Chai BDD Syntax](https://devhints.io/chai) is used for the tests.