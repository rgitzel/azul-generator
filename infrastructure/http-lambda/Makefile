
# TODO-CORE use 'AT := "@"' trick to turn tracing on and off?

.DEFAULT_GOAL := help

.PHONY: help deps encrypt deploy clean

# TODO-CORE: find/create a shared export
SECRETS_BUCKET_EXPORT_NAME=bee-common--integration--ansible-bucket
$(eval SECRETS_BUCKET := $(shell aws cloudformation list-exports --region $(AWS_REGION) --output text --query 'Exports[?Name==`'$(SECRETS_BUCKET_EXPORT_NAME)'`].Value'))

SECRETS_FILENAME := .vault_secret

LOCAL_SECRETS_FILE := ./$(SECRETS_FILENAME)
DOCKER_SECRETS_FILE := /mnt/$(SECRETS_FILENAME)

ANSIBLE_DOCKER_IMAGE_NAME := unbounce/si-ansible
ANSIBLE_DOCKER_IMAGE_TAG := latest
ANSIBLE_DOCKER_IMAGE := $(ANSIBLE_DOCKER_IMAGE_NAME):$(ANSIBLE_DOCKER_IMAGE_TAG)
ANSIBLE_DOCKER_FILE := "."

ANSIBLE_INVENTORY_FILE := /mnt/localhost.inventory
CREATION_FILE := /mnt/create-stack.yml
DELETION_FILE := /mnt/delete-stack.yml

DOCKER_AWS_PARAMS := -v ~/.aws:/root/.aws:ro
DOCKER_RUN_PARAMS := -v `pwd`:/mnt:ro

DOCKER_EXTRA_VARS := --extra-vars "profile=$(AWS_PROFILE)"

DOCKER_RUN_ANSIBLE := docker run $(DOCKER_RUN_PARAMS) $(DOCKER_AWS_PARAMS) $(ANSIBLE_DOCKER_IMAGE)

ANSIBLE_PLAYBOOK_CMD := $(DOCKER_RUN_ANSIBLE) ansible-playbook $(DOCKER_EXTRA_VARS) -i $(ANSIBLE_INVENTORY_FILE)


help:  ## Displays this message
	@grep -E '^[A-Za-z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


deps: ## ensure we've got the dependencies we need
	@hash docker > /dev/null 2>&1 || { echo "Install Docker to continue"; exit 1; }
	@grep -q '$(AWS_PROFILE)\]' ~/.aws/config > /dev/null 2>&1 || { echo "The profile '$(AWS_PROFILE)' is not in your AWS config."; exit 1; }
	@aws --profile $(AWS_PROFILE) s3 ls > /dev/null 2>&1 || { echo "The '$(AWS_PROFILE)' profile in your AWS config is not working."; exit 1; }




deploy: ## Deploys the stack to the provided environment and region
ifndef AWS_PROFILE
	$(error "AWS_PROFILE must be defined.")
endif
ifndef STACK_ENV
	$(error "STACK_ENV must be defined.")
endif
ifndef AWS_REGION
	$(error "AWS_REGION must be defined.")
endif
	@$(ANSIBLE_PLAYBOOK_CMD) -e 'stack_env=$(STACK_ENV) aws_region=$(AWS_REGION)' $(CREATION_FILE)


clean:  ## Cleans up a deploy to the provided environment and region
ifndef AWS_PROFILE
	$(error "AWS_PROFILE must be defined.")
endif
ifndef STACK_ENV
	$(error "STACK_ENV must be defined.")
endif
ifndef AWS_REGION
	$(error "AWS_REGION must be defined.")
endif
	@$(ANSIBLE_PLAYBOOK_CMD) -e 'stack_env=$(STACK_ENV) aws_region=$(AWS_REGION)' $(DELETION_FILE)

