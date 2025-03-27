#! /bin/bash

MODEL_ID=$(curl -X POST http://backend.info.localhost/api/models \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Model Name"
  }' | jq -r '.id')

curl -X GET http://backend.info.localhost/api/models

curl -X GET http://backend.info.localhost/api/models/${MODEL_ID}

curl -X PUT http://backend.info.localhost/api/models/${MODEL_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Model Name"
  }'

BRAND_ID=$(curl -X POST http://backend.info.localhost/api/brands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brand Name"
  }' | jq -r '.id')

curl -X GET http://backend.info.localhost/api/brands

curl -X GET http://backend.info.localhost/api/brands/${BRAND_ID}

curl -X PUT http://backend.info.localhost/api/brands/${BRAND_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Brand Name"
  }'

VEHICLE_ID=$(curl -X POST http://backend.info.localhost/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC1234",
    "year": 2020,
    "chassi": "12345678901234567",
    "renavam": "12345678901",
    "modelId": "'${MODEL_ID}'",
    "brandId": "'${BRAND_ID}'"
  }' | jq -r '.id')

curl -X GET http://backend.info.localhost/api/vehicles

curl -X GET http://backend.info.localhost/api/vehicles/${VEHICLE_ID}

curl -X PUT http://backend.info.localhost/api/vehicles/${VEHICLE_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "plate": "ABC1235",
    "modelId": "'${MODEL_ID}'",
    "brandId": "'${BRAND_ID}'"
  }'

curl -X DELETE http://backend.info.localhost/api/vehicles/${VEHICLE_ID}
curl -X DELETE http://backend.info.localhost/api/models/${MODEL_ID}
curl -X DELETE http://backend.info.localhost/api/brands/${BRAND_ID}
