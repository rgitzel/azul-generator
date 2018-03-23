#!/usr/bin/env bash

set -eu

CONFIG_FILE=$1


#----------------------------

# you probably don't need to change this
ECR_DOCKER_IMAGE_VERSION="latest"

ECR_DOCKER_IMAGE_NAME="rodney/si-generate"
ECR_DOCKER_IMAGE_HOST="894790724410.dkr.ecr.us-west-2.amazonaws.com"
ECR_DOCKER_IMAGE="${ECR_DOCKER_IMAGE_HOST}/${ECR_DOCKER_IMAGE_NAME}:${ECR_DOCKER_IMAGE_VERSION}"

# the 'docker_image' environment variable lets you use a local image instead
if [ -z "${docker_image:-}" ] ; then
  # authenticate (TODO-CORE: there should be a nicer way to do this rather than brute force every single time)
  $(aws --profile sandbox --region us-west-2 ecr get-login --no-include-email)

  DOCKER_IMAGE=$ECR_DOCKER_IMAGE
  docker pull $DOCKER_IMAGE
else
  DOCKER_IMAGE=$docker_image
fi

echo "Starting Docker image '${DOCKER_IMAGE}'..."

docker run -v $(pwd):/mnt $DOCKER_IMAGE /mnt/${CONFIG_FILE}

for dir in $(find . -type d -depth 1) ; do
  if [ "$(git diff --stat $dir | tail -n 1)" == " 2 files changed, 3 insertions(+), 3 deletions(-)" ] ; then
    echo "reverting $dir -- nothing changed"
    git checkout -- $dir
  fi
done
echo ""
