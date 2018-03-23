# AzulGenerator Infrastructure

## Summary

A long-lived stack consisting of an SNS topic.

## Requirements

* Docker


## Managing the Stack

### CLI

#### Create a stack

```bash
make deploy STACK_ENV=development AWS_REGION=us-west-2 AWS_PROFILE=superuser
```
#### Delete a stack

```bash
make clean STACK_ENV=development AWS_REGION=us-west-2 AWS_PROFILE=superuser
```
