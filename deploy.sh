#!/usr/bin/env bash

set -eux

profile=${1:?profile is required}
region=${2:?region is required}

filename=upload.zip

rm -f $filename
if [ ! -f node_modules.zip ] ; then
  zip -r node_modules.zip node_modules/*
fi
cp node_modules.zip $filename
(cd dist/; echo 'exports.handler = require("./lambda").handler;' > index.js ; zip -r ../$filename *)

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