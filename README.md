# GitHub Stats
<img src="https://api.mygitstats.com/svg/40807825"></img>

---

## What is this project?
This project captures the information from Github accounts to generate an embeddable .svg image which can be used anywhere!
Unlike other implementations, this repo lets the user login to their account which allows access to private repositories
ensuring a more accurate system.

## Structure
| Codebase                  | Description           |
| :------------------------ | :-------------------: |
| [stats_back](stats_back)  | Nodejs REST API       |
| [stats_front](stats_front)| React Frontend        |

## Note to Developers
If you'd like to fork or further develop this repo there are a few prerequisites listed in the next section.
### Getting setup
1. Please ensure you have [Mongodb](https://www.mongodb.com/try/download/community) on your system
2. After cloning, make sure to run `npm install` in both the `stats_back` and `stats_front` directories (the majority of
dependancies are installed as devDependancies so it may be worth running `npm install --only=dev` in addition to `npm install`)
3. Backend scripts run using [ts-node](https://www.npmjs.com/package/ts-node?activeTab=versions) so make sure to install that globally using `npm i -g ts-node ts-node-dev`
