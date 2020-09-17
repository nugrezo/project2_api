curl "http://localhost:4741/doctors/${ID}" \
  --include \
  --request PATCH \
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
