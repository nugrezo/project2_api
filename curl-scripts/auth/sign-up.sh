curl 'http://localhost:4741/sign-up' \
  --include \
  --request POST \
  --header "Content-type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "passwordConfirmation": "'"${PASSWORD}"'"
    }
  }'
