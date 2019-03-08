# azul-generator

This generates randomized tile walls for the board game [Azul](https://boardgamegeek.com/boardgame/230802/azul).

Here it is in action at SHUX 2018.  Four of us used the same generated tile
wall and each chose how we wanted to rotate it:

![at SHUX](docs/images/at_shux_2018.png)


~~Currently, you can download a single randomized board [here](https://dev.azul.dropd.com/board).~~
~~You can print it from there (print multiple copies for multiple players to use the same board),~~
~~or even save the PDF. If you want a different board, just reload the page in your browser.~~

_October 17:_ I'm in the midst of building a proper little site with a stable 'production'
version.  In the meantime, there's an example PDF [here](https://boardgamegeek.com/filepage/164845/randomized-azul-board).


# Development Notes

The application is written in Typescript and deployed as an AWS Lambda function.

So far only "dev" versions are deployed. I haven't progressed far enough with
the project to have dev/qa/prod environments yet.

It is deployed using [Runway](https://docs.onica.com/projects/runway/en/latest/index.html) and Serverless.


## Run it locally from the command line

    $ cd generator
    $ make build

    $ node dist/cli
    YTKBR KBYT- BKRYT TYBK- R-T-B
    TKBRY BTKYR YBTK- KYRBT R-YTB
    BYTRK YTRKB KBYTR RKBYT TRKBY
    board written to './local.pdf'


## Using Runway

You'll first need to install Runway (I'll see about using a Docker version).

Then you can deploy it:

    $ DEPLOY_ENVIRONMENT=prod pipenv run runway deploy
    INFO:runway:
    INFO:runway:Environment "prod" was determined from the DEPLOY_ENVIRONMENT environment variable.
    INFO:runway:If this is not correct, update the value (or unset it to fall back to the name of the current git branch or parent directory).
    INFO:runway:
    INFO:runway:Found 1 deployment(s)
    INFO:runway:
    ...
    Serverless: Stack create finished...
    Service Information
    service: azul-generator-prod-generator
    stage: prod
    region: us-east-1
    stack: azul-generator-prod-generator
    resources: 9
    api keys:
      None
    endpoints:
      GET - https://1fmt1dfq8e.execute-api.us-east-1.amazonaws.com/prod/board-serverless.pdf
    functions:
      azul: azul-generator-prod-generator-prod-azul
    layers:
      None    

    
You can hit that `GET` endpoint directly with your browser.



## Logs and Monitoring

The Lambda logs are in the usual place in CloudWatch.  There are no visitor logs per se yet.
No metrics have been set up in CloudWatch yet.