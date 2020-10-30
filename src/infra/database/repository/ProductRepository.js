const { PRICES } = require('src/domain/services/products/ProductsConstants')();

class ProductRepository {
    constructor({ productModel }) {
        this.productModel = productModel;
    }

    async create(data) {

        return await this.productModel.create(data);
    }

    async get(query, page = 1) {

        return await this.productModel.paginate(query, { page: page });
    }

    async search({ min_price = 0, max_price = PRICES.MAX_PRICE, page = 1 }) {

        return await this.productModel.paginate({ valueUnitary: { $gte: min_price, $lte: max_price } }, { page: page });

    }

    async update({ productId, totalPrice }) {

        return await this.productModel.findOneAndUpdate(
            { id: productId },
            {
                lastPriceSold: totalPrice,
                lastTimeSold: Date.now(),
                $inc: { amount: -1 }
            });
    }
}

module.exports = ProductRepository;
