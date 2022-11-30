import React from "react";

export const countTotalProductsSumm = (producersArr) => {
    let producersProdSumArr = [];
    producersArr.map((producer) => {
        producer.products.map((product) => {
            if (!product.declined) {
                producersProdSumArr.push(product.price * product.offered)
            }
        })
    });
        let totalCostAllProducts = producersProdSumArr.reduce((acc, current) => {
            return acc + current;
        });

      return totalCostAllProducts;
};