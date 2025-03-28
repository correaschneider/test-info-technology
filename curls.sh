#! /bin/bash

VEHICLE_ID=$(curl -X POST http://backend.info.localhost/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC1234",
    "year": 2020,
    "chassi": "12345678901234567",
    "renavam": "12345678901",
    "model": "Modelo",
    "brand": "Marca"
  }' | jq -r '.id')

curl -X GET http://backend.info.localhost/api/vehicles

curl -X GET http://backend.info.localhost/api/vehicles/${VEHICLE_ID}

curl -X PUT http://backend.info.localhost/api/vehicles/${VEHICLE_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC1235",
    "model": "Modelo 1",
    "brand": "Marca 1"
  }'

curl -X DELETE http://backend.info.localhost/api/vehicles/${VEHICLE_ID}
curl -X DELETE http://backend.info.localhost/api/models/${MODEL_ID}
curl -X DELETE http://backend.info.localhost/api/brands/${BRAND_ID}
