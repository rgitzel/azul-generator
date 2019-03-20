
provider "aws" {
    region = "us-west-1"
}


variable "host" {
    type = "string"
}

variable "domain" {
    type = "string"
}

variable "domain_zone_id" {
    type = "string"
}

variable "certificate_arn" {
    type = "string"
}

variable "api_gateway_rest_api_id" {
    type = "string"
}

variable "api_gateway_stage_name" {
    type = "string"
}


resource "aws_api_gateway_domain_name" "domain_name" {
  domain_name              = "${var.host}.${var.domain}"
  regional_certificate_arn = "${var.certificate_arn}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_base_path_mapping" "mapping" {
  api_id      = "${var.api_gateway_rest_api_id}"
  stage_name  = "${var.api_gateway_stage_name}"
  domain_name = "${aws_api_gateway_domain_name.domain_name.domain_name}"
}

resource "aws_route53_record" "record" {
  name    = "${var.host}.${var.domain}"
  zone_id = "${var.domain_zone_id}"
  type    = "A"
  alias {
    name                   = "${aws_api_gateway_domain_name.domain_name.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.domain_name.regional_zone_id}"
    evaluate_target_health = false
  }
}
