
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



// ======================

// existing resources

data "aws_cloudformation_stack" "site" {
    name = "${var.runway_project_name}-${var.runway_environment_name}-site"
}

data "aws_route53_zone" "hosted_zone" {
  name         = "${var.app_domain}."
  private_zone = false
}


// ======================


resource "aws_route53_record" "record" {
  name    = "${var.runway_environment_name}.${var.app_domain}"
  zone_id = "${data.aws_route53_zone.hosted_zone.zone_id}"
  type    = "A"
  alias {
    name                   = "${data.aws_cloudformation_stack.site.outputs["CFDistributionDomainName"]}"
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
