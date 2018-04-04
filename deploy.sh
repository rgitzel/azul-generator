#!/usr/bin/env bash

set -eu

profile=${1:?profile is required}
region=${2:?region is required}
environment=${3:?environment is required}

filename=upload.zip

rm -f $filename
if [ ! -f node_modules.zip ] ; then
  echo "building node_modules.zip"
  zip --quiet -r node_modules.zip node_modules/*
fi
cp node_modules.zip $filename
echo "building $filename"
(cd dist/; echo 'exports.handler = require("./lambda").handler;' > index.js ; zip --quiet -r ../$filename *)

export_name=${environment}--azul-generator--AzulGenerator-lambda--arn

function_name=$(\
    aws cloudformation list-exports \
        --profile $profile \
        --region $region \
        --query "Exports[?Name == '$export_name'].Value" \
        --output text \
)

echo "deploying ${filename} to ${function_name}..."
aws lambda update-function-code \
    --profile $profile \
    --region $region \
    --function-name $function_name \
    --zip-file fileb://$filename