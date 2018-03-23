#!/usr/bin/env bash

set -eux

profile=${1:?profile is required}
region=${2:?region is required}

filename=upload.zip

rm $filename
zip $filename node_modules/*
(cd dist/; echo 'exports.handler = require("./lambda").handler;' > index.js ; zip ../$filename *)

export_name=rodney-pro-d--azul-generator--AzulGenerator-lambda--arn

function_name=$(\
    aws cloudformation list-exports \
        --profile $profile \
        --region $region \
        --query "Exports[?Name == '$export_name'].Value" \
        --output text \
)

aws lambda update-function-code \
    --profile $profile \
    --region $region \
    --function-name $function_name \
    --zip-file fileb://$filename