# azul-generator

This generates randomized tile areas for the board game (Azul)[https://boardgamegeek.com/boardgame/230802/azul].

(this would be a good place to take a photo!)

Currently, you can download a single randomized board (here)[https://dev.azul.dropd.com/board].


# Development Notes

The application is written in Typescript and deployed as an AWS Lambda function.

So far only "dev" versions are deployed. I haven't progressed far enough with
the project to have dev/qa/prod environments yet.

It can be deployed using AWS tools, or using the Serverless framework.


## Deploy via AWS

This version is deployed to `us-west-2`.

    $ make deploy

To download a PDF from currently deployed instance:

    $ make pdf
    https://8x0vqwvi0a.execute-api.us-west-2.amazonaws.com/AzulGenerator/board
    written to 'board.pdf'


## Deploy with Serverless

I've been deploying this version to `us-east-1`.

    $ serverless deploy -v
    Serverless: Packaging service...
    Serverless: Excluding development dependencies...
    Serverless: Uploading CloudFormation file to S3...
    Serverless: Uploading artifacts...
    Serverless: Uploading service .zip file to S3 (12.32 MB)...
    Serverless: Validating template...
    Serverless: Updating Stack...
    Serverless: Checking Stack update progress...
    CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - azul-generator-dev
    ...
    CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - azul-generator-dev
    Serverless: Stack update finished...
    Service Information
    service: azul-generator
    stage: dev
    region: us-east-1
    stack: azul-generator-dev
    api keys:
      None
    endpoints:
      GET - https://t0b2yj7k70.execute-api.us-east-1.amazonaws.com/dev/board-serverless.pdf
    functions:
      azul: azul-generator-dev-azul

    Stack Outputs
    AzulLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:625907101871:function:azul-generator-dev-azul:4
    ServiceEndpoint: https://t0b2yj7k70.execute-api.us-east-1.amazonaws.com/dev
    ServerlessDeploymentBucketName: azul-generator-dev-serverlessdeploymentbucket-19n5awfzb5mgu

You can hit that `GET` endpoint directly with your browser, or invoke it like this:

    $ serverless invoke -f azul -l
    {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/pdf"
        },
        "body": "JVBERi0xLjMKJf////8KNiAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL0Nv...
        KdHJhaWxlcgo8PAovU2l6ZSA4Ci9Sb290IDIgMCBSCi9JbmZvIDcgMCBSCj4+CnN0YXJ0eHJlZgoyMzAzCiUlRU9GCg==",
        "isBase64Encoded": true
    }
    --------------------------------------------------------------------
    START RequestId: 51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf Version: $LATEST
    2018-10-11 12:39:07.818 (-07:00)	51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf	BKYRT RYBTK YTRKB KRTY- TBK-R
    2018-10-11 12:39:07.819 (-07:00)	51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf	YRTBK BYRKT KTBYR RBKTY TKYRB
    2018-10-11 12:39:07.937 (-07:00)	51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf	42
    END RequestId: 51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf
    REPORT RequestId: 51998bc6-cd8d-11e8-8ef0-7b86d5d0f9bf	Duration: 123.42 ms	Billed Duration: 200 ms 	Memory Size: 1024 MB	Max Memory Used: 51 MB



