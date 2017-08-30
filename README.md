# UAddresses 

[![Greenkeeper badge](https://badges.greenkeeper.io/edenlabll/uaddresses.web.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/edenlabllc/uaddresses.web.svg?branch=master)](https://travis-ci.org/edenlabllc/uaddresses.web)

[![Build history](https://buildstats.info/travisci/chart/edenlabllc/uaddresses.web)](https://travis-ci.org/edenlabllc/uaddresses.web)

API: https://github.com/edenlabllc/uaddresses.api


## Demo


Try it here: http://uaddresses-web.herokuapp.com/

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/edenlabllc/uaddresses.web)

### Docker

Dashboard can be deployed as a single container from [edenlabllc/uaddresses.web](https://hub.docker.com/r/edenlabllc/uaddresses.web/) Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port. |
| `API_ENDPOINT`        | `http://dev.ehealth.world/api/uaddresses` | eHealth API endpoint. |
| `AUTH_ENDPOINT`       | `http://dev.ehealth.world`  | Endpoint will be used for a token creation |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080`     | URL will be used in sitemap generated urls |
| `LANG_COOKIE_NAME`    | `lang`                      | Name of the cookie, where storing language variable |
| `AUTH_COOKIE_NAME`    | `token`                     | Name of the cookie, where storing token variable |
| `CLIENT_ID`           | `0423bab7-4aa0-475f-a6a8-46738524eaf7`             | Front-End client id |
| `CLIENT_SECRET`       | `Q1BDNXZzSHdkYmpMWWVBZWNFalJaUT09`                 | Front-End client secret |
| `SCOPES`              | `address:read address:write`                       | EHEALTH auth scopes |
| `OAUTH_URL`           | `http://auth.dev.ehealth.world/sign-in`            | Front-End client id |
| `OAUTH_REDIRECT_PATH` | `/auth/redirect`                                   | Redirect path for create token in EHEALTH |

## Docs

Dashboard works on top of [UAddresses management API](http://docs.uaddressesapi.apiary.io/).

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).
