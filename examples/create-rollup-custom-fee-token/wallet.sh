#!/usr/bin/env bash

# This script is used to generate the four wallets that are used in the Getting
# Started quickstart guide on the docs site. Simplifies things for users
# slightly while also avoiding the need for users to manually copy/paste a
# bunch of stuff over to the environment file.

# Generate wallets
wallet1=$(cast wallet new)
wallet2=$(cast wallet new)
wallet3=$(cast wallet new)

# Grab wallet addresses
address1=$(echo "$wallet1" | awk '/Address/ { print $2 }')
address2=$(echo "$wallet2" | awk '/Address/ { print $2 }')
address3=$(echo "$wallet3" | awk '/Address/ { print $2 }')

# Grab wallet private keys
key1=$(echo "$wallet1" | awk '/Private key/ { print $3 }')
key2=$(echo "$wallet2" | awk '/Private key/ { print $3 }')
key3=$(echo "$wallet3" | awk '/Private key/ { print $3 }')

# Print out the environment variables to copy
echo "Copy the following into your .dot file:"
echo
echo "# Deployer account"
echo "export DEPLOYER_ADDRESS=$address1"
echo "export DEPLOYER_PRIVATE_KEY=$key1"
echo
echo "# Batcher account"
echo "export BATCH_POSTER_ADDRESS=$address2"
echo "export BATCH_POSTER_PRIVATE_KEY=$key2"
echo
echo "# Validator account"
echo "export VALIDATOR_PRIVATE_ADDRESS=$address3"
echo "export VALIDATOR_PRIVATE_KEY=$key3"