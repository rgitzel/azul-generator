
aws.region := us-west-2
aws.profile := default

environment := dev


pwd := $(shell pwd)

node_modules_file := node_modules.zip
upload_file := upload.zip

export_name=$(environment)--azul-generator--AzulGenerator-lambda--arn


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

create-stack: ## deploy the stack
	(cd infrastructure; ./deploy-all.sh $(aws.profile) $(aws.region) $(environment))

delete-stack: ## delete the stack
	(cd infrastructure; ./destroy-all.sh $(aws.profile) $(aws.region) $(environment))

build: ## build the app
	npm run build
	@(cd dist/; echo 'exports.handler = require("./lambda").handler;' > index.js)

node_modules.zip:
	zip --quiet -r $(node_modules_file) node_modules/*

dist: node_modules.zip build ## Creates a distributable Linux artifact suitable for Lambda
	cp $(node_modules_file) $(upload_file)
	(cd dist/ ; zip --quiet -r ../$(upload_file) *)


deploy: dist  ## Deploys the artifact to Lambda
	$(eval FUNCTION := $(shell aws --profile $(aws.profile) --region $(aws.region) \
		cloudformation list-exports \
			--query 'Exports[?Name == `$(environment)--azul-generator--AzulGenerator-lambda--arn`].Value' \
			--output text))
	aws --profile $(aws.profile) --region $(aws.region) \
		lambda update-function-code \
			--function-name $(FUNCTION) \
			--zip-file fileb://$(upload_file)

pdf:  ## download a PDF from the Lambda
	$(eval URL := $(shell aws --profile $(aws.profile) --region $(aws.region) \
		cloudformation list-exports \
			--query 'Exports[?Name == `$(environment)--azul-generator--AzulGenerator-lambda--url`].Value' \
			--output text))
	@echo $(URL)		
	@curl -H "Accept: application/pdf" $(URL) -s -o board.pdf
	@echo "written to 'board.pdf'"

clean: ## Remove any temporary project directories
	rm -rf $(upload_file)
	rm -rf $(node_modules_file)
	rm -rf dist

