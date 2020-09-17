curl 'http://localhost:4741/doctors' \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
