# Goaling Ball: Your goal-management service.
![Build](https://travis-ci.com/swsnu/swpp2020-team13.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team13/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team13?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team13&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team13)


## How to start

### Frontend

```
cd frontend
yarn install // to install packages
yarn start // start frontend
```

### Backend

1. Change `env.txt` file to `.env` 
2. Add `.env` file to `/backend/config`
3. Start virtual environment

    ```
    virtualenv --python=python3.7 venv
    source venv/bin/activate
    ```

4. Install requirements

    ```
    pip install -r requirements.txt
    ```

5. Start server

    ```
    python manage.py runserver
    ```

