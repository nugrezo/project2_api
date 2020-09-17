# sh curl-scripts/index.sh

curl 'http://localhost:4741/doctors' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
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
