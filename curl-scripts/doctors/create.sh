# sh curl-scripts/index.sh

curl 'http://localhost:4741/doctors' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "doctor": {
      "fileName": "'"${FILENAME}"'",
      "tag": "'"${TAG}"'",
      "description": "'"${DESCRIPTION}"'",
      "phone": "'"${PHONE}"'",
      "address": "'"${ADDRESS}"'",
      "yearsOfExperience": "'"${YOE}"'"
    }
  }'
