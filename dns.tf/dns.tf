
# standard Runway values
variable "runway_environment_name" {
    type = "string"
}
variable "runway_project_name" {
    type = "string"
}

# from runway.yml `env_vars`
variable "app_domain" {
    type = "string"
}


# from `.tfvars`
variable "certificate_arn" {
    type = "string"
}


// ======================


data "aws_cloudformation_stack" "app" {
    name = "${var.runway_project_name}-${var.runway_environment_name}-generator"
}

data "aws_route53_zone" "hosted_zone" {
  name         = "${var.app_domain}."
  private_zone = false
}


// ======================


resource "aws_api_gateway_domain_name" "domain_name" {
  domain_name              = "${var.runway_environment_name}.${var.app_domain}"
  regional_certificate_arn = "${var.certificate_arn}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_base_path_mapping" "mapping" {
  api_id      = "${data.aws_cloudformation_stack.app.outputs["RestApiId"]}"
  stage_name  = "${var.runway_environment_name}"
  domain_name = "${aws_api_gateway_domain_name.domain_name.domain_name}"
}

resource "aws_route53_record" "record" {
  name    = "${var.runway_environment_name}.${var.app_domain}"
  zone_id = "${data.aws_route53_zone.hosted_zone.zone_id}"
  type    = "A"
  alias {
    name                   = "${aws_api_gateway_domain_name.domain_name.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.domain_name.regional_zone_id}"
    evaluate_target_health = false
  }
}
