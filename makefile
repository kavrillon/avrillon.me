.PHONY: test validate help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

test: ## Run the current test suite
	@docker-compose build test
	@docker-compose run --rm test

validate: ## Run the current test suite and validate diffs
	@docker-compose build validate
	@docker-compose run --rm validate