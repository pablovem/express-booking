# express-booking

Express Booking

## API Reference

### Users

#### Get all users

```http
  GET /api/users
```

#### Create an user

```http
  POST /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | User name                  |
| `lastname`| `string` | User lastname              |
| `email`   | `string` | User email                 |
| `username`| `string` | Username                   |
| `phone`   | `string` | Phone                      |

#### Update an user

```http
  PUT /api/users/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | User name                  |
| `lastname`| `string` | User lastname              |
| `email`   | `string` | User email                 |

#### Delete an user

```http
  DELETE /api/users/:id
```

## Coding Rules

### Commit Message Format

Prefix is suggested based on the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines):

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **chore**: updating elements but no production code change
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code
* **test**: Adding missing tests or correcting existing tests