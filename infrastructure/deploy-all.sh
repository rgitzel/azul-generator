#!/usr/bin/env bash

set -eu

#
# deploy all stacks in the project in the right order
#
# Generated by v2.5.0-lambda at Fri Mar 23 19:26:35 UTC 2018
#

PROFILE=${1:?profile is required}
REGION=${2:?region is required}
ENVIRONMENT=${3:?environment is required}

FOLDERS=( \
    http-lambda \
)

for f in ${FOLDERS[@]} ; do
    (cd $f ; make deploy AWS_PROFILE=${PROFILE} AWS_REGION=${REGION} STACK_ENV=${ENVIRONMENT})
done

