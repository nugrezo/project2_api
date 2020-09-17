#!/bin/bash

API="http://localhost:4741"
URL_PATH="/doctors"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "doctor": {
      "name": "'"${NAME}"'",
      "surName": "'"${SURNAME}"'",
      "profession": "'"${PRFS}"'",
      "phone": "'"${PHONE}"'",
      "address": "'"${ADDRESS}"'",
      "yearsOfExperience": "'"${YOE}"'"
    }
  }'

echo
