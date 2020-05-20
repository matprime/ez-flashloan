#!/bin/bash

while true; do
  truffle exec scripts/getPrices_ETH_Kyber_Uniswap.js --network mainnet >> scripts/ETH_Kyber_Uniswap.log
  sleep 15;
done
